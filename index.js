const express= require('express')
const app= express();
const mysql= require('mysql');
const dotenv= require('dotenv');
// our client-side (react) application works on port 3000 so we use anoher port- 3001- here

app.set("view-engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended: false})); //access form inputs inside the post method
app.use(express.json()); //values from form should get stored as json
dotenv.config({path: './.env'});
app.use("/", require("./routes/pages"));
app.use("/auth", require("./routes/auth"));


//establish connection between mysql database and our server
const db= mysql.createConnection({
    user: process.env.DB_USER ,
    host: process.env.DB_HOST ,
    password: process.env.DB_PSWD ,
    database: process.env.DB ,
});

db.connect((error) =>{
    if(error){
        console.log(error)
    }
    else{
        console.log("SUCCESS")
    }
})






const port= process.env.PORT || 3001;
app.listen(port, ()=> {
    console.log("Server has started on port 3001");
});

