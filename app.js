//jshint esversion: 6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();

//use other static files ...like custom css
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (request, res) {
    const email = request.body.email;
    const firstName = request.body.firstName;
    const lastName = request.body.lastName;

    const data = {
        members: [{
            email_address: email, status: "subscribed", merge_fields: {
                FNAME: firstName,
                LNAME: lastName,
            }
        }]
    };
    console.log(email);
    //stringify to json
    var jsonData = JSON.stringify(data);
    // console.log(jsonData);
    // response.send("emirdilony");
    ///base url with list id
    var url = "https://us17.api.mailchimp.com/3.0/lists/b27deab9ce";
    //https.request params with auth contains the apiKey and methods contains the form method
    const options = {
        method: "POST",
        auth: "emirdilony:2a29a4558e087170add7485f492d3d89-us17",
    };
    const r = https.request(url, options, function (response) {
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data", function (data) {
            // console.log(JSON.parse(data));
            console.log(response.statusCode);
        });
    });
    r.write(jsonData);
    r.end();
});

app.post("/failure", function (req, res) {
    //redirects back to home page on failure and try again
    res.redirect("/");
});


//to list dynamically or to a specific port
app.listen(process.env.PORT || 3000, function () {
    console.log("listening to port 3000");
});


// ApiKey
// 2a29a4558e087170add7485f492d3d89-us17


// listID
// b27deab9ce