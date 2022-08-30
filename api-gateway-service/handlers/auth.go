package handlers

import (
	"errors"
	"net/http"

	"github.com/isidora-stanic/ntp-projekat/api-gateway-service/utils"
)

func AuthAdmin(rw http.ResponseWriter, r *http.Request) error {
	errAuth := utils.AuthorizeADMIN(r)
	return errAuth
}

func AuthRegUser(rw http.ResponseWriter, r *http.Request) error {
	errAuth := utils.AuthorizeREGUSER(r)
	if errAuth == utils.ErrUnauthorized {
		http.Error(rw, errAuth.Error(), 401)
		return errors.New("Unauth")
	}
	if errAuth != nil {
		http.Error(rw, errAuth.Error(), 500)
		return errors.New("Unauth")
	}
	return nil
}

func AuthAnyRole(rw http.ResponseWriter, r *http.Request) error {
	errAuth := utils.AuthorizeAnyRole(r)
	if errAuth == utils.ErrUnauthorized {
		http.Error(rw, errAuth.Error(), 401)
		return errors.New("Unauth")
	}
	if errAuth != nil {
		http.Error(rw, errAuth.Error(), 500)
		return errors.New("Unauth")
	}
	return nil
}

func AuthRole(rw http.ResponseWriter, r *http.Request, role string) error {
	errAuth := utils.AuthorizeRole(r, role)
	if errAuth == utils.ErrUnauthorized {
		http.Error(rw, errAuth.Error(), 401)
		return errors.New("Unauth")
	}
	if errAuth != nil {
		http.Error(rw, errAuth.Error(), 500)
		return errors.New("Unauth")
	}
	return nil
}