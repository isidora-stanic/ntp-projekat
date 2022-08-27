package handlers

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/isidora-stanic/ntp-projekat/api-gateway-service/utils"
)

const StatisticsService string = "/api/reviews"

type Statistics struct {
	l *log.Logger
}

func NewStatistics(l *log.Logger) *Statistics {
	return &Statistics{l}
}

type KeyStatistics struct{}

func (p *Statistics) GetAllLogs(rw http.ResponseWriter, r *http.Request) {
	AuthAdmin(rw, r)
	
	utils.SetupResponse(&rw, r)

	response, err := http.Get(
		utils.StatisticsServiceRoot.Next().Host + StatisticsService)

	if err != nil {
		rw.WriteHeader(http.StatusGatewayTimeout)
		return
	}

	utils.DelegateResponse(response, rw)
}

func (p *Statistics) GetAllVisits(rw http.ResponseWriter, r *http.Request) {
	AuthAdmin(rw, r)
	
	utils.SetupResponse(&rw, r)

	response, err := http.Get(
		utils.StatisticsServiceRoot.Next().Host + StatisticsService + "/visits")

	if err != nil {
		rw.WriteHeader(http.StatusGatewayTimeout)
		return
	}

	utils.DelegateResponse(response, rw)
}

func (p *Statistics) GetAllComments(rw http.ResponseWriter, r *http.Request) {
	AuthAdmin(rw, r)
	
	utils.SetupResponse(&rw, r)

	response, err := http.Get(
		utils.StatisticsServiceRoot.Next().Host + StatisticsService + "/comments")

	if err != nil {
		rw.WriteHeader(http.StatusGatewayTimeout)
		return
	}

	utils.DelegateResponse(response, rw)
}

func (p *Statistics) GetAllSaves(rw http.ResponseWriter, r *http.Request) {
	AuthAdmin(rw, r)
	
	utils.SetupResponse(&rw, r)

	response, err := http.Get(
		utils.StatisticsServiceRoot.Next().Host + StatisticsService + "/saves")

	if err != nil {
		rw.WriteHeader(http.StatusGatewayTimeout)
		return
	}

	utils.DelegateResponse(response, rw)
}

func (p *Statistics) GetVisitsForProduct(rw http.ResponseWriter, r *http.Request) {
	AuthAdmin(rw, r)
	
	utils.SetupResponse(&rw, r)

	vars := mux.Vars(r)
	id := vars["id"]

	response, err := http.Get(
		utils.StatisticsServiceRoot.Next().Host + StatisticsService + "/visits/" + id)

	if err != nil {
		rw.WriteHeader(http.StatusGatewayTimeout)
		return
	}

	utils.DelegateResponse(response, rw)
}

func (p *Statistics) GetCommentsForProduct(rw http.ResponseWriter, r *http.Request) {
	AuthAdmin(rw, r)
	
	utils.SetupResponse(&rw, r)

	vars := mux.Vars(r)
	id := vars["id"]

	response, err := http.Get(
		utils.StatisticsServiceRoot.Next().Host + StatisticsService + "/comments/" + id)

	if err != nil {
		rw.WriteHeader(http.StatusGatewayTimeout)
		return
	}

	utils.DelegateResponse(response, rw)
}

func (p *Statistics) GetSavesForProduct(rw http.ResponseWriter, r *http.Request) {
	AuthAdmin(rw, r)

	utils.SetupResponse(&rw, r)

	vars := mux.Vars(r)
	id := vars["id"]

	response, err := http.Get(
		utils.StatisticsServiceRoot.Next().Host + StatisticsService + "/saves/" + id)

	if err != nil {
		rw.WriteHeader(http.StatusGatewayTimeout)
		return
	}

	utils.DelegateResponse(response, rw)
}

func (p *Statistics) AddVisit(rw http.ResponseWriter, r *http.Request) {
	utils.SetupResponse(&rw, r)

	req, _ := http.NewRequest(http.MethodPost,
		utils.StatisticsServiceRoot.Next().Host+StatisticsService+"/visit", r.Body)
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

func (p *Statistics) AddComment(rw http.ResponseWriter, r *http.Request) {
	utils.SetupResponse(&rw, r)

	req, _ := http.NewRequest(http.MethodPost,
		utils.StatisticsServiceRoot.Next().Host+StatisticsService+"/comment", r.Body)
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

func (p *Statistics) AddSave(rw http.ResponseWriter, r *http.Request) {
	utils.SetupResponse(&rw, r)

	req, _ := http.NewRequest(http.MethodPost,
		utils.StatisticsServiceRoot.Next().Host+StatisticsService+"/save", r.Body)
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