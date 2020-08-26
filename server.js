
var http = require('http');
var mysql = require('mysql');
var url = require('url');
// console.log(url);

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

http.createServer(function (req, res) {
    res.setHeader("Content-Type", "text/html")
    const route = url.parse(req.url, true);

    if (route.pathname == '/') {
        res.write(`
            <form action="http://localhost:2000/submitData" method="GET" style="display:table-caption">
                <label>Name</label>
                <input type="text" name="firstname"/>
                <label>last Name</label>
                <input type="text" name="lastname"/>
                <label>email</label>
                <input type="text" name="email"/>
                <button>Submit</button>
            </form>
  `);
    }
    else if (route.pathname == '/submitData') {
        const Udata = route.query;
        res.write("<h2 style='color:green'>data save successfully !</h2>");
        console.log(Udata, Udata.firstname + " " + Udata.lastname + "" + Udata.email);
        connection.query("insert into users (firstname, lastname, email, phone,job, pwd, image) values \
        ('" + Udata.firstname + "', '" + Udata.lastname + "' , '" + Udata.email + "' , '0000', 'student', '0000', 'image')",
            function (error, results, fields) {
                if (error) throw error;
                // res.send(results);
                console.log('Record Inserted!');
            });
    }else{
        res.write("<h2 style='color:red'>erroe</h2>");  
    }
    res.end();
}).listen(2000);
console.log("server is created successfully !");








// const exp = require("./express")

// exp.get('/', function(req, res){
//     res.end("Hello")
// })

// exp.get('/send', function(req, res){
//     res.end("send data")
// })