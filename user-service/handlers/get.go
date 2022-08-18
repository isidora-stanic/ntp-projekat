package handlers

import (
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/isidora-stanic/ntp-projekat/user-service/data"
)

func (p *Users) GetUsers(rw http.ResponseWriter, r *http.Request) {
	p.l.Println("Handle GET Users")

	lp := data.GetUsers()

	err := lp.ToJSON(rw)
	if err != nil {
		http.Error(rw, "Unable to marshal json", http.StatusInternalServerError)
		return
	}
}

func (p *Users) GetUser(rw http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		http.Error(rw, "Unable to convert id", http.StatusBadRequest)
		return
	}

	p.l.Println("[DEBUG] get record id", id)

	prod, _, err := data.FindUser(id)

	switch err {
	case nil:

	case data.ErrUserNotFound:
		p.l.Println("[ERROR] fetching User", err)
		http.Error(rw, "User not found", http.StatusNotFound)
		return
	default:
		p.l.Println("[ERROR] fetching User", err)
		http.Error(rw, "User not found", http.StatusInternalServerError)
		return
	}

	err = prod.ToJSON(rw)
	if err != nil {
		http.Error(rw, "Unable to marshal json", http.StatusInternalServerError)
		return
	}
}

func (p *Users) BanUser(rw http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		http.Error(rw, "Unable to convert id", http.StatusBadRequest)
		return
	}

	p.l.Println("[DEBUG] get record id", id)

	prod, _, err := data.FindUser(id)

	switch err {
	case nil:
		if (!prod.Banned) {
			prod.Banned = true
		} else {
			p.l.Println("[ERROR] User is already banned", err)
			http.Error(rw, "User is already banned", http.StatusBadRequest)
			return
		}
		break
	case data.ErrUserNotFound:
		p.l.Println("[ERROR] fetching User", err)
		http.Error(rw, "User not found", http.StatusNotFound)
		return
	default:
		p.l.Println("[ERROR] fetching User", err)
		http.Error(rw, "User not found", http.StatusInternalServerError)
		return
	}

	err = prod.ToJSON(rw)
	if err != nil {
		http.Error(rw, "Unable to marshal json", http.StatusInternalServerError)
		return
	}
}

func (p *Users) PermitUser(rw http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		http.Error(rw, "Unable to convert id", http.StatusBadRequest)
		return
	}

	p.l.Println("[DEBUG] get record id", id)

	prod, _, err := data.FindUser(id)

	switch err {
	case nil:
		if (prod.Banned) {
			prod.Banned = false
		} else {
			p.l.Println("[ERROR] User is not banned", err)
			http.Error(rw, "User is not banned", http.StatusBadRequest)
			return
		}
		break
	case data.ErrUserNotFound:
		p.l.Println("[ERROR] fetching User", err)
		http.Error(rw, "User not found", http.StatusNotFound)
		return
	default:
		p.l.Println("[ERROR] fetching User", err)
		http.Error(rw, "User not found", http.StatusInternalServerError)
		return
	}

	err = prod.ToJSON(rw)
	if err != nil {
		http.Error(rw, "Unable to marshal json", http.StatusInternalServerError)
		return
	}
}