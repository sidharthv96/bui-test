// const request = require("request");

// const https = require("https"),
//   httpProxy = require("http-proxy"),
//   proxy = httpProxy.createProxyServer({ target: "http://localhost/5001" });

// https
//   .createServer(
//     {
//       key: `-----BEGIN RSA PRIVATE KEY-----
// MIIEpAIBAAKCAQEA0QqJ0+aVg9hJrn/VDWyjse5gISEdEAn7GnQY8Th1TA/JM7v9
// c0uO/reer0qdQOvycJGZJAx/n4KdnRZ1JELqSYAA85FhqRzXUQDLYpgP9ZU5ls3i
// S0cfHvCvpJlIKNwc5kEqHezskPRkXBcoCN0ForkCROvDZUsceT0Vl+HaIAsVBTNk
// wnytKWUl25ohTqRrrPH17iX0WD/Vp+u0X8G/YXfTQXqv5yF5BKkFUWdjwgWLB5JX
// mGScPBXTQWsmJZfz3ghtufxY4PiLO9Q+NGyuTyquDAgkKePO3sOZDXPEzz+crcAh
// md15e9EXFHM6Rcx7ZqfgkXIqnhlSfKRLpJNAfwIDAQABAoIBAQDAc6NQowkjyQyM
// ysOrCEnsljmKRqIrEgVL5XbRHdlfnWjvaDN+4iFUAFjnqRn9mzwoxuLmfVtBz06s
// QPC34aMw59f4ZfAzcYoJ2WFl8/k9b5UFcabVBzVvlsceEsCMXZl9oqDTzDw/d8Ct
// x+PjxRhbJ1kfeq75op0kQUiP/C6FMAQ64bD6yD8DeVz5gYKdheI+7hF0u6oyFyYW
// Gai4FFQUkRxZjsxTuqOSf5ZPsSY9Xy0FTrC0azUbzaCDC3GwKgedZp/otwAH/3uA
// iqPOApUY30bFORDuwZvriaoJjzriCmnanj07WfpxHqeg47/uOB8AulSp1b4J8MB7
// WOrSxf6BAoGBAPNRdPmE9mFQtcbgJMNbF15rlufSGBhB0SIU3v+42iIhEAKynKmW
// oy6/REKcp+NIAZCWPNg/COZm+mH8yXP50/ItbTtdI/dJTdqCS1+D/Ks38ubTiUNh
// EwEKwaG/XbX18ATtaaypq2n8bl4yPML3MxBvaiU9qxX5skiJ5ofrM4h7AoGBANvv
// uvlo3WvFcAfwiQCt7mbptn8g9EVjnRnkG3EqWHU6i5ZEJROtZn+1u3tto6SqmWuX
// KjpuWj6Gr8pDssiGNWl08QRFQmIBB1curkHETRrwKiJw6PVjhKhvTuz4/CylSZF8
// AnKoRe08V9LAFeCF0yIWBaJ2jy037MyHCIyeWgLNAoGANdGurgJa/Ot9SaAKgauE
// X74sgtpVugfU2lUDfkzE8wedIvue62QGdDCaSKGeAQfMUM7qZmqK7WuZtlLTvHNm
// Dgs+PgM8EVaFge+P/HCVUsntUGE52019hp16dux9LeJYVL6uwSJGaAsN3of+KKHF
// Cb2bHOGnFhVE+gaGl0nO/EECgYBVMXVxqwcp+d69lJTdKIKSZrGEaRV103JFVzCy
// Ez8Umcr8OAVMq/xqN9EZrIyY+mRXYsS+wYQ/eBib9sFIH4SNBvldOB7Qq6lWQgTK
// AOoFJ0aK9MWoWBZI0GT4MjIscRIgQrMICtqbXKaAQlu3Dt+L8o/YMKihUWpuh1fu
// cGBZeQKBgQCp8m7AgNj+DAro+qkCYUaUxvNhdar6F1mywCXZnEFxKH6qrErxQbfx
// rZQTuK4opB9/a5eK2+5dglZT2T4IDnpTcg6D5AX5zrBvTL00eMNe+5Q/J46Vcol1
// 79nV99A4CDE+t8OKR/h+nP5spp4T3SImRwiQCjuNSUaylY6b2G3HfA==
// -----END RSA PRIVATE KEY-----
// `,
//       cert: `-----BEGIN CERTIFICATE-----
// MIIDRzCCAi+gAwIBAgIUaq8bJzGkRMhkx1kRqHAUs54Ky1MwDQYJKoZIhvcNAQEL
// BQAwMzELMAkGA1UEBhMCSU4xEzARBgNVBAgMClNvbWUtU3RhdGUxDzANBgNVBAoM
// Bk9yYWNsZTAeFw0xOTA5MjUxMDU0NDJaFw0yMDA5MjQxMDU0NDJaMDMxCzAJBgNV
// BAYTAklOMRMwEQYDVQQIDApTb21lLVN0YXRlMQ8wDQYDVQQKDAZPcmFjbGUwggEi
// MA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDRConT5pWD2Emuf9UNbKOx7mAh
// IR0QCfsadBjxOHVMD8kzu/1zS47+t56vSp1A6/JwkZkkDH+fgp2dFnUkQupJgADz
// kWGpHNdRAMtimA/1lTmWzeJLRx8e8K+kmUgo3BzmQSod7OyQ9GRcFygI3QWiuQJE
// 68NlSxx5PRWX4dogCxUFM2TCfK0pZSXbmiFOpGus8fXuJfRYP9Wn67Rfwb9hd9NB
// eq/nIXkEqQVRZ2PCBYsHkleYZJw8FdNBayYll/PeCG25/Fjg+Is71D40bK5PKq4M
// CCQp487ew5kNc8TPP5ytwCGZ3Xl70RcUczpFzHtmp+CRciqeGVJ8pEukk0B/AgMB
// AAGjUzBRMB0GA1UdDgQWBBSzgkVj6W7417J9JQiDGEDORH+gEDAfBgNVHSMEGDAW
// gBSzgkVj6W7417J9JQiDGEDORH+gEDAPBgNVHRMBAf8EBTADAQH/MA0GCSqGSIb3
// DQEBCwUAA4IBAQB8FgZOUpmFkJ4C7ZWBtSsna78aEOPBrOwKZticMsDUTX9wsnFl
// ntdMYYaJM82ZZkizM/MuBikrSYRFRCvwrROkp5VAiH/1ZWnD/WRrR2r32x3KGGiP
// yjJg1dQEfTBHyZLwXN+06BoczldBwC7gVDDnGHR7yXefbthqHk5b4/o+dRApRPcn
// rsN4Uzq+w39+i6P3wEM9/9/W0ASCyYCfM5UP9lklEjqgPv8gOXUqI11vmXm0RGK5
// a115A+T3UDnSW36f4K7cuPwu9DQOs7AEQpkiVpWVentAG9N1iry2NT1E4XQNRCzw
// 49RHhKgTLBkgAuWu7UVs0EYsebjYBLqcP6vo
// -----END CERTIFICATE-----`
//     },
//     function(req, res) {
//       req.method = "GET";
//       console.log("Tets");
//       proxy.web(req, res, function(err) {
//         console.log(err);
//       });
//     }
//   )
//   .listen(5005, () => console.log("Listening"));

var https = require("https"),
  httpProxy = require("http-proxy");
const fs = require("fs");

//
// Create a proxy server with custom application logic
//
var proxy = httpProxy.createProxyServer({});

//
// Create your custom server and just call `proxy.web()` to proxy
// a web request to the target passed in the options
// also you can use `proxy.ws()` to proxy a websockets request
//
var server = https.createServer(
  {
    key: fs.readFileSync("ssl/key.pem", "utf8"),
    cert: fs.readFileSync("ssl/cert.pem", "utf8")
  },
  function(req, res) {
    // You can define here your custom logic to handle the request
    // and then proxy the request.
    proxy.web(req, res, { target: "http://127.0.0.1:5001" });
  }
);

console.log("listening on port 5005");
server.listen(5005);
