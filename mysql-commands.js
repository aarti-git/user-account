// this is sum commandes we are using in mysql;

//myusers is database name
`use myusers`

// select for all
`SELECT * FROM users`

// how to insent data into table
`insert into users (fullname, email,job, pwd, image) values ("yogesh", "aj@gmail.com", "student", "12234", "image");`

`insert into users (fullname, email,job, pwd, image) values ('Yogesh', 'yog99mail@gmail.com' ,'Web Devloper','1111', 'img/user3.jpg');`

// select particular row;
`Select email from users where fullname like 'a%';`

// delete all rowsin table 
` TRUNCATE TABLE users ;`

// delete particular row
`delete from users where fullname = "yogesh";`
`SELECT * FROM users WHERE id= 2 ;`

// delete collumn 
`ALTER TABLE users DROP phone ;`
`ALTER TABLE users DROP COLUMN id;`

// column reaname
`ALTER TABLE users RENAME COLUMN firstname TO fullname;`

// ceat auto increament id ; 
`ALTER TABLE users ADD COLUMN id int PRIMARY KEY NOT NULL AUTO_INCREMENT FIRST ;`

// table status;
`show table status;`

// change varchar value
`ALTER TABLE users MODIFY pwd VARCHAR(15);`

