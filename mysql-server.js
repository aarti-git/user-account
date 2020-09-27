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
//         connection.query(`insert into users (fullname, lastname, email, phone,job, pwd, image) values ("User", "Test", "test@gmail.com", "0000", "student", "0000", "image")`, function(error, results, fields){
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
            <input type="text" name="name"/>
            <label>last Name</label>
            <input type="text" name="lastname"/>
            <label>email</label>
            <input type="text" name="email"/>
            <label>mobile No</label>
            <input type="number" name="phone"/>
            <button>Submit</button>
        </form>

        <script>
            var form = document.querySelector("form");

            function submitData(e, el){
                var button = document.querySelector("button");
                button.innerHTML = "submiting.."
                e.preventDefault();
                const url = el.action 

                urlString();
                var x = urlString();
                console.log(x)
                fetch(url + x)
                .then(function(res){
                    alert("data save successfully !")
                    form.reset();
                    button.innerHTML = "submit";
                })
                .catch(function(e){
                    console.log("something is wrong!", e)
                    alert("something is wrong !");
                    button.innerHTML = "submit";
                })

            }

            function urlString(){
                var input = document.querySelectorAll("input");
                var str ="";
                var querystring;
                for(i=0; i < input.length; i++){
                    var item = input[i];
                    var name = item.name;
                    var value = item.value;
                    if(i == 0){
                        querystring = "?" + name + "=" + value ;
                    }
                    else{
                        querystring = "&" + name + "=" + value ; 
                    }
                   
                    str += querystring ;
                }
                 return str;
            }


        </script>
    `)
})

// operation.insert();
app.get('/submit', function (req, res) {
    const route = url.parse(req.url, true)
    const Udata = route.query;
    console.log(Udata, Udata.name + " " + Udata.lastname + "" + Udata.email);
    var string = "insert into users (fullname, lastname, email, phone,job, pwd, image)values\
    ('" + Udata.name + "', '" + Udata.lastname + "' , '" + Udata.email + "' , '" + Udata.phone + "','student', '0000', 'image')";

    connection.query(string, function (error, results, fields) {
        if (error) throw error;
        res.send(results)
        console.log('Record Inserted!');
    });
});

// app.get('/conect/:datatype/done', function (req, res) {
//     res.write("hiii ");
//     res.end(req.params.datatype);
// });