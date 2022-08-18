package data

import (
	"github.com/go-playground/validator"
)

func (p *User) Validate() error {
	validate := validator.New()
	return validate.Struct(p)
}

func (p *Credentials) Validate() error {
	validate := validator.New()
	return validate.Struct(p)
}