package handlers

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/isidora-stanic/ntp-projekat/api-gateway-service/utils"
)

const UserService string = "/api/users"

type Users struct {
	l *log.Logger
}

func NewUsers(l*log.Logger) *Users {
	return &Users{l}
}


func (u *Users) Login(rw http.ResponseWriter, r *http.Request) {
	utils.SetupResponse(&rw, r)

	req, _ := http.NewRequest(http.MethodPost,
		utils.UserServiceRoot.Next().Host+UserService+"/login", r.Body)
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

func (u *Users) Register(rw http.ResponseWriter, r *http.Request) {
	utils.SetupResponse(&rw, r)

	req, _ := http.NewRequest(http.MethodPost,
		utils.UserServiceRoot.Next().Host+UserService+"/register", r.Body)
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

func (u *Users) GetAllUsers(rw http.ResponseWriter, r *http.Request) {
	utils.SetupResponse(&rw, r)

	response, err := http.Get(
		utils.UserServiceRoot.Next().Host + UserService)

	if err != nil {
		rw.WriteHeader(http.StatusGatewayTimeout)
		return
	}

	utils.DelegateResponse(response, rw)
}

func (u *Users) GetOneUser(rw http.ResponseWriter, r *http.Request) {
	utils.SetupResponse(&rw, r)

	vars := mux.Vars(r)
	id := vars["id"]

	response, err := http.Get(
		utils.UserServiceRoot.Next().Host + UserService + "/" + id)

	if err != nil {
		rw.WriteHeader(http.StatusGatewayTimeout)
		return
	}

	utils.DelegateResponse(response, rw)
}

func (u *Users) CreateUser(rw http.ResponseWriter, r *http.Request) {
	utils.SetupResponse(&rw, r)

	req, _ := http.NewRequest(http.MethodPost,
		utils.UserServiceRoot.Next().Host+UserService, r.Body)
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

func (u *Users) UpdateUser(rw http.ResponseWriter, r *http.Request) {
	utils.SetupResponse(&rw, r)

	vars := mux.Vars(r)
	id := vars["id"]

	req, _ := http.NewRequest(http.MethodPut,
		utils.UserServiceRoot.Next().Host+UserService+"/" + id, r.Body)
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

func (u *Users) DeleteUser(rw http.ResponseWriter, r *http.Request) {
	utils.SetupResponse(&rw, r)

	vars := mux.Vars(r)
	id := vars["id"]

	req, _ := http.NewRequest(http.MethodDelete,
		utils.UserServiceRoot.Next().Host+UserService+"/"+id,
		r.Body)
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

func (u *Users) BanUser(rw http.ResponseWriter, r *http.Request) {
	utils.SetupResponse(&rw, r)

	u.l.Println("USLA U BANOVANJE")

	vars := mux.Vars(r)
	id := vars["id"]

	req, _ := http.NewRequest(http.MethodPatch,
		utils.UserServiceRoot.Next().Host+UserService+"/" + id +"/ban",
		r.Body)
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

func (u *Users) PermitUser(rw http.ResponseWriter, r *http.Request) {
	utils.SetupResponse(&rw, r)

	vars := mux.Vars(r)
	id := vars["id"]

	req, _ := http.NewRequest(http.MethodGet,
		utils.UserServiceRoot.Next().Host+UserService+"/" + id +"/permit",
		r.Body)
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