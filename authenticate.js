const express = require("express");
const bodyParser = require("body-parser");
const ldap = require("ldapjs");
const app = express();
const port = 3000;

app.use(bodyParser.json());

const LDAP_URL = "ldap://your-ldap-server.com"; // Replace with your LDAP server URL
const BASE_DN = "dc=example,dc=com"; // Replace with your base DN

const authenticate = (username, password, callback) => {
  const client = ldap.createClient({
    url: LDAP_URL,
  });

  const dn = `uid=${username},${BASE_DN}`; // Adjust DN format based on your LDAP structure

  client.bind(dn, password, (err) => {
    if (err) {
      client.unbind();
      return callback(err);
    }
    callback(null, true);
    client.unbind();
  });
};

app.post("/api/authenticate", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  authenticate(username, password, (err, success) => {
    if (err || !success) {
      return res.status(401).json({ message: "Authentication failed" });
    }
    res.status(200).json({ message: "Authentication successful" });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
