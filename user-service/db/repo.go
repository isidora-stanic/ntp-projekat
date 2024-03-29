package db

import (
	"errors"
	"fmt"
	"time"

	"github.com/isidora-stanic/ntp-projekat/user-service/exceptions"
	"github.com/isidora-stanic/ntp-projekat/user-service/models"
	"golang.org/x/crypto/bcrypt"
)

func GetAll() ([]models.User) {
	var users []models.User

	Db.Find(&users)

	fmt.Println(len(users))

	return users
}

func GetAllNotDeleted() ([]models.User) {
	var users []models.User

	Db.Table("users").Where("deleted_at IS NULL").Find(&users)

	for _, u := range(users) {
		if u.DeletedAt != nil {
			panic("aaaaaaaaa")
		}
		fmt.Println(u.Email, u.DeletedAt)
	}

	fmt.Println(users)

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
	found.BannedUntil = p.BannedUntil
	found.Role = p.Role

	res := Db.Save(&found)

	return found, res.Error
}

func Delete(id uint32) (error) {
	found, err := GetOne(id)
	fmt.Println("found to delete", found)

	if err != nil {
		return err
	}

	Db.Delete(&models.User{}, id)

	fmt.Println("after delete", found)


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

	if user.BannedUntil.After(time.Now()) {
		return &user, exceptions.ErrUserBanned
	}

	return &user, nil

}

func BanUser(uid uint32, banEnd time.Time) error {
	var user models.User

	Db.First(&user, uid)

	if user.ID == 0 {
		return exceptions.ErrUserNotFound
	}

	user.BannedUntil = banEnd
	err := Db.Save(user).Error

	return err
}