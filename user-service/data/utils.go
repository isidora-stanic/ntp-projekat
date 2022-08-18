package data

import (
	"github.com/dgrijalva/jwt-go"
)

type Credentials struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type Claims struct {
	ID    int     `json:"id"`
	Email string   `json:"email"`
	Role  UserRole `json:"role"`
	jwt.StandardClaims
}

type LoginResponse struct {
	Token string `json:"token"`
}

type ResponseWithMessage struct {
	Message string `json:"message"`
}