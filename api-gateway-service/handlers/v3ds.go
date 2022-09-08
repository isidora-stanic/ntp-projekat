package handlers

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/isidora-stanic/ntp-projekat/api-gateway-service/utils"
)

const V3DService string = "/api/v3d"

type RoomSetups struct {
	l *log.Logger
}

func NewRoomSetups(l *log.Logger) *RoomSetups {
	return &RoomSetups{l}
}

type KeyRoomSetup struct{}

func (p *RoomSetups) GetAllByUser(rw http.ResponseWriter, r *http.Request) {
	utils.SetupResponse(&rw, r)

	vars := mux.Vars(r)
	id := vars["id"]

	response, err := http.Get(
		utils.V3DServiceRoot.Next().Host + V3DService + "/rooms-by/" + id)

	if err != nil {
		rw.WriteHeader(http.StatusGatewayTimeout)
		return
	}

	utils.DelegateResponse(response, rw)
}

func (p *RoomSetups) GetOneRoomSetup(rw http.ResponseWriter, r *http.Request) {
	utils.SetupResponse(&rw, r)

	vars := mux.Vars(r)
	id := vars["id"]

	response, err := http.Get(
		utils.V3DServiceRoot.Next().Host + V3DService + "/rooms/" + id)

	if err != nil {
		rw.WriteHeader(http.StatusGatewayTimeout)
		return
	}

	utils.DelegateResponse(response, rw)
}

func (p *RoomSetups) AddRoomSetup(rw http.ResponseWriter, r *http.Request) {
	err := AuthAnyRole(rw, r)
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
		utils.V3DServiceRoot.Next().Host+V3DService+"/rooms", r.Body)
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

func (p *RoomSetups) DeleteRoomSetup(rw http.ResponseWriter, r *http.Request) {
	err := AuthAnyRole(rw, r)
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
		utils.V3DServiceRoot.Next().Host+V3DService+"/rooms/"+id, r.Body)
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