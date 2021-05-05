const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocodeUtils");
const forcast = require("./utils/forcast");
const app = express();
const partialPath = path.join(__dirname, "../views/partialViews");
const viewsPath = path.join(__dirname, "../views/templates");

hbs.registerPartials(partialPath);
app.set("view engine", "hbs");
app.set("views", viewsPath);
app.use(express.static(path.join(__dirname, "../public")));

app.get("", (req, res) => {
  res.render("index", {
    title: "Whether",
    body: "Meghna sharma",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    body: "Meghna sharma",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    body: "Meghna sharma",
  });
});

app.get("/whether", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "Please add your address!" });
  }
  geocode(req.query.address, (error, data) => {
    if (error) {
      return res.send({ error });
    }
    forcast(data, (error, data) => {
      if (error) {
        return res.send({ error });
      }
      res.send({ data });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    message: "this article is not found",
  });
});
app.get("*", (req, res) => {
  res.render("error", {
    title: "404 not found",
    message: "xyz",
  });
});
const server = app.listen("3000");
process.on("exit", () => {
  server.close;
});
process.on("uncaughtException", () => {
  server.close;
});
