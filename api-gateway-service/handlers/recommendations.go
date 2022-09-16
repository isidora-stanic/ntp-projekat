package handlers

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/isidora-stanic/ntp-projekat/api-gateway-service/utils"
)

const RecommendationService string = "/api/recommendations"

type Recommendations struct {
	l *log.Logger
}

func NewRecommendations(l *log.Logger) *Recommendations {
	return &Recommendations{l}
}

type KeyRecommendation struct{}

func (p *Recommendations) GetAllRecommendations(rw http.ResponseWriter, r *http.Request) {
	err := AuthAdmin(rw, r)
	if err == utils.ErrUnauthorized {
		http.Error(rw, err.Error(), 401)
		return
	}
	if err != nil {
		http.Error(rw, err.Error(), 500)
		return
	}
	
	utils.SetupResponse(&rw, r)

	response, err := http.Get(
		utils.RecommendationServiceRoot.Next().Host + RecommendationService + "")

	if err != nil {
		rw.WriteHeader(http.StatusGatewayTimeout)
		return
	}

	utils.DelegateResponse(response, rw)
}

func (p *Recommendations) GetOneRecommendationP(rw http.ResponseWriter, r *http.Request) {
	err := AuthAdmin(rw, r)
	if err == utils.ErrUnauthorized {
		http.Error(rw, err.Error(), 401)
		return
	}
	if err != nil {
		http.Error(rw, err.Error(), 500)
		return
	}

	utils.SetupResponse(&rw, r)

	vars := mux.Vars(r)
	id := vars["id"]

	response, err := http.Get(
		utils.RecommendationServiceRoot.Next().Host + RecommendationService + "/" + id)

	if err != nil {
		rw.WriteHeader(http.StatusGatewayTimeout)
		return
	}

	utils.DelegateResponse(response, rw)
}

func (p *Recommendations) AddRecommendation(rw http.ResponseWriter, r *http.Request) {
	err := AuthAdmin(rw, r)
	if err == utils.ErrUnauthorized {
		http.Error(rw, err.Error(), 401)
		return
	}
	if err != nil {
		http.Error(rw, err.Error(), 500)
		return
	}
	
	utils.SetupResponse(&rw, r)

	req, _ := http.NewRequest(http.MethodPost,
		utils.RecommendationServiceRoot.Next().Host+RecommendationService, r.Body)
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

func (p *Recommendations) UpdateRecommendation(rw http.ResponseWriter, r *http.Request) {
	err := AuthAdmin(rw, r)
	if err == utils.ErrUnauthorized {
		http.Error(rw, err.Error(), 401)
		return
	}
	if err != nil {
		http.Error(rw, err.Error(), 500)
		return
	}
	
	utils.SetupResponse(&rw, r)

	vars := mux.Vars(r)
	id := vars["id"]

	req, _ := http.NewRequest(http.MethodPut,
		utils.RecommendationServiceRoot.Next().Host+RecommendationService+"/"+id, r.Body)
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

func (p *Recommendations) DeleteRecommendation(rw http.ResponseWriter, r *http.Request) {
	err := AuthAdmin(rw, r)
	if err == utils.ErrUnauthorized {
		http.Error(rw, err.Error(), 401)
		return
	}
	if err != nil {
		http.Error(rw, err.Error(), 500)
		return
	}
	
	utils.SetupResponse(&rw, r)

	vars := mux.Vars(r)
	id := vars["id"]

	req, _ := http.NewRequest(http.MethodDelete,
		utils.RecommendationServiceRoot.Next().Host+RecommendationService+"/"+id, r.Body)
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

func (p *Recommendations) GetRecommendationsForAProduct(rw http.ResponseWriter, r *http.Request) {	
	utils.SetupResponse(&rw, r)

	req, _ := http.NewRequest(http.MethodPost,
		utils.RecommendationServiceRoot.Next().Host+RecommendationService+"/recommend-by-attributes", r.Body)

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

func (p *Recommendations) GetRecommendById(rw http.ResponseWriter, r *http.Request) {	
	utils.SetupResponse(&rw, r)

	vars := mux.Vars(r)
	id := vars["id"]
	
	response, err := http.Get(
		utils.RecommendationServiceRoot.Next().Host + RecommendationService + "/recommend-by-id/" + id)

	if err != nil {
		rw.WriteHeader(http.StatusGatewayTimeout)
		return
	}

	utils.DelegateResponse(response, rw)
}

func (p *Recommendations) GetSimilar(rw http.ResponseWriter, r *http.Request) {	
	utils.SetupResponse(&rw, r)

	vars := mux.Vars(r)
	id := vars["id"]
	
	response, err := http.Get(
		utils.RecommendationServiceRoot.Next().Host + RecommendationService + "/similar/" + id)

	if err != nil {
		rw.WriteHeader(http.StatusGatewayTimeout)
		return
	}

	utils.DelegateResponse(response, rw)
}