package utils

import (
	"bytes"
	"errors"
	"net/http"
)

func AuthorizeRole(r *http.Request, role string) error {
	authRequest, _ := http.NewRequest(http.MethodGet,
		UserServiceRoot.Next().Host+"/api/users/authorize/"+role,
		bytes.NewBufferString(""))
	authRequest.Header.Set("Accept", "application/json")
	values := r.Header.Values("Authorization")

	if len(values) == 0 {
		return ErrUnauthorized
	}

	authRequest.Header.Set("Authorization", values[0])
	authClient := &http.Client{}
	authResponse, err := authClient.Do(authRequest)

	if err != nil {
		return errors.New("user service is down")
	}

	if authResponse.StatusCode != 200 {
		return ErrUnauthorized
	}

	return nil
}

func AuthorizeADMIN(r *http.Request) error {
	return AuthorizeRole(r, "ADMIN")
}

func AuthorizeREGUSER(r *http.Request) error {
	return AuthorizeRole(r, "REGUSER")
}

func AuthorizeAnyRole(r *http.Request) error {
	erra := AuthorizeADMIN(r)
	erru := AuthorizeREGUSER(r)

	if erra != nil && erru != nil {
		return ErrUnauthorized
	}

	return nil
}

var ErrUnauthorized = errors.New("Unauthorized")