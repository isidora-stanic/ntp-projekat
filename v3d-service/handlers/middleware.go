package handlers

import (
	"context"
	"encoding/json"
	"net/http"

	"github.com/isidora-stanic/ntp-projekat/v3d-service/db"
)

func (p RoomSetups) MiddlewareValidateProduct(next http.Handler) http.Handler {
	return http.HandlerFunc(func(rw http.ResponseWriter, r *http.Request) {
		p.l.Println("Hello form middleware")
		prod := db.RoomSetup{}

		err := json.NewDecoder(r.Body).Decode(&prod)
		if err != nil {
			p.l.Println("[ERROR] deserializing room setup", err)
			http.Error(rw, "Error reading room setup", http.StatusBadRequest)
			return
		}

		ctx := context.WithValue(r.Context(), KeyRoomSetup{}, prod)
		r = r.WithContext(ctx)

		// Call the next handler, which can be another middleware in the chain, or the final handler.
		next.ServeHTTP(rw, r)
	})
}
