const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/login", (req, res, next) => {
  res.send(
    '<form onsubmit="localStorage.setItem(`username`,document.getElementById(`username`).value)" action="/user" method="POST"><input type="text" id="username" name="username"><button type="submit">Login</button></form>'
  );
});

app.use("/user", (req, res, next) => {
  res.redirect("/");
});

app.get("/", (req, res, next) => {
  fs.readFile("username.txt", (err, messages) => {
    if (err) {
      messages = "";
    }
    res.send(
      `${messages}<form onsubmit="document.getElementById('username').value = localStorage.getItem('username')" action="/" method="POST"><input type="text" id="message" name="message"><input type="hidden" id="username" name="username"><button type="submit">Send Message</button></form>`
    );
  });
});

app.post("/", (req, res, next) => {
  fs.appendFile(
    "username.txt",
    `${req.body.username}:${req.body.message} `,
    (err) => {
      err ? console.log(err) : res.redirect("/");
    }
  );
});

app.listen(3000);