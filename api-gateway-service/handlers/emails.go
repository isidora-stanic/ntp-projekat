package handlers

import (
	"log"
	"net/http"

	"github.com/isidora-stanic/ntp-projekat/api-gateway-service/utils"
)

const EmailService string = "/api/email"

type Emails struct {
	l *log.Logger
}

func NewEmails(l *log.Logger) *Emails {
	return &Emails{l}
}

type KeyEmail struct{}

func (p *Emails) SendBasicEmail(rw http.ResponseWriter, r *http.Request) {
	p.l.Println("EXCUSE ME")
	utils.SetupResponse(&rw, r)

	req, _ := http.NewRequest(http.MethodPost,
		utils.EmailServiceRoot.Next().Host+EmailService+"/send", r.Body)
	req.Header.Set("Accept", "application/json")
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	response, err := client.Do(req)

	if err != nil {
		rw.WriteHeader(http.StatusGatewayTimeout)
		return
	}

	utils.DelegateResponse(response, rw)
}