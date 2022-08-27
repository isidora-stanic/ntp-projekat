package handlers

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/isidora-stanic/ntp-projekat/api-gateway-service/utils"
)

const ReviewService string = "/api/reviews"

type Reviews struct {
	l *log.Logger
}

func NewReviews(l *log.Logger) *Reviews {
	return &Reviews{l}
}

type KeyReview struct{}

func (p *Reviews) GetAllReviews(rw http.ResponseWriter, r *http.Request) {
	AuthAdmin(rw, r)

	utils.SetupResponse(&rw, r)

	response, err := http.Get(
		utils.ReviewServiceRoot.Next().Host + ReviewService)

	if err != nil {
		rw.WriteHeader(http.StatusGatewayTimeout)
		return
	}

	utils.DelegateResponse(response, rw)
}

func (p *Reviews) GetReviewsForProduct(rw http.ResponseWriter, r *http.Request) {
	utils.SetupResponse(&rw, r)

	vars := mux.Vars(r)
	id := vars["id"]

	response, err := http.Get(
		utils.ReviewServiceRoot.Next().Host + ReviewService + "/product/" + id)

	if err != nil {
		rw.WriteHeader(http.StatusGatewayTimeout)
		return
	}

	utils.DelegateResponse(response, rw)
}

func (p *Reviews) GetReviewsByUser(rw http.ResponseWriter, r *http.Request) {
	AuthAnyRole(rw, r)
	utils.SetupResponse(&rw, r)

	vars := mux.Vars(r)
	id := vars["id"]

	response, err := http.Get(
		utils.ReviewServiceRoot.Next().Host + ReviewService + "/user/" + id)

	if err != nil {
		rw.WriteHeader(http.StatusGatewayTimeout)
		return
	}

	utils.DelegateResponse(response, rw)
}

func (p *Reviews) GetReviewByUserForProduct(rw http.ResponseWriter, r *http.Request) {
	AuthAnyRole(rw, r)

	utils.SetupResponse(&rw, r)

	vars := mux.Vars(r)
	uid := vars["uid"]
	pid := vars["pid"]

	response, err := http.Get(
		utils.ReviewServiceRoot.Next().Host + ReviewService + "/user/" + uid + "/product/" + pid)

	if err != nil {
		rw.WriteHeader(http.StatusGatewayTimeout)
		return
	}

	utils.DelegateResponse(response, rw)
}

func (p *Reviews) GetRatingForProduct(rw http.ResponseWriter, r *http.Request) {
	utils.SetupResponse(&rw, r)

	vars := mux.Vars(r)
	id := vars["id"]

	response, err := http.Get(
		utils.ReviewServiceRoot.Next().Host + ReviewService + "/rating/" + id)

	if err != nil {
		rw.WriteHeader(http.StatusGatewayTimeout)
		return
	}

	utils.DelegateResponse(response, rw)
}

func (p *Reviews) AddReview(rw http.ResponseWriter, r *http.Request) {
	AuthRegUser(rw, r)

	utils.SetupResponse(&rw, r)

	req, _ := http.NewRequest(http.MethodPost,
		utils.ReviewServiceRoot.Next().Host+ReviewService, r.Body)
	req.Header.Set("Accept", "application/json")
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	response, err := client.Do(req)

	if err != nil {
		rw.WriteHeader(http.StatusGatewayTimeout)
		return
	}

	utils.DelegateResponse(response, rw)
}

func (p *Reviews) DeleteReview(rw http.ResponseWriter, r *http.Request) {
	AuthAdmin(rw, r)
	
	utils.SetupResponse(&rw, r)

	vars := mux.Vars(r)
	id := vars["id"]

	req, _ := http.NewRequest(http.MethodDelete,
		utils.ReviewServiceRoot.Next().Host+ReviewService+"/"+id, r.Body)
	req.Header.Set("Accept", "application/json")
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	response, err := client.Do(req)

	if err != nil {
		rw.WriteHeader(http.StatusGatewayTimeout)
		return
	}

	utils.DelegateResponse(response, rw)
}