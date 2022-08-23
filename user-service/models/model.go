package models

import (
	"github.com/jinzhu/gorm"
)

type UserRole string

const (
	ADMIN UserRole = "ADMIN"
	REGUSER  UserRole = "REGUSER"
)

type User struct {
	gorm.Model

	FirstName   string   `json:"firstName" gorm:"not null;default:null"`
	LastName    string   `json:"lastName" gorm:"not null;default:null"`
	Password 	string   `json:"password"`
	Email    	string   `json:"email" gorm:"not null;default:null;unique"`
	Role        UserRole `json:"role" gorm:"not null;default:null"`
	Banned		bool	 `json:"banned"`
}

func (p*User) ToDTO() UserDTO {
	return UserDTO{
		ID: 	   uint32(p.ID),
		FirstName: p.FirstName, 
		LastName:  p.LastName,
		Email: 	   p.Email, 
		Role: 	   p.Role, 
		Banned:    p.Banned,
	}
}