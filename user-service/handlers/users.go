package handlers

import (
	"log"
)

type Users struct {
	l *log.Logger
}

func NewUsers(l*log.Logger) *Users {
	return &Users{l}
}


type KeyUser struct{}
type KeyLoggedInUser struct{}
type KeyCredentials struct{}