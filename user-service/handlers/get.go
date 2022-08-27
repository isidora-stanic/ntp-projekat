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

func (p *Users) GetUsers(rw http.ResponseWriter, r *http.Request) {
	p.l.Println("Handle GET Users - now with db...")

	lp := db.GetAll()//data.GetUsers()

	// p.l.Println(lp[len(lp)-1].FirstName)

	dlp := []models.UserDTO{}
	
	for _, prod := range lp {
		// p.l.Println(prod.FirstName)
		dlp = append(dlp, prod.ToDTO())
	}

	utils.ReturnResponseAsJson(rw, dlp)
}

func (p *Users) GetUser(rw http.ResponseWriter, r *http.Request) {
	p.l.Println("Handle GET User - now with db...")

	vars := mux.Vars(r)
	id, err := strconv.ParseUint(vars["id"], 10, 32)//strconv.Atoi()
	if err != nil {
		http.Error(rw, "Unable to convert id", http.StatusBadRequest)
		return
	}
	uid := uint32(id)

	p.l.Println("[DEBUG] get record id", uid)

	prod, err := db.GetOne(uid)//data.FindUser(id)

	switch err {
	case nil:

	case exceptions.ErrUserNotFound:
		p.l.Println("[ERROR] fetching User", err)
		http.Error(rw, "User not found", http.StatusNotFound)
		return
	default:
		p.l.Println("[ERROR] fetching User", err)
		http.Error(rw, "User not found", http.StatusInternalServerError)
		return
	}

	utils.ReturnResponseAsJson(rw, prod.ToDTO())
}

// func (p *Users) BanUser(rw http.ResponseWriter, r *http.Request) {
// 	p.l.Println("Handle GET User [BAN] - now with db...")

// 	vars := mux.Vars(r)
// 	id, err := strconv.ParseUint(vars["id"], 10, 32)//strconv.Atoi()
// 	if err != nil {
// 		http.Error(rw, "Unable to convert id", http.StatusBadRequest)
// 		return
// 	}
// 	uid := uint32(id)

// 	p.l.Println("[DEBUG] get record id", uid)

// 	prod, err := db.GetOne(uid)//data.FindUser(id)

// 	switch err {
// 	case nil:
// 		if (!prod.Banned) {
// 			prod.Banned = true
// 		} else {
// 			p.l.Println("[ERROR] User is already banned", err)
// 			http.Error(rw, "User is already banned", http.StatusBadRequest)
// 			return
// 		}
// 		break
// 	case exceptions.ErrUserNotFound:
// 		p.l.Println("[ERROR] fetching User", err)
// 		http.Error(rw, "User not found", http.StatusNotFound)
// 		return
// 	default:
// 		p.l.Println("[ERROR] fetching User", err)
// 		http.Error(rw, "User not found", http.StatusInternalServerError)
// 		return
// 	}

// 	saved, err := db.Update(uid, prod)

// 	utils.ReturnResponseAsJson(rw, saved.ToDTO())
// }

// func (p *Users) PermitUser(rw http.ResponseWriter, r *http.Request) {
// 	p.l.Println("Handle GET User [PERMIT] - now with db...")

// 	vars := mux.Vars(r)
// 	id, err := strconv.ParseUint(vars["id"], 10, 32)//strconv.Atoi()
// 	if err != nil {
// 		http.Error(rw, "Unable to convert id", http.StatusBadRequest)
// 		return
// 	}
// 	uid := uint32(id)

// 	p.l.Println("[DEBUG] get record id", uid)

// 	prod, err := db.GetOne(uid)//data.FindUser(id)

// 	switch err {
// 	case nil:
// 		if (prod.Banned) {
// 			prod.Banned = false
// 		} else {
// 			p.l.Println("[ERROR] User is not banned", err)
// 			http.Error(rw, "User is not banned", http.StatusBadRequest)
// 			return
// 		}
// 		break
// 	case exceptions.ErrUserNotFound:
// 		p.l.Println("[ERROR] fetching User", err)
// 		http.Error(rw, "User not found", http.StatusNotFound)
// 		return
// 	default:
// 		p.l.Println("[ERROR] fetching User", err)
// 		http.Error(rw, "User not found", http.StatusInternalServerError)
// 		return
// 	}

// 	saved, err := db.Update(uid, prod)

// 	utils.ReturnResponseAsJson(rw, saved.ToDTO())
// }