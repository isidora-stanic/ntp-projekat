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
	rvwh := handlers.NewReviews(sl)
	sh := handlers.NewStatistics(sl)
	rcmdh := handlers.NewRecommendations(sl)
	v3dh := handlers.NewRoomSetups(sl)

	sm := mux.NewRouter()

	getRouter := sm.Methods(http.MethodGet).Subrouter()
	postRouter := sm.Methods(http.MethodPost).Subrouter()
	putRouter := sm.Methods(http.MethodPut).Subrouter()
	patchRouter := sm.Methods(http.MethodPatch).Subrouter()
	deleteRouter := sm.Methods(http.MethodDelete).Subrouter()
	getRouter.Use(ph.MiddlewareInfo)
	postRouter.Use(ph.MiddlewareInfo)
	putRouter.Use(ph.MiddlewareInfo)
	patchRouter.Use(ph.MiddlewareInfo)
	deleteRouter.Use(ph.MiddlewareInfo)

	// product-service routes
	getRouter.HandleFunc("/api/products", ph.GetAllProducts)
	getRouter.HandleFunc("/api/products/{id:[0-9]+}", ph.GetOneProduct)
	getRouter.HandleFunc("/api/products/filter-options", ph.GetFilterOptions)
	getRouter.HandleFunc("/api/products/sub/{id:[0-9]+}/{email}", ph.GetSubscription)
	postRouter.HandleFunc("/api/products/filter", ph.GetFilteredPaginated)
	postRouter.HandleFunc("/api/products", ph.AddProduct)
	putRouter.HandleFunc("/api/products/{id:[0-9]+}", ph.UpdateProduct)
	putRouter.HandleFunc("/api/products/sub/{id:[0-9]+}/{email}", ph.Subscribe)
	putRouter.HandleFunc("/api/products/unsub/{id:[0-9]+}", ph.Unsubscribe)
	deleteRouter.HandleFunc("/api/products/{id:[0-9]+}", ph.DeleteProduct)

	// user-service routes
	getRouter.HandleFunc("/api/users", uh.GetAllUsers)
	getRouter.HandleFunc("/api/users/{id:[0-9]+}", uh.GetOneUser)
	postRouter.HandleFunc("/api/users/login", uh.Login)
	postRouter.HandleFunc("/api/users/register", uh.Register)
	postRouter.HandleFunc("/api/users", uh.CreateUser)
	putRouter.HandleFunc("/api/users/{id:[0-9]+}", uh.UpdateUser)
	patchRouter.HandleFunc("/api/users/{id:[0-9]+}/ban", uh.BanUser)
	deleteRouter.HandleFunc("/api/users/{id:[0-9]+}", uh.DeleteUser)

	// email-service routes
	postRouter.HandleFunc("/api/email/send", eh.SendBasicEmail)

	// review-service routes
	getRouter.HandleFunc("/api/reviews", rvwh.GetAllReviews)
	getRouter.HandleFunc("/api/reviews/product/{id:[0-9]+}", rvwh.GetReviewsForProduct)
	getRouter.HandleFunc("/api/reviews/user/{id:[0-9]+}", rvwh.GetReviewsByUser)
	getRouter.HandleFunc("/api/reviews/user/{uid:[0-9]+}/product/{pid:[0-9]+}", rvwh.GetReviewByUserForProduct)
	getRouter.HandleFunc("/api/reviews/rating/{id:[0-9]+}", rvwh.GetRatingForProduct)
	postRouter.HandleFunc("/api/reviews", rvwh.AddReview)
	deleteRouter.HandleFunc("/api/reviews/{id:[0-9]+}", rvwh.DeleteReview)

	// statistics-service routes
	getRouter.HandleFunc("/api/statistics", sh.GetAllLogs)
	getRouter.HandleFunc("/api/statistics/statistics-for-all/{logtype:[A-Z]+}", sh.GetAllLogsByTypeProduct)
	getRouter.HandleFunc("/api/statistics/statistics-for-all-interval/{logtype:[A-Z]+}/{t1}/{t2}", sh.GetAllLogsByTypeProductInterval)
	getRouter.HandleFunc("/api/statistics/subscriptions", sh.GetSubs)
	getRouter.HandleFunc("/api/statistics/comments", sh.GetComments)
	getRouter.HandleFunc("/api/statistics/ratings", sh.GetRatings)
	postRouter.HandleFunc("/api/statistics/visit", sh.AddVisit)

	// recomendation-service routes
	getRouter.HandleFunc("/api/recommendations", rcmdh.GetAllRecommendations)
	getRouter.HandleFunc("/api/recommendations/{id:[0-9]+}", rcmdh.GetOneRecommendationP)
	getRouter.HandleFunc("/api/recommendations/recommend-by-id/{id:[0-9]+}", rcmdh.GetRecommendById)
	getRouter.HandleFunc("/api/recommendations/similar/{id:[0-9]+}", rcmdh.GetSimilar)
	// postRouter.HandleFunc("/api/recommendations/recommend", rcmdh.GetRecommendationsForAProduct)
	postRouter.HandleFunc("/api/recommendations/recommend-by-attributes", rcmdh.GetRecommendationsForAProduct)
	postRouter.HandleFunc("/api/recommendations", rcmdh.AddRecommendation)
	putRouter.HandleFunc("/api/recommendations/{id:[0-9]+}", rcmdh.UpdateRecommendation)
	deleteRouter.HandleFunc("/api/recommendations/{id:[0-9]+}", rcmdh.DeleteRecommendation)

	// v3d-service routes
	getRouter.HandleFunc("/api/v3d/rooms-by/{id:[0-9]+}", v3dh.GetAllByUser)
	getRouter.HandleFunc("/api/v3d/rooms/{id:[0-9]+}", v3dh.GetOneRoomSetup)
	postRouter.HandleFunc("/api/v3d/rooms", v3dh.AddRoomSetup)
	// putRouter.HandleFunc("/api/v3d/{id:[0-9]+}", v3dh.UpdateRoomSetup)
	deleteRouter.HandleFunc("/api/v3d/rooms/{id:[0-9]+}", v3dh.DeleteRoomSetup)

	// image-service routes
	getRouter.HandleFunc("/images/{id:[0-9]+}/{name}", ph.GetImages)


	// CORS
	ch := gohandlers.CORS(
		gohandlers.AllowedOrigins([]string{"http://localhost:3000"}),
		gohandlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"}),
		gohandlers.AllowedMethods([]string{"GET", "POST", "PUT", "HEAD", "OPTIONS", "PATCH", "DELETE"}),
	)

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
	
	tc, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()
	s.Shutdown(tc)
}