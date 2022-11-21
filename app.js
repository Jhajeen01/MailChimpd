const express = require('express');
const bodyPar=require('body-parser');
const request= require('request');// to make https calls simple in nodejs
const https= require('https');//requiring http module
require('dotenv').config();


const app=express();

app.use(express.static("public"));
app.use(bodyPar.urlencoded({extended:true}));

app.get("/",function (req,res) {
    res.sendFile(__dirname+"/signup.html");
})

app.post('/', (req, res) => {
    const firstName=req.body.fname;
    const secondName=req.body.last;
    const mail=req.body.mail;
    

    const dataObj={// data object to post as an array
        members:[
            {email_address: mail,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: secondName
            }}
        ]
    }

    const jsonData=JSON.stringify(dataObj);  // json string


    var url="https://us21.api.mailchimp.com/3.0/lists/e5b4d2844a";

    const options={
        method: "POST",
<<<<<<< HEAD
        auth: process.env.API_KEY//as per mailchimp
=======
        auth: "Gaurav:68a8ffc2bbeccf62f28be59eda9f1a0d-us21"//as per mailchimp
>>>>>>> bb8c65f615ec5df060812fa3fc806f2888112ef2
    }

    console.log(options.auth);
    // cant use https get
    const request= https.request(url,options,function(response){

        console.log(response.statusCode);

        if(response.statusCode ==200){//sending confirmation data to user!
            res.sendFile(__dirname+"/success.html");//sending bootstrap pages
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }


        response.on("data",function(dataObj)
        {
            console.log(JSON.parse(dataObj))
        })
    })

    //feedback time!!!
    


    request.write(jsonData);
    request.end();

});


app.post("/failure",function(req,res){//when failure triggered redirect to homePage
     res.redirect('/');
})

app.listen(3002, () => {
    console.log(`Server started on port: 3002`);
});

// listid
// b4d2844a

// appid
//c2bbeccf62f28be59eda9f1a0d-us21


//e5
//68a8ff
