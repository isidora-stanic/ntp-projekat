package main

import (
	"context"
	"net/http"
	"os"
	"os/signal"
	"time"

	gohandlers "github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/hashicorp/go-hclog"
	"github.com/isidora-stanic/ntp-projekat/api-gateway-service/handlers"
	"github.com/nicholasjackson/env"
)

var bindAddress = env.String("BIND_ADDRESS", false, ":9091", "Bind address for the server")
var logLevel = env.String("LOG_LEVEL", false, "debug", "Log output level for the server [debug, info, trace]")
var basePath = env.String("BASE_PATH", false, "/tmp/images", "Base path to save images")



func main() {
	env.Parse()

	l := hclog.New(
		&hclog.LoggerOptions{
			Name: "api-gateway",
			Level: hclog.LevelFromString(*logLevel),
		},
	)

	sl := l.StandardLogger(&hclog.StandardLoggerOptions{InferLevels: true})

	ph := handlers.NewProducts(sl)
	uh := handlers.NewUsers(sl)
	eh := handlers.NewEmails(sl)

	sm := mux.NewRouter()

	getRouter := sm.Methods(http.MethodGet).Subrouter()
	postRouter := sm.Methods(http.MethodPost).Subrouter()
	putRouter := sm.Methods(http.MethodPut).Subrouter()
	deleteRouter := sm.Methods(http.MethodDelete).Subrouter()
	getRouter.Use(ph.MiddlewareInfo)
	postRouter.Use(ph.MiddlewareInfo)
	putRouter.Use(ph.MiddlewareInfo)
	deleteRouter.Use(ph.MiddlewareInfo)

	// product-service routes
	getRouter.HandleFunc("/api/products", ph.GetAllProducts)
	getRouter.HandleFunc("/api/products/{id:[0-9]+}", ph.GetOneProduct)
	postRouter.HandleFunc("/api/products", ph.AddProduct)
	putRouter.HandleFunc("/api/products/{id:[0-9]+}", ph.UpdateProduct)
	deleteRouter.HandleFunc("/api/products/{id:[0-9]+}", ph.DeleteProduct)

	// user-service routes
	getRouter.HandleFunc("/api/users", uh.GetAllUsers)
	getRouter.HandleFunc("/api/users/{id:[0-9]+}", uh.GetOneUser)
	getRouter.HandleFunc("/api/users/{id:[0-9]+}/ban", uh.BanUser)
	getRouter.HandleFunc("/api/users/{id:[0-9]+}/permit", uh.PermitUser)
	postRouter.HandleFunc("/api/users/login", uh.Login)
	postRouter.HandleFunc("/api/users/register", uh.Register)
	postRouter.HandleFunc("/api/users", uh.CreateUser)
	putRouter.HandleFunc("/api/users/{id:[0-9]+}", uh.UpdateUser)
	deleteRouter.HandleFunc("/api/users/{id:[0-9]+}", uh.DeleteUser)

	// email-service routes
	postRouter.HandleFunc("/api/email/send", eh.SendBasicEmail)

	// CORS
	ch := gohandlers.CORS(gohandlers.AllowedOrigins([]string{"http://localhost:3000"}))

	s := &http.Server{
		Addr: *bindAddress,
		Handler: ch(sm),
		ErrorLog: sl,
		// IdleTimeout: 120*time.Second,
		// ReadTimeout: 1*time.Second,
		// WriteTimeout: 1*time.Second,
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
	
	tc, _ := context.WithTimeout(context.Background(), 30*time.Second)
	s.Shutdown(tc)
}