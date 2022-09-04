package email

import (
	"bytes"
	"encoding/json"
	"log"
	"net/http"
)

func SendEmail(from string, to string, subject string, message string) {

	values := map[string]string{"from": from, "to": to, "subject": subject, "msg": message}
	json_data, err := json.Marshal(values)

	if err != nil {
		log.Fatal(err)
	}

	resp, err := http.Post("http://localhost:9093/api/email/send", "application/json",
		bytes.NewBuffer(json_data))

	if err != nil {
		log.Fatal(err)
	}

	var res map[string]interface{}

	json.NewDecoder(resp.Body).Decode(&res)

	// fmt.Println(res["json"])
}