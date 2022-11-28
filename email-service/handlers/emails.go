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

type EmailInfoWithLink struct {
	From 	string 	`json:"from" validate:"required"`
	To 		string 	`json:"to" validate:"required"`
	Subject string 	`json:"subject" validate:"required"`
	Message string 	`json:"msg" validate:"required"`
	Link    string  `json:"link" validate:"required"`
}

func (p *EmailBasicInfo) FromJSON(r io.Reader) error {
	d := json.NewDecoder(r)
	return d.Decode(p)
}

func (p *EmailInfoWithLink) FromJSON(r io.Reader) error {
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

	t, _ := template.ParseFiles("templates/basic-template.html")

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

func SendDeletedReview(ei *EmailBasicInfo, rw http.ResponseWriter) {
	// Sender data.

	// Receiver email address.
	to := []string{ei.To,}

	// smtp server configuration.
	smtpHost := "smtp.mailtrap.io"
	smtpPort := "2525"

	// Authentication.
	//auth := smtp.PlainAuth("", from, password, smtpHost)
	auth := smtp.PlainAuth("", "a8e284eabd290e", "6a55ad364d9481", smtpHost)

	t, _ := template.ParseFiles("templates/deleted-review-template.html")

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

func SendProductChanged(ei *EmailInfoWithLink, rw http.ResponseWriter) {
	// Sender data.

	// Receiver email address.
	to := []string{ei.To,}

	// smtp server configuration.
	smtpHost := "smtp.mailtrap.io"
	smtpPort := "2525"

	// Authentication.
	//auth := smtp.PlainAuth("", from, password, smtpHost)
	auth := smtp.PlainAuth("", "a8e284eabd290e", "6a55ad364d9481", smtpHost)

	t, _ := template.ParseFiles("templates/product-changed-template.html")

	var body bytes.Buffer

	mimeHeaders := "MIME-version: 1.0;\nContent-Type: text/html; charset=\"UTF-8\";\n\n"
	body.Write([]byte(fmt.Sprintf("From: "+ei.From+"\r\nTo: "+ei.To+"\r\nSubject: "+ei.Subject+"\n%s\n\n", mimeHeaders)))

	t.Execute(&body, struct {
		Message string
		Link string
	}{
		Message: ei.Message,
		Link: ei.Link,
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

	ei := EmailBasicInfo{}

	err := ei.FromJSON(r.Body)
	if err != nil {
		e.l.Println("Cannot convert json to email info")
		http.Error(rw, "Cannot convert json to email info", http.StatusBadRequest)
	}

	SendEmail(&ei, rw)
}

func (e *Email) SendDeletedReviewEmail(rw http.ResponseWriter, r *http.Request) {
	e.l.Println("Handle sending deleted review email")

	ei := EmailBasicInfo{}

	err := ei.FromJSON(r.Body)
	if err != nil {
		e.l.Println("Cannot convert json to email info")
		http.Error(rw, "Cannot convert json to email info", http.StatusBadRequest)
	}

	SendDeletedReview(&ei, rw)
}

func (e *Email) SendProductChangeEmail(rw http.ResponseWriter, r *http.Request) {
	e.l.Println("Handle sending deleted review email")

	ei := EmailInfoWithLink{}

	err := ei.FromJSON(r.Body)
	if err != nil {
		e.l.Println("Cannot convert json to email info")
		http.Error(rw, "Cannot convert json to email info", http.StatusBadRequest)
	}

	SendProductChanged(&ei, rw)
}
