package handlers

import (
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/isidora-stanic/ntp-projekat/v3d-service/db"
	"github.com/isidora-stanic/ntp-projekat/v3d-service/exceptions"
	"github.com/isidora-stanic/ntp-projekat/v3d-service/utils"
)

func (p *RoomSetups) GetRoom(rw http.ResponseWriter, r *http.Request) {
	p.l.Println("Handle GET Room setup")

	vars := mux.Vars(r)
	id, err := strconv.ParseUint(vars["id"], 10, 32)
	if err != nil {
		http.Error(rw, "Unable to convert id", http.StatusBadRequest)
		return
	}
	uid := uint32(id)

	p.l.Println("[DEBUG] get record id", uid)

	prod, err := db.GetOne(uid)

	switch err {
	case nil:

	case exceptions.ErrRoomNotFound:
		p.l.Println("[ERROR] fetching room", err)
		http.Error(rw, "Room setup not found", http.StatusNotFound)
		return
	default:
		p.l.Println("[ERROR] fetching room", err)
		http.Error(rw, "Room setup not found", http.StatusInternalServerError)
		return
	}

	utils.ReturnResponseAsJson(rw, prod)
}

func (p *RoomSetups) GetRoomsByUser(rw http.ResponseWriter, r *http.Request) {
	p.l.Println("Handle GET Room setup by users")

	vars := mux.Vars(r)
	id, err := strconv.ParseUint(vars["id"], 10, 32)
	if err != nil {
		http.Error(rw, "Unable to convert id", http.StatusBadRequest)
		return
	}
	uid := uint32(id)

	p.l.Println("[DEBUG] get record id", uid)

	prod, err := db.GetAllByUser(uid)

	if err != nil {
		p.l.Println("[ERROR] fetching rooms", err)
		http.Error(rw, err.Error(), http.StatusInternalServerError)
	}

	utils.ReturnResponseAsJson(rw, prod)
}