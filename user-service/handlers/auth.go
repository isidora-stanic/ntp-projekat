package handlers

import (
	"context"
	"encoding/json"
	"net/http"
	"strings"

	"github.com/dgrijalva/jwt-go"
	"github.com/isidora-stanic/ntp-projekat/user-service/db"
	"github.com/isidora-stanic/ntp-projekat/user-service/exceptions"
	"github.com/isidora-stanic/ntp-projekat/user-service/models"
)

func Authorize(r *http.Request) (*jwt.Token, error) {
	cookie := r.Header.Values("Authorization")
	tokenString := strings.Split(cookie[0], "Bearer ")[1]

	claims := models.Claims{}
	token, err := jwt.ParseWithClaims(tokenString, &claims,
		func(t *jwt.Token) (interface{}, error) {
			return jwtKey, nil
		})
	return token, err
}

func (u *Users) AuthorizeAdmin(rw http.ResponseWriter, req *http.Request) {
	rw.Header().Set("Content-Type", "application/json")

	token, err := Authorize(req)

	if err != nil || !token.Valid || token.Claims.(*models.Claims).Role != models.ADMIN {
		http.Error(rw, "Authorization has failed", http.StatusUnauthorized)
		return
	}

	json.NewEncoder(rw).Encode(models.ResponseWithMessage{Message: "Authorization succeeded"})
}

func (u *Users) AuthorizeRegUser(rw http.ResponseWriter, req *http.Request) {
	rw.Header().Set("Content-Type", "application/json")

	token, err := Authorize(req)

	if err != nil || !token.Valid || token.Claims.(*models.Claims).Role != models.REGUSER {
		http.Error(rw, "Authorization has failed", http.StatusUnauthorized)
		return
	}

	json.NewEncoder(rw).Encode(models.ResponseWithMessage{Message: "Authorization succeeded"})
}

func (u *Users) AuthorizeAny(rw http.ResponseWriter, req *http.Request) {
	rw.Header().Set("Content-Type", "application/json")

	token, err := Authorize(req)

	if err != nil || !token.Valid || (token.Claims.(*models.Claims).Role != models.REGUSER && token.Claims.(*models.Claims).Role != models.ADMIN) {
		http.Error(rw, "Authorization has failed", http.StatusUnauthorized)
		return
	}

	json.NewEncoder(rw).Encode(models.ResponseWithMessage{Message: "Authorization succeeded"})
}

func GetAuthenticatedUser(r *http.Request) (*models.User, error) {
	token, err := Authorize(r)
	if err != nil || !token.Valid {
		return nil, err
	}
	userId := token.Claims.(*models.Claims).ID
	user, err := db.GetOne(userId)
	if err != nil {
		return nil, exceptions.ErrUserNotFound
	}
	return &user, nil
}

// todo: authorization wrapper for handlers

type EnsureAuth struct {
    handler http.Handler
}

type EnsureAuthAdmin struct {
    handler http.Handler
}

func NewEnsureAuth(handlerToWrap http.Handler) *EnsureAuth {
    return &EnsureAuth{handlerToWrap}
}

func NewEnsureAuthAdmin(handlerToWrap http.Handler) *EnsureAuthAdmin {
    return &EnsureAuthAdmin{handlerToWrap}
}

func (ea *EnsureAuth) ServeHTTP(rw http.ResponseWriter, r *http.Request) {
    user, err := GetAuthenticatedUser(r)
    if err != nil {
        http.Error(rw, "Please sign-in", http.StatusUnauthorized)
        return
    }

	ctx := context.WithValue(r.Context(), KeyLoggedInUser{}, user)
	r = r.WithContext(ctx)

    ea.handler.ServeHTTP(rw, r)
}

func (ea *EnsureAuthAdmin) ServeHTTP(rw http.ResponseWriter, r *http.Request) {
    user, err := GetAuthenticatedUser(r)
    if err != nil {
        http.Error(rw, "Please sign-in", http.StatusUnauthorized)
        return
    }

	if user.Role != models.ADMIN {
		http.Error(rw, "Unatuhorised", http.StatusUnauthorized)
        return
	}

	ctx := context.WithValue(r.Context(), KeyLoggedInUser{}, user)
	r = r.WithContext(ctx)

    ea.handler.ServeHTTP(rw, r)
}