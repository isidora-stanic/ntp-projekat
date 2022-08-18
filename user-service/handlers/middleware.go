package handlers

import (
	"context"
	"fmt"
	"net/http"
	"strings"

	"github.com/isidora-stanic/ntp-projekat/user-service/data"
)

func (p Users) MiddlewareValidateUser(next http.Handler) http.Handler {
	return http.HandlerFunc(func(rw http.ResponseWriter, r *http.Request) {
		route := strings.TrimPrefix(r.URL.Path, "/api/users/")
		if route == "login" {
			p.l.Println("Handling credentials in the middleware")
			cred := data.Credentials{}

			err := cred.FromJSON(r.Body)
			if err != nil {
				p.l.Println("[ERROR] deserializing credientials", err)
				http.Error(rw, "Error reading credientials", http.StatusBadRequest)
				return
			}
			err = cred.Validate()
			if err != nil {
				p.l.Println("[ERROR] validating credientials", err)
				http.Error(
					rw,
					fmt.Sprintf("Error validating credientials: %s", err),
					http.StatusBadRequest,
				)
				return
			}
			ctx := context.WithValue(r.Context(), KeyCredentials{}, cred)
			r = r.WithContext(ctx)

			// Call the next handler, which can be another middleware in the chain, or the final handler.
			next.ServeHTTP(rw, r)
			return
		} else {
			p.l.Println("Handling user in the middleware")
			prod := data.User{}

			err := prod.FromJSON(r.Body)
			if err != nil {
				p.l.Println("[ERROR] deserializing user", err)
				http.Error(rw, "Error reading user", http.StatusBadRequest)
				return
			}
	
			err = prod.Validate()
			if err != nil {
				p.l.Println("[ERROR] validating user", err)
				http.Error(
					rw,
					fmt.Sprintf("Error validating user: %s", err),
					http.StatusBadRequest,
				)
				return
			}
	
			ctx := context.WithValue(r.Context(), KeyUser{}, prod)
			r = r.WithContext(ctx)
	
			// Call the next handler, which can be another middleware in the chain, or the final handler.
			next.ServeHTTP(rw, r)
		}
	})
}