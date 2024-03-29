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
	"github.com/isidora-stanic/ntp-projekat/v3d-service/db"
	"github.com/isidora-stanic/ntp-projekat/v3d-service/handlers"
	"github.com/nicholasjackson/env"
)

var bindAddress = env.String("BIND_ADDRESS", false, ":9099", "Bind address for the server")
var logLevel = env.String("LOG_LEVEL", false, "debug", "Log output level for the server [debug, info, trace]")

func main() {
	fmt.Println("Hello there - this is changed version of service")

	env.Parse()

	db.Init()

	l := hclog.New(
		&hclog.LoggerOptions{
			Name:  "v3d-api",
			Level: hclog.LevelFromString(*logLevel),
		},
	)

	sl := l.StandardLogger(&hclog.StandardLoggerOptions{InferLevels: true})

	rsh := handlers.NewRoomSetups(sl)

	sm := mux.NewRouter()

	getRouter := sm.Methods(http.MethodGet).Subrouter()
	getRouter.HandleFunc("/api/v3d/rooms/{id:[0-9]+}", rsh.GetRoom)
	getRouter.HandleFunc("/api/v3d/rooms-by/{id:[0-9]+}", rsh.GetRoomsByUser)

	// putRouter := sm.Methods(http.MethodPut).Subrouter()

	postRouter := sm.Methods(http.MethodPost).Subrouter()
	postRouter.HandleFunc("/api/v3d/rooms", rsh.AddRoomSetup)
	postRouter.Use(rsh.MiddlewareValidateProduct)

	deleteRouter := sm.Methods(http.MethodDelete).Subrouter()
	deleteRouter.HandleFunc("/api/v3d/rooms/{id:[0-9]+}", rsh.DeleteRoomSetup)

	// CORS
	ch := gohandlers.CORS(
		gohandlers.AllowedOrigins([]string{"http://localhost:9091", "http://localhost:3000"}),
		gohandlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"}),
		gohandlers.AllowedMethods([]string{"GET", "POST", "PUT", "HEAD", "OPTIONS", "PATCH", "DELETE"}),
	)

	s := &http.Server{
		Addr:         *bindAddress,
		Handler:      ch(sm),
		ErrorLog:     sl,
		IdleTimeout:  120 * time.Second,
		ReadTimeout:  1 * time.Second,
		WriteTimeout: 1 * time.Second,
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

	sig := <-sigChan
	sl.Println("Recieved terminate, graceful shutdown", sig)

	tc, _ := context.WithTimeout(context.Background(), 30*time.Second)
	s.Shutdown(tc)
}