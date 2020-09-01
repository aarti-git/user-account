var http = require('http');
var mysql = require('mysql');
var url = require('url');
const { AsyncLocalStorage } = require('async_hooks');
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
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:1100')
    res.setHeader("Content-Type", "application/json")
    const route = url.parse(req.url, true);

    if (route.pathname == '/') {
        res.write("this is node server");
        // res.write(`
        //     <form action="http://localhost:2000/submitData" method="GET" style="display:table-caption">
        //         <label>Name</label>
        //         <input type="text" name="firstname"/>
        //         <label>last Name</label>
        //         <input type="text" name="lastname"/>
        //         <label>email</label>
        //         <input type="text" name="email"/>
        //         <button>Submit</button>
        //     </form>`);
    }
     if (route.pathname == '/submitData') {
        const Udata = route.query;
        const str = "insert into users (name, email, phone ,job, password, image) values ('" + Udata.name + "', '" + Udata.email + "' ,'" + Udata.phone + "','" + Udata.job + "','" + Udata.password + "', '" + Udata.image + "')"

        connection.query(str, function (error, results, fields) {
            if (error) {
                res.write("{ responce: false }");
                res.end();
                return
            };
            // res.send(results);
            res.write(JSON.stringify({ responce: true }));
            console.log('Record Inserted!');
            alert("data submited successfully !! ")
            res.end();
        });

        return;
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