package data

import (
	"fmt"

	"golang.org/x/crypto/bcrypt"
)

type User struct {
	ID          int      `json:"id"`
	FirstName   string   `json:"firstName"`
	LastName    string   `json:"lastName"`
	Password 	string   `json:"password"`
	Email    	string   `json:"email" validate:"required"`
	Role        UserRole `json:"role"`
	Banned		bool	 `json:"banned"`
}

type Users []*User

func GetUsers() Users {
	return userList
}

func AddUser(p *User) {
	p.ID = getNextID()
	p.Banned = false
	userList = append(userList, p)
}

func UpdateUser(id int, p *User) error {
	_, pos, err := FindUser(id)
	if err != nil {
		return err
	}

	p.ID = id
	userList[pos] = p
	return nil
}

func DeleteUser(id int) error {
	_, i, _ := FindUser(id)
	if i == -1 {
		return ErrUserNotFound
	}

	userList = append(userList[:i], userList[i+1])

	return nil
}

var ErrUserNotFound = fmt.Errorf("User not found")

var ErrBadCredentials = fmt.Errorf("Bad credentials")

func HashPassword(password string) (string, error) {
    bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
    return string(bytes), err
}

func CheckPasswordHash(password, hash string) bool {
    err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
    return err == nil
}

func CheckCredentials(c Credentials) (*User, error) {
	fmt.Println("Checking credentials: " + c.Email + ": " + c.Password)
	for _, val := range userList {
        if val.Email == c.Email && CheckPasswordHash(c.Password, val.Password) {
			return val, nil
		}
	}
	return nil, ErrBadCredentials
}

func FindUser(id int) (*User, int, error) {
	for i, p := range userList {
		if p.ID == id {
			return p, i, nil
		}
	}

	return nil, -1, ErrUserNotFound
}

func getNextID() int {
	lp := userList[len(userList)-1]
	return lp.ID + 1
}

var userList = []*User{
	{
		ID:          1,
		FirstName:        "Admin",
		LastName: "Adminic",
		Password:       "password",
		Email:         "admin@mail.com",
		Role: UserRole(Admin),
		Banned: false,
	},
	{
		ID:          2,
		FirstName:        "User1",
		LastName: "User1ic",
		Password:       "password",
		Email:         "user1@mail.com",
		Role: UserRole(RegUser),
		Banned: false,
	},
}