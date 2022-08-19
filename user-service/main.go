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
	"github.com/isidora-stanic/ntp-projekat/user-service/db"
	"github.com/isidora-stanic/ntp-projekat/user-service/handlers"
	"github.com/nicholasjackson/env"
)

var bindAddress = env.String("BIND_ADDRESS", false, ":9092", "Bind address for the server")
var logLevel = env.String("LOG_LEVEL", false, "debug", "Log output level for the server [debug, info, trace]")
var basePath = env.String("BASE_PATH", false, "/tmp/images", "Base path to save images")

func main() {
	env.Parse()

	db.Init()

	l := hclog.New(
		&hclog.LoggerOptions{
			Name: "user-api",
			Level: hclog.LevelFromString(*logLevel),
		},
	)

	sl := l.StandardLogger(&hclog.StandardLoggerOptions{InferLevels: true})

	uh := handlers.NewUsers(sl)

	sm := mux.NewRouter()

	getRouter := sm.Methods(http.MethodGet).Subrouter()
	getRouter.HandleFunc("/api/users", uh.GetUsers)
	getRouter.HandleFunc("/api/users/{id:[0-9]+}", uh.GetUser)
	getRouter.HandleFunc("/api/users/{id:[0-9]+}/ban", uh.BanUser)
	getRouter.HandleFunc("/api/users/{id:[0-9]+}/permit", uh.PermitUser)

	putRouter := sm.Methods(http.MethodPut).Subrouter()
	putRouter.HandleFunc("/api/users/{id:[0-9]+}", uh.UpdateUsers)
	putRouter.Use(uh.MiddlewareValidateUser)

	postRouter := sm.Methods(http.MethodPost).Subrouter()
	postRouter.HandleFunc("/api/users", uh.AddUser)
	postRouter.HandleFunc("/api/users/login", uh.Login)
	postRouter.HandleFunc("/api/users/register", uh.Register)
	postRouter.Use(uh.MiddlewareValidateUser)

	deleteRouter := sm.Methods(http.MethodDelete).Subrouter()
	deleteRouter.HandleFunc("/api/users/{id:[0-9]+}", uh.DeleteUser)

	// CORS
	ch := gohandlers.CORS(gohandlers.AllowedOrigins([]string{"http://localhost:9091"}))

	s := &http.Server{
		Addr: *bindAddress,
		Handler: ch(sm),
		ErrorLog: sl,
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