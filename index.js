import express from "express";
const app = express();

function passwordProtected(req, res, next) {
  const username = "admin";
  const password = "admin";
  const auth = "Basic " + Buffer.from(`${username}:${password}`).toString("base64");

  res.set("WWW-Authenticate", "Basic realm='Protected Page'");
  if (req.headers.authorization == auth) {
    next();
  }
  else {
    res.status(401).send("<h1>Authentication Failed, Try again.</h1>");
  }
}

app.use(passwordProtected);

app.get("/", (req, res) => {
  res.status(200).send("<h1>Only Authenticated User Can View This.</h1>");
})

app.listen(process.env.PORT || 3000);
