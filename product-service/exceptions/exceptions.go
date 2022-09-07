package exceptions

import "fmt"

var ErrProductNotFound = fmt.Errorf("Product not found")

var ErrSubscriptionNotFound = fmt.Errorf("Subscription not found")