var http = require("http");
var mysql = require("mysql");
var url = require("url");
var fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
var base64;
function base64loadimage(imageBase64) {
  const rx = /^data:image\/[a-z]+;base64,/i
  const leftStr = imageBase64.match(rx)[0]
  const ext = leftStr.match(/png|jpeg|jpg|bmp/)[0]
  const name = Date.now() + '.' + ext
  const image = imageBase64.replace(rx, '')
  const saveurl = `userProgileImges/${name}`
  fs.writeFileSync(saveurl,image,"base64")
  return saveurl
}

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "myusers",
  password: process.env.NODE_SQL_PASSWORD,
  // insecureAuth : true
});

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

var server = http.createServer(function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:1100");
  res.setHeader("Content-Type", "application/json");
  const route = url.parse(req.url, true);
  const method = req.method;

  if (method === "GET") {
    if (route.pathname == "/getdatabase") {
      var sql = "select * from users ";
      connection.query(sql, function (error, results, fields) {
        if (error) {
          res.write(JSON.stringify({ results }));
          res.end();
          return;
        }
        // console.log(results);
        // res.write("this is get methode : /getdatabase")
        // console.log("userData count is : " + results.length);
        res.write(JSON.stringify({ results }));
        res.end();
        return;
      });
    } else {
      res.write("<h2 style='color:red'>erroe</h2>");
    }
  } else if (method === "POST") {
    if (route.pathname == "/creat-user") {
      var payLoad = "";
      // JSON.parse(txt);
      req.on("data", function (data) {
        payLoad += data;
      });
      req.on("end", function () {
        // console.log(payLoad);
        payLoad = JSON.parse(payLoad);
        // base64 image uploade
        base64 = payLoad.image;
        payLoad.image = base64loadimage(base64);
        const str =
          "insert into users (fname, email,job, pwd, image,facebook,twitter,linkedin) values ('" +
          payLoad.fname +
          "', '" +
          payLoad.email +
          "' ,'" +
          payLoad.job +
          "','" +
          payLoad.password +
          "', '" +
          payLoad.image +
          "', '" +
          payLoad.facebook +
          "', '" +
          payLoad.twitter +
          "', '" +
          payLoad.linkedin +
          "')";
        connection.query(str, function (error, results, fields) {
          if (error) {
            res.write(JSON.stringify({ responce: false, ...error }));
            res.end();
            // throw error;
            return;
          }
          // res.send(results);
          res.write(JSON.stringify({ responce: true }));
          console.log("Record Inserted!");
          res.end();
        });
      });
      return;
    } else if (route.pathname == "/update") {
      var payLoad = "";
      req.on("data", function (data) {
        payLoad += data;
      });
      req.on("end", function () {
        payLoad = JSON.parse(payLoad);
        base64 = payLoad.image;
        payLoad.image = base64loadimage(base64);
        const updatedstr =
          `UPDATE users SET fname ="` +
          payLoad.fname +
          `", email ="` +
          payLoad.email +
          `",job ="` +
          payLoad.job +
          `",image="` +
          payLoad.image +
          `",facebook="` +
          payLoad.facebook +
          `",twitter="` +
          payLoad.twitter +
          `",linkedin="` +
          payLoad.linkedin +
          `" WHERE id = ` +
          payLoad.id;
        connection.query(updatedstr, function (eroor, results, fields) {
          if (eroor) {
            res.write(JSON.stringify({ responce: false, ...error }));
            res.end();
            // throw error;
            return;
          }
          res.write(JSON.stringify({ responce: true }));
          console.log("Record Updated!");
          res.end();
        });
      });
    } else if (route.pathname == "/delete") {
      var payLoad = "";
      req.on("data", function (data) {
        payLoad += data;
      });
      req.on("end", function () {
        payLoad = JSON.parse(payLoad);
        const deleteRow = `DELETE FROM users WHERE id = ` + payLoad.id;
        connection.query(deleteRow, function (eroor, results, fields) {
          if (eroor) {
            res.write(JSON.stringify({ responce: false, ...error }));
            res.end();
            // throw error;
            return;
          }
          res.write(JSON.stringify({ responce: true }));
          console.log("Record Updated!");
          res.end();
        });
      });
    }
  }
});
server.listen(2000, function () {
  console.log("server is created successfully at : http://localhost:2000");
});
