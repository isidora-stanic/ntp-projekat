package email

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
)

func SendEmail(from string, to string, subject string, message string) {

	values := map[string]string{"from": from, "to": to, "subject": subject, "msg": message}
	json_data, err := json.Marshal(values)

	if err != nil {
		fmt.Println(err.Error())
		return
	}

	resp, err := http.Post("http://localhost:9093/api/email/send", "application/json",
		bytes.NewBuffer(json_data))

	if err != nil {
		fmt.Println(err.Error())
		return
	}

	var res map[string]interface{}

	json.NewDecoder(resp.Body).Decode(&res)

	// fmt.Println(res["json"])
}