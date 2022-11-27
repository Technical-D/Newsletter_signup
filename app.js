const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");



const app = express();
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"));


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", (req, res) => {
    
    const fName = req.body.firstName;
    const lName = req.body.lastName;
    const email = req.body.email;
    
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fName,
                    LNAME: lName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);
    const url = "https://us17.api.mailchimp.com/3.0/lists/f62bbbdf08"
    const option = {
        method: "POST",
        auth: "dheeraj:99315ee07918be8d5d006b814907bd74-us17"
    }
    const request = https.request(url, option, (response) => {

        console.log(response.statusCode);
        if(response.statusCode === 200) {
            res.sendFile(__dirname +"/sucess.html");
        } else{
            res.sendFile(__dirname +"/failure.html");

        }
        response.on("data", (data) => {
            // console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();

})

app.post("/failure", (req, res) => {
    res.redirect("/");
})

app.listen(process.env.PORT || 3000 , () => {
    console.log("Server started at port 3000.");
})

// Api key
// 99315ee07918be8d5d006b814907bd74-us17

// list id
// f62bbbdf08