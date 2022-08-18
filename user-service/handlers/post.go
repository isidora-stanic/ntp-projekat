package handlers

import (
	"fmt"
	"net/http"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/isidora-stanic/ntp-projekat/user-service/data"
)

func (p *Users) AddUser(rw http.ResponseWriter, r *http.Request) {
	p.l.Println("Handle POST User")

	prod := r.Context().Value(KeyUser{}).(data.User)
	hashedPass, err := data.HashPassword(prod.Password)
	if err != nil {
		http.Error(rw, "Cannot hash password", http.StatusInternalServerError)
		return
	}
	prod.Password = hashedPass
	data.AddUser(&prod)
}



func (p *Users) Register(rw http.ResponseWriter, r *http.Request) {
	p.l.Println("Handle POST User - registration")

	prod := r.Context().Value(KeyUser{}).(data.User)
	hashedPass, err := data.HashPassword(prod.Password)
	if err != nil {
		http.Error(rw, "Cannot hash password", http.StatusInternalServerError)
		return
	}
	prod.Password = hashedPass
	prod.Role = data.RegUser
	data.AddUser(&prod)
}

var jwtKey = []byte("49d1f48e31eed39748b655518e6ede5e")

func (p *Users) Login(rw http.ResponseWriter, r *http.Request) {
	rw.Header().Set("Content-Type", "application/json")

	p.l.Println("Handle POST Credentials - login")

	cred := r.Context().Value(KeyCredentials{}).(data.Credentials)

	user, err := data.CheckCredentials(cred)

	if err != nil {
		http.Error(rw, "Bad credentials", http.StatusUnauthorized)
		return
	}

	if user.Banned {
		http.Error(rw, "User is banned", http.StatusUnauthorized)
		return
	}
	
    expirationTime := time.Now().Add(time.Hour * 24)
	claims := data.Claims{Email: user.Email, Role: user.Role, ID: user.ID, StandardClaims: jwt.StandardClaims{ExpiresAt: expirationTime.Unix()}}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, &claims)
	tokenString, _ := token.SignedString(jwtKey)

	response := data.LoginResponse{Token: tokenString}
	fmt.Println("Login response: " + response.Token)
	err = response.ToJSON(rw)
	if err != nil {
		http.Error(rw, "Unable to marshal json", http.StatusInternalServerError)
		return
	}
}