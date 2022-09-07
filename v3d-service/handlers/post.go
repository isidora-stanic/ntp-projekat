package handlers

import (
	"net/http"

	"github.com/isidora-stanic/ntp-projekat/v3d-service/db"
	"github.com/isidora-stanic/ntp-projekat/v3d-service/utils"
)

func (p *RoomSetups) AddRoomSetup(rw http.ResponseWriter, r *http.Request) {
	p.l.Println("Handle POST Room setup - now with db...")

	prod := r.Context().Value(KeyRoomSetup{}).(db.RoomSetup)
	// modelProd := prod
	saved, err := db.Create(prod)
	if err != nil {
		http.Error(rw, err.Error(), http.StatusBadRequest)
	}

	utils.ReturnResponseAsJson(rw, saved)
}