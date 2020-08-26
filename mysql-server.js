//  <head>
//     <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
// </head> 
var mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json())

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'myusers',
    password: 'yogesh',
    // insecureAuth : true
});

connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
});

app.listen(3000, function () {
    console.log("express servis is runing at port :3000");
})

// var operation = {
//     insert: function(){
//         connection.query(`insert into users (firstname, lastname, email, phone,job, pwd, image) values ("User", "Test", "test@gmail.com", "0000", "student", "0000", "image")`, function(error, results, fields){
//             if (error) throw error;

//             console.log('Record Inserted!');
//         })
//     }
// }

var url = require('url');
app.get("/", function (req, res) {
    res.setHeader("Content-Security-Policy", "connect-src http://localhost:3000/")
    res.setHeader("Content-Type", "text/html")
    res.end(`
        <form action="http://localhost:3000/submit" onsubmit="submitData(event, this)"  method="GET" style="display:table-caption" id="form">
            <label>Name</label>
            <input type="text" name="firstname" id="fname"/>
            <label>last Name</label>
            <input type="text" name="lastname" id="lname"/>
            <label>email</label>
            <input type="text" name="email" id="email"/>
            <button>Submit</button>
        </form>

        <script>
            var form = document.querySelector("form");
            var userfirstName = document.getElementById("fname");
            var userlastName = document.getElementById("lname");
            var useremail = document.getElementById("email");
            function submitData(e, el){
                e.preventDefault();
                const url = el.action 
                var querystring = "?firstname="+ userfirstName.value +"&lastname="+ userlastName.value + "&email="+ useremail.value;
                fetch(url + querystring).then(alert("your data save successfully !"));
                form.reset();
            }
        </script>
    `)
})

// operation.insert();
app.get('/submit', function (req, res) {
    const route = url.parse(req.url, true)
    const Udata = route.query;
    console.log(Udata, Udata.firstname + " " + Udata.lastname + "" + Udata.email);
    connection.query("insert into users (firstname, lastname, email, phone,job, pwd, image) values \
     ('" + Udata.firstname + "', '" + Udata.lastname + "' , '" + Udata.email + "' , '0000', 'student', '0000', 'image')",
        function (error, results, fields) {
            if (error) throw error;
            res.send(results)
            console.log('Record Inserted!');
        });
});

app.get('/conect/:datatype/done', function (req, res) {
    res.write("hiii ");
    res.end(req.params.datatype);
});