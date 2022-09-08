package handlers

import (
	"bytes"
	"encoding/json"
	"fmt"
	"html/template"
	"io"
	"log"
	"net/http"
	"net/smtp"
)

type Email struct {
	l *log.Logger
}

func NewEmail(l*log.Logger) *Email {
	return &Email{l}
}

type EmailBasicInfo struct {
	From 	string 	`json:"from" validate:"required"`
	To 		string 	`json:"to" validate:"required"`
	Subject string 	`json:"subject" validate:"required"`
	Message string 	`json:"msg" validate:"required"`
}

func (p *EmailBasicInfo) FromJSON(r io.Reader) error {
	d := json.NewDecoder(r)
	return d.Decode(p)
}

func SendEmail(ei *EmailBasicInfo, rw http.ResponseWriter) {
	// Sender data.

	// Receiver email address.
	to := []string{ei.To,}

	// smtp server configuration.
	smtpHost := "smtp.mailtrap.io"
	smtpPort := "2525"

	// Authentication.
	//auth := smtp.PlainAuth("", from, password, smtpHost)
	auth := smtp.PlainAuth("", "a8e284eabd290e", "6a55ad364d9481", smtpHost)

	t, _ := template.ParseFiles("templates/test-template.html")

	var body bytes.Buffer

	mimeHeaders := "MIME-version: 1.0;\nContent-Type: text/html; charset=\"UTF-8\";\n\n"
	body.Write([]byte(fmt.Sprintf("From: "+ei.From+"\r\nTo: "+ei.To+"\r\nSubject: "+ei.Subject+"\n%s\n\n", mimeHeaders)))

	t.Execute(&body, struct {
		Message string
	}{
		Message: ei.Message,
	})

	// Sending email.
	err := smtp.SendMail(smtpHost+":"+smtpPort, auth, ei.From, to, body.Bytes())
	if err != nil {
		http.Error(rw, err.Error(), http.StatusInternalServerError)
		return
	}
	rw.Write([]byte("Email successfuly sent"))
}

func (e *Email) SendBasicEmail(rw http.ResponseWriter, r *http.Request) {
	e.l.Println("Handle sending basic email")
	e.l.Println("EXCUSE ME1")

	ei := EmailBasicInfo{}
	e.l.Println("EXCUSE ME2")

	err := ei.FromJSON(r.Body)
	if err != nil {
		e.l.Println("Cannot convert json to email info")
		http.Error(rw, "Cannot convert json to email info", http.StatusBadRequest)
	}

	SendEmail(&ei, rw)
}