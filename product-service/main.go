package main

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"time"

	gohandlers "github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	hclog "github.com/hashicorp/go-hclog"
	"github.com/isidora-stanic/ntp-projekat/product-service/db"
	"github.com/isidora-stanic/ntp-projekat/product-service/handlers"
	"github.com/nicholasjackson/env"
)

var bindAddress = env.String("BIND_ADDRESS", false, ":9090", "Bind address for the server")
var logLevel = env.String("LOG_LEVEL", false, "debug", "Log output level for the server [debug, info, trace]")

func main() {
	fmt.Println("Hello there - this is changed version of service")
	
	env.Parse()

	db.Init()

	l := hclog.New(
		&hclog.LoggerOptions{
			Name: "product-api",
			Level: hclog.LevelFromString(*logLevel),
		},
	)

	sl := l.StandardLogger(&hclog.StandardLoggerOptions{InferLevels: true})

	ph := handlers.NewProducts(sl)

	sm := mux.NewRouter()

	getRouter := sm.Methods(http.MethodGet).Subrouter()
	getRouter.HandleFunc("/api/products", ph.GetProducts)
	getRouter.HandleFunc("/api/products/{id:[0-9]+}", ph.GetProduct)
	getRouter.HandleFunc("/api/products/filter-options", ph.GetFilterOptions)
	getRouter.HandleFunc("/api/products/similar/{id:[0-9]+}", ph.GetSimilarProductsSamePurpose)
	getRouter.HandleFunc("/api/products/sub/{product_id:[0-9]+}/{email}", ph.GetSubscription)
	getRouter.HandleFunc("/api/products/sub/{product_id:[0-9]+}", ph.GetSubscriptionsForProduct)

	putRouter := sm.Methods(http.MethodPut).Subrouter()
	putRouter.HandleFunc("/api/products/{id:[0-9]+}", ph.UpdateProducts)
	putRouter.HandleFunc("/api/products/sub/{product_id:[0-9]+}/{email}", ph.Subscribe)
	putRouter.HandleFunc("/api/products/unsub/{id:[0-9]+}", ph.Unsubscribe)
	putRouter.Use(ph.MiddlewareValidateProduct)

	postRouter := sm.Methods(http.MethodPost).Subrouter()
	postRouter.HandleFunc("/api/products/filter", ph.GetFilteredPaginated)
	postRouter.HandleFunc("/api/products/filter/any/{id:[0-9]+}", ph.GetHasAnyOfTheFilters)
	postRouter.HandleFunc("/api/products", ph.AddProduct)
	postRouter.Use(ph.MiddlewareValidateProduct)

	deleteRouter := sm.Methods(http.MethodDelete).Subrouter()
	deleteRouter.HandleFunc("/api/products/{id:[0-9]+}", ph.DeleteProduct)

	// CORS
	ch := gohandlers.CORS(
		gohandlers.AllowedOrigins([]string{"http://localhost:9091"}),
		gohandlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"}),
		gohandlers.AllowedMethods([]string{"GET", "POST", "PUT", "HEAD", "OPTIONS", "PATCH", "DELETE"}),
	)

	s := &http.Server{
		Addr: *bindAddress,
		Handler: ch(sm),
		ErrorLog: sl,
		IdleTimeout: 120*time.Second,
		ReadTimeout: 1*time.Second,
		WriteTimeout: 1*time.Second,
	}

	go func() {
		err := s.ListenAndServe()
		if err != nil {
			sl.Fatal(err)
		}
	}()

	// code for gracefull shutdown
	sigChan := make(chan os.Signal)
	signal.Notify(sigChan, os.Interrupt)
	signal.Notify(sigChan, os.Kill)

	sig := <- sigChan
	sl.Println("Recieved terminate, graceful shutdown", sig)
	
	tc, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()
	s.Shutdown(tc)
}