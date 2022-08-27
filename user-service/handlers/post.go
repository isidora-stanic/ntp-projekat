package handlers

import (
	"fmt"
	"net/http"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/isidora-stanic/ntp-projekat/user-service/db"
	"github.com/isidora-stanic/ntp-projekat/user-service/models"
	"github.com/isidora-stanic/ntp-projekat/user-service/utils"
)

func (p *Users) AddUser(rw http.ResponseWriter, r *http.Request) {
	p.l.Println("Handle POST User - now with db...")

	prod := r.Context().Value(KeyUser{}).(models.UserDTO)
	modelProd := prod.ToUserWithoutBan()
	hashedPass, err := db.HashPassword(prod.Password)
	if err != nil {
		http.Error(rw, "Cannot hash password", http.StatusInternalServerError)
		return
	}
	modelProd.Password = hashedPass
	
	saved, err := db.Create(modelProd)
	if err != nil {
		http.Error(rw, err.Error(), http.StatusBadRequest)
	}

	utils.ReturnResponseAsJson(rw, saved.ToDTO())
}



func (p *Users) Register(rw http.ResponseWriter, r *http.Request) {
	p.l.Println("Handle POST User - registration - now with db...")

	prod := r.Context().Value(KeyUser{}).(models.UserDTO)
	modelProd := prod.ToUserWithoutBan()
	hashedPass, err := db.HashPassword(prod.Password)
	if err != nil {
		http.Error(rw, "Cannot hash password", http.StatusInternalServerError)
		return
	}
	modelProd.Password = hashedPass
	modelProd.Role = models.REGUSER
	
	saved, err := db.Create(modelProd)
	if err != nil {
		http.Error(rw, err.Error(), http.StatusBadRequest)
	}

	utils.ReturnResponseAsJson(rw, saved.ToDTO())
}

var jwtKey = []byte("49d1f48e31eed39748b655518e6ede5e")

func (p *Users) Login(rw http.ResponseWriter, r *http.Request) {
	rw.Header().Set("Content-Type", "application/json")

	p.l.Println("Handle POST Credentials - login")

	cred := r.Context().Value(KeyCredentials{}).(models.Credentials)

	p.l.Println("email", cred.Email)

	user, err := db.CheckCredentials(cred)

	if err != nil {
		http.Error(rw, "Bad credentials", http.StatusUnauthorized)
		return
	}

	if user.BannedUntil.After(time.Now()) {
		http.Error(rw, "User is banned", http.StatusUnauthorized)
		return
	}
	
    expirationTime := time.Now().Add(time.Hour * 24)
	claims := models.Claims{Email: user.Email, Name: user.FirstName + " " + user.LastName, Role: user.Role, ID: uint32(user.ID), StandardClaims: jwt.StandardClaims{ExpiresAt: expirationTime.Unix()}}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, &claims)
	tokenString, _ := token.SignedString(jwtKey)

	response := models.LoginResponse{Token: tokenString}
	fmt.Println("Login response: " + response.Token)
	err = response.ToJSON(rw)
	if err != nil {
		http.Error(rw, "Unable to marshal json", http.StatusInternalServerError)
		return
	}
}