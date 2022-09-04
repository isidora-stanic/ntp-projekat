package handlers

import (
	"net/http"
	"strconv"
	"time"

	"github.com/gorilla/mux"
	"github.com/isidora-stanic/ntp-projekat/user-service/db"
	"github.com/isidora-stanic/ntp-projekat/user-service/email"
	"github.com/isidora-stanic/ntp-projekat/user-service/exceptions"
	"github.com/isidora-stanic/ntp-projekat/user-service/models"
)

func (p *Users) BanUserOnSomeTime(rw http.ResponseWriter, r *http.Request) {
	p.l.Println("Handle GET User [BAN] - now with db...")

	vars := mux.Vars(r)
	id, err := strconv.ParseUint(vars["id"], 10, 32) //strconv.Atoi()
	if err != nil {
		http.Error(rw, "Unable to convert id", http.StatusBadRequest)
		return
	}
	uid := uint32(id)
	var banReq models.BanRequest
	err = banReq.FromJSON(r.Body)
	if err != nil {
		http.Error(rw, "Unable to convert ban request", http.StatusBadRequest)
		return
	}

	banEnd, err := time.Parse("2006-01-02", banReq.Until)
	if err != nil {
		http.Error(rw, "Unable to convert end of ban", http.StatusBadRequest)
		return
	}

	p.l.Println("[DEBUG] get record id", uid)

	user, err := db.GetOne(uid) //data.FindUser(id)
	if err != nil {
		p.l.Println("[ERROR] fetching User", err)
		http.Error(rw, "User not found", http.StatusNotFound)
		return
	}
	userEmail := user.Email

	err = db.BanUser(uid, banEnd)

	switch err {
		case nil:
			p.l.Println("[SUCCESS] User banned until "+banReq.Until)
			email.SendEmail("admin@mail.com", userEmail, "Ban", "You've been banned until " + banReq.Until + ".\nReason for ban is: \n" + banReq.Reason)
			return
		case exceptions.ErrUserNotFound:
			p.l.Println("[ERROR] fetching User", err)
			http.Error(rw, "User not found", http.StatusNotFound)
			return
		default:
			p.l.Println("[ERROR] fetching User", err)
			http.Error(rw, "User not found", http.StatusInternalServerError)
			return
	}

}
