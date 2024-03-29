package main

import (
	"context"
	"net/http"
	"os"
	"os/signal"
	"time"

	gohandlers "github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	hclog "github.com/hashicorp/go-hclog"
	"github.com/isidora-stanic/ntp-projekat/image-service/files"
	"github.com/isidora-stanic/ntp-projekat/image-service/handlers"
	"github.com/nicholasjackson/env"
)

var bindAddress = env.String("BIND_ADDRESS", false, ":9098", "Bind address for the server")
var logLevel = env.String("LOG_LEVEL", false, "debug", "Log output level for the server [debug, info, trace]")
var basePath = env.String("BASE_PATH", false, "./imagestore", "Base path to save images")

func main() {

	env.Parse()

	l := hclog.New(
		&hclog.LoggerOptions{
			Name:  "product-images",
			Level: hclog.LevelFromString(*logLevel),
		},
	)

	// create a logger for the server from the default logger
	sl := l.StandardLogger(&hclog.StandardLoggerOptions{InferLevels: true})

	// create the storage class, use local storage
	// max filesize 5MB
	stor, err := files.NewLocal(*basePath, 1024*1000*5)
	if err != nil {
		l.Error("Unable to create storage", "error", err)
		os.Exit(1)
	}

	// create the handlers
	fh := handlers.NewFiles(stor, l)

	// create a new serve mux and register the handlers
	sm := mux.NewRouter()

	// filename regex: {filename:[a-zA-Z0-9_]+\\.[a-z]{3,4}}
	// problem with FileServer is that it is dumb
	postRouter := sm.Methods(http.MethodPost).Subrouter()
	postRouter.HandleFunc("/images/{id:[0-9]+}/{filename:[a-zA-Z0-9_ ]+\\.[a-z]{3,4}}", fh.UploadImage)
	postRouter.HandleFunc("/", fh.UploadImageMultipart)

	// get files
	getRouter := sm.Methods(http.MethodGet).Subrouter()
	getRouter.HandleFunc("/images/{id:[0-9]+}", fh.GetAllImagesForProduct)
	getRouter.HandleFunc("/images/{id:[0-9]+}/normal", fh.GetNormalImagesForProduct)
	getRouter.HandleFunc("/images/{id:[0-9]+}/maps", fh.GetMapImagesForProduct)
	getRouter.HandleFunc("/images/{id:[0-9]+}/main", fh.GetMainImageForProduct)

	getRouter.Handle(
		"/images/{id:[0-9]+}/{filename}",
		http.StripPrefix("/images/", http.FileServer(http.Dir(*basePath))),
	)

	deleteRouter := sm.Methods(http.MethodDelete).Subrouter()
	deleteRouter.HandleFunc("/images/{id:[0-9]+}/{filename}", fh.DeleteImage)

	// CORS
	ch := gohandlers.CORS(
		gohandlers.AllowedOrigins([]string{"http://localhost:9091", "http://localhost:3000", "*"}),
		gohandlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"}),
		gohandlers.AllowedMethods([]string{"GET", "POST", "PUT", "HEAD", "OPTIONS", "PATCH", "DELETE"}),
	)

	// create a new server
	s := http.Server{
		Addr:         *bindAddress,      // configure the bind address
		Handler:      ch(sm),                // set the default handler
		ErrorLog:     sl,                // the logger for the server
		ReadTimeout:  5 * time.Second,   // max time to read request from the client
		WriteTimeout: 10 * time.Second,  // max time to write response to the client
		IdleTimeout:  120 * time.Second, // max time for connections using TCP Keep-Alive
	}

	// start the server
	go func() {
		l.Info("Starting server", "bind_address", *bindAddress)

		err := s.ListenAndServe()
		if err != nil {
			l.Error("Unable to start server", "error", err)
			os.Exit(1)
		}
	}()

	// trap sigterm or interupt and gracefully shutdown the server
	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt)
	signal.Notify(c, os.Kill)

	// Block until a signal is received.
	sig := <-c
	l.Info("Shutting down server with", "signal", sig)

	// gracefully shutdown the server, waiting max 30 seconds for current operations to complete
	ctx, _ := context.WithTimeout(context.Background(), 30*time.Second)
	s.Shutdown(ctx)
}