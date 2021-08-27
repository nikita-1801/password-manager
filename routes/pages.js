const express = require('express');
const router = express.Router();


router.get("/", (req,res) =>{
    res.render("index.ejs");
})

router.get("/login", (req, res) => {
    res.render("login.ejs");
});

router.get("/register", (req, res) => {
    res.render("register.ejs");
});

router.get("/home", (req, res) => {
    res.render("home.ejs");
});

router.get("/get", (req, res) => {
    res.render("get.ejs");
});

router.get("/generate", (req, res) => {
    res.render("generate.ejs");
});

router.get("/save", (req, res) => {
    res.render("save.ejs");
});



module.exports= router;