const mysql= require('mysql');
const bcrypt= require("bcryptjs");
const jwt= require("jsonwebtoken");

const db= mysql.createConnection({
    user: process.env.DB_USER ,
    host: process.env.DB_HOST ,
    password: process.env.DB_PSWD ,
    database: process.env.DB ,
});

exports.register= (req,res) =>{
    console.log(req.body);
    
    const {name, email, password, confirm, ques, ans}= req.body; //destructuring in js

    db.query('SELECT email FROM users WHERE email = ?', [email], async(error, result) =>{  //where email = email given by user; checking if the email already exists in db; function with error if statement not executed and results of statement
        if(error){
            console.log(error);
        }

        if(result.length>0){  //result is an array; if the given email already exists
            return res.render("register.ejs", {
                message:"This email is already registered."
            });
        }
        else if(password !== confirm) {  //check confirm=password
            return res.render("register.ejs", {
                message: "Passwords do not match."
            });
        }

        let hashedPassword= await bcrypt.hash(password, 8);  // hashing may take a while so await; 8 rounds of hashing is usually safe
        console.log(hashedPassword);

        db.query('INSERT INTO users SET ?', {name: name, email: email, password: hashedPassword, sec_ques: ques, sec_ans: ans}, (error, result) =>{     //add values to db; callback fn
            if(error){
                console.log(error);
            }
            else{
                console.log(result);
                return res.render("register.ejs", {
                    message: "You have been registered successfully. Please login."
                });
            }
        })     

    }) 

}

exports.login= (req, res) =>{
    console.log(req.body);
    res.send("Logged in");
}