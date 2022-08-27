package handlers

import (
	"net/http"

	"github.com/isidora-stanic/ntp-projekat/api-gateway-service/utils"
)

func AuthAdmin(rw http.ResponseWriter, r *http.Request) {
	errAuth := utils.AuthorizeADMIN(r)
	if errAuth == utils.ErrUnauthorized {
		http.Error(rw, errAuth.Error(), 401)
		return
	}
	if errAuth != nil {
		http.Error(rw, errAuth.Error(), 500)
		return
	}
}

func AuthRegUser(rw http.ResponseWriter, r *http.Request) {
	errAuth := utils.AuthorizeREGUSER(r)
	if errAuth == utils.ErrUnauthorized {
		http.Error(rw, errAuth.Error(), 401)
		return
	}
	if errAuth != nil {
		http.Error(rw, errAuth.Error(), 500)
		return
	}
}

func AuthAnyRole(rw http.ResponseWriter, r *http.Request) {
	errAuth := utils.AuthorizeAnyRole(r)
	if errAuth == utils.ErrUnauthorized {
		http.Error(rw, errAuth.Error(), 401)
		return
	}
	if errAuth != nil {
		http.Error(rw, errAuth.Error(), 500)
		return
	}
}

func AuthRole(rw http.ResponseWriter, r *http.Request, role string) {
	errAuth := utils.AuthorizeRole(r, role)
	if errAuth == utils.ErrUnauthorized {
		http.Error(rw, errAuth.Error(), 401)
		return
	}
	if errAuth != nil {
		http.Error(rw, errAuth.Error(), 500)
		return
	}
}