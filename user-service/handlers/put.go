package handlers

import (
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/isidora-stanic/ntp-projekat/user-service/db"
	"github.com/isidora-stanic/ntp-projekat/user-service/exceptions"
	"github.com/isidora-stanic/ntp-projekat/user-service/models"
	"github.com/isidora-stanic/ntp-projekat/user-service/utils"
)

func (p *Users) UpdateUsers(rw http.ResponseWriter, r *http.Request) {
	p.l.Println("Handle PUT User - now with db...")
	
	vars := mux.Vars(r)
	id, err := strconv.ParseUint(vars["id"], 10, 32)//strconv.Atoi()
	if err != nil {
		http.Error(rw, "Unable to convert id", http.StatusBadRequest)
		return
	}
	uid := uint32(id)

	p.l.Println("Handle PUT User", uid)
	prod := r.Context().Value(KeyUser{}).(models.UserDTO)

	uprod, err := db.Update(uid, prod.ToUser())

	if err == exceptions.ErrUserNotFound {
		http.Error(rw, "User not found", http.StatusNotFound)
		return
	}

	if err != nil {
		http.Error(rw, "User not found", http.StatusInternalServerError)
		return
	}

	utils.ReturnResponseAsJson(rw, uprod.ToDTO())
}