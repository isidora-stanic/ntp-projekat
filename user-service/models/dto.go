package models

import (
	"encoding/json"
	"io"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/go-playground/validator"
)

type UserDTO struct {
	ID        uint32     `json:"id"`
	FirstName string   `json:"firstName"`
	LastName  string   `json:"lastName"`
	Password  string   `json:"password"`
	Email     string   `json:"email" validate:"email,required"`
	Role      UserRole `json:"role"`
	BannedUntil    time.Time     `json:"bannedUntil"`
}

func (p *UserDTO) ToUser() User {
	return User{
		FirstName: p.FirstName,
		LastName:  p.LastName,
		Password:  p.Password,
		Email:     p.Email,
		Role:      p.Role,
		BannedUntil:    p.BannedUntil,
	}
}

func (p *UserDTO) ToUserWithoutBan() User {
	return User{
		FirstName: p.FirstName,
		LastName:  p.LastName,
		Password:  p.Password,
		Email:     p.Email,
		Role:      p.Role,
		BannedUntil:    time.Now(),
	}
}

type BanRequest struct {
	Until	 string `json:"until"`
}

type Credentials struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type Claims struct {
	ID    uint32     `json:"id"`
	Name  string	`json:"name"`
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

func (p *UserDTO) Validate() error {
	validate := validator.New()
	return validate.Struct(p)
}

func (p *Credentials) Validate() error {
	validate := validator.New()
	return validate.Struct(p)
}

func (p *UserDTO) ToJSON(w io.Writer) error {
	e := json.NewEncoder(w)
	return e.Encode(p)
}

func (p *UserDTO) FromJSON(r io.Reader) error {
	d := json.NewDecoder(r)
	return d.Decode(p)
}

func (p *Credentials) FromJSON(r io.Reader) error {
	d := json.NewDecoder(r)
	return d.Decode(p)
}

func (p *LoginResponse) ToJSON(w io.Writer) error {
	e := json.NewEncoder(w)
	return e.Encode(p)
}

func (p *BanRequest) FromJSON(r io.Reader) error {
	d := json.NewDecoder(r)
	return d.Decode(p)
}