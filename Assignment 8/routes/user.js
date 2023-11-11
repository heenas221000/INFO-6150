const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
const User = require("../models/user");
var validator = require("email-validator");
var nameValidator = require('validator');

const bcrypt = require("bcrypt");
const saltRounds = 10;

var passwordValidator = require("password-validator");
const user = require("../models/user");

// Create a schema
var schema = new passwordValidator();


// Add properties to it
schema
    .is()
    .min(8) // Minimum length 8
    .is()
    .max(100) // Maximum length 100
    .has()
    .uppercase() // Must have uppercase letters
    .has()
    .lowercase() // Must have lowercase letters
    .has()
    .digits(2) // Must have at least 2 digits
    .has()
    .not()
    .spaces() // Should not have spaces
    .is()
    .not()
    .oneOf(["Passw0rd", "Password123"]); // Blacklist these values

router.get("/getAll", async(req, res) => {
    try {
        let users = await User.find();
        // , { fullName: 1, email: 1, password: 1 });

        res.json(users);
    } catch (err) {
        res.send("Error" + err);
        // res.status(500).send('Internal Server Error');
    }
});

router.post("/create", async(req, res) => {
    let tempPassword = null;
    if (validator.validate(req.body.email) == false) {
        return res.send("Incorrect Email, please change the email");
    } else if (schema.validate(req.body.password) == false) {
        return res.send("Not a Strong Password, please change the password");
    }else if(nameValidator.isAlpha(req.body.name) == false){
        return res.send("Invalid Name, please change the name");
    } else {
        await bcrypt.hash(req.body.password, saltRounds).then(function(hash) {
            tempPassword = hash;
            console.log(hash);
        });
        console.log(tempPassword);

        const user = new User({
            name:req.body.name,
            email: req.body.email,
            password: tempPassword,
        });
        console.log(user);

        try {
            const a1 = await user.save();
            res.json(a1);
        } catch (err) {
            res.send(err);
        }
    }
});

router.put("/edit", async (req, res) => {
    let tempCorrectPassword;
    let tempPassword;

    if (nameValidator.isAlpha(req.body.Updatedname) == false) {
        return res.send("Invalid Name");
    } else {
        tempCorrectPassword = req.body.correctpassword; // No need to hash again for comparison

        await bcrypt.hash(req.body.password, saltRounds).then(function (hash) {
            tempPassword = hash;
        });

        const tempuser = await User.findOne({ email: req.body.email });

        if (tempuser == null) {
            res.send("User not Found");
        } else {
            await bcrypt.compare(req.body.correctpassword, tempuser.password, async function (err, result) {
                if (result == true) {
                    try {
                        console.log(req.body + tempPassword);
                        const user = await User.findOneAndUpdate(
                            { email: req.body.email },
                            {
                                password: tempPassword,
                                name: req.body.Updatedname,
                            }
                        );
                        console.log(user);
                        res.send("success");
                    } catch (err) {
                        res.send(err);
                    }
                } else {
                    return res.send("false");
                }
            });
        }
    }
});






router.delete("/delete", async(req, res) => {
        const tempuser = await User.findOne({email:req.body.deleteEmail});
        console.log(tempuser);
        if(tempuser == null){
            res.send("User not found");
        }
        else{
            const user = await User.findOneAndDelete({ email: req.body.deleteEmail });

            console.log(user);
            res.send("Success");

        }
});

module.exports = router;