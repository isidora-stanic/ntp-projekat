package handlers

import (
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/isidora-stanic/ntp-projekat/user-service/db"
	"github.com/isidora-stanic/ntp-projekat/user-service/exceptions"
)

func (p *Users) DeleteUser(rw http.ResponseWriter, r *http.Request) {
	p.l.Println("Handle DELETE User - now with db...")

	vars := mux.Vars(r)
	id, err := strconv.ParseUint(vars["id"], 10, 32)//strconv.Atoi()
	if err != nil {
		http.Error(rw, "Unable to convert id", http.StatusBadRequest)
		return
	}
	uid := uint32(id)

	err = db.Delete(uid)

	if err == exceptions.ErrUserNotFound {
		http.Error(rw, "User not found", http.StatusNotFound)
		return
	}

	if err != nil {
		http.Error(rw, "User not found", http.StatusInternalServerError)
		return
	}
}