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

var server = http.createServer(function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:1100')
    res.setHeader("Content-Type", "application/json")
    const route = url.parse(req.url, true);
    const method = req.method

    if (method === 'GET') {
        if (route.pathname == '/') {
            res.write("this is node server");
        }
        else if (route.pathname == '/submitdata') {
            res.write("this is get methode : /submitdata")
            const Udata = route.query;
            const str = "insert into users (firstname, email, phone ,job, pwd, image) values ('" + Udata.firstname + "', '" + Udata.email + "' ,'" + Udata.phone + "','" + Udata.job + "','" + Udata.password + "', '" + Udata.image + "')"

            connection.query(str, function (error, results, fields) {
                if (error) {
                    res.write(JSON.stringify({ responce: false }));
                    res.end();
                    return
                };
                // res.send(results);
                res.write(JSON.stringify({ responce: true }));
                console.log('Record Inserted!');
                res.end();
            });
            return;
        }else if(route.pathname == '/getdatabase'){
            res.write("this is get methode : /getdatabase")
            connection.query("SELECT * FROM USERS", function (error, results, fields) {
                if(error){
                    res.write(JSON.stringify({ responce: false }));
                    res.end();
                    return
                };
                console.log(results);
                res.write(results);
                res.end();
            })
            
        } else {
            res.write("<h2 style='color:red'>erroe</h2>");
        }
    } else if (method === 'POST') {
        var payLoad = '';
        // JSON.parse(txt);
        req.on('data', function (data) {
            payLoad += data;
        })
        req.on('end', function () {
            console.log(payLoad);
            payLoad = JSON.parse(payLoad);
            const str = "insert into users (firstname, email, phone ,job, pwd, image) values ('" + payLoad.firstname + "', '" + payLoad.email + "' ,'" + payLoad.phone + "','" + payLoad.job + "','" + payLoad.password + "', '" + payLoad.image + "')"
            connection.query(str, function (error, results, fields) {
                if (error) {
                    res.write(JSON.stringify({ responce: false }));
                    res.end();
                    return
                };
                // res.send(results);
                res.write(JSON.stringify({ responce: true }));
                console.log('Record Inserted!');
                res.end();
            });
        })

        return;
    } 
    res.end(

    );
});
server.listen(2000,function(){
    console.log("server is created successfully at : http://localhost:2000"); 
});