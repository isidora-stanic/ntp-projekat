package db

import (
	"errors"
	"fmt"

	"github.com/isidora-stanic/ntp-projekat/user-service/exceptions"
	"github.com/isidora-stanic/ntp-projekat/user-service/models"
	"golang.org/x/crypto/bcrypt"
)

func GetAll() ([]models.User) {
	fmt.Println("Hello from repo")
	var users []models.User

	Db.Find(&users)

	fmt.Println(len(users))

	return users
}

func GetOne(id uint32) (models.User, error) {
	var user models.User

	Db.First(&user, id)

	if user.ID == 0 {
		return user, exceptions.ErrUserNotFound
	}

	return user, nil
}

func Create(p models.User) (models.User, error) {
	saved := Db.Create(&p)

	if saved.Error != nil {
		return p, saved.Error
	}

	return p, nil
}

func Update(id uint32, p models.User) (models.User, error) {
	found, err := GetOne(id)

	if err != nil {
		return found, err
	}

	found.FirstName = p.FirstName
	found.LastName = p.LastName
	found.Email = p.Email
	found.Password = p.Password
	found.Banned = p.Banned
	found.Role = p.Role

	res := Db.Save(&found)

	return found, res.Error
}

func Delete(id uint32) (error) {
	found, err := GetOne(id)

	if err != nil {
		return err
	}

	Db.Delete(&found)

	return nil
}

func HashPassword(password string) (string, error) {
    bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
    return string(bytes), err
}

func CheckPasswordHash(password, hash string) bool {
    err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
    return err == nil
}

func CheckCredentials(c models.Credentials) (*models.User, error) {
	var user models.User
	if err != nil {
		fmt.Println("Pass encryption failed")
		return &user, err
	}

	//Db.Table("users").Where("email = ? AND password = ?", c.Email, c.Password).First(&user)
	Db.Table("users").Where("email = ?", c.Email).First(&user)
	if !CheckPasswordHash(c.Password, user.Password) {
		return nil, errors.New("Invalid username or password.")
	}

	if user.ID == 0 {
		return &user, errors.New("Invalid username or password.")
	}

	if user.Banned {
		return &user, exceptions.ErrUserBanned
	}

	return &user, nil

}