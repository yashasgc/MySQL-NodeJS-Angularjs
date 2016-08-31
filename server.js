var express        =         require("express");
var bodyParser     =         require("body-parser");
var app            =         express();
var mysql = require('mysql');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });
app.get('/',function(req,res){
  res.sendFile(__dirname+"/index.html");
});
app.post('/login',function(req,res){
  var name=req.body.name;
  var location=req.body.location;
  var designation=req.body.designation;
  console.log("name = "+name+",location = "+location+",designation = " +designation);
  res.end("yes");
  response = {
       name:req.body.name,
       location:req.body.location,
       employeesdesingation:req.body.designation
   };
   console.log(response);
   res.end(JSON.stringify(response));
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'sitepoint'
})

connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected...');
})

connection.query('INSERT INTO employees SET ?',response,function(error){
if(error){
console.log(error.message);
}
else{
console.log('success');
}
});

connection.query('SELECT * from employees',function(err,rows,fields){
if(!err)
console.log('query result:',rows);
else
console.log('ERROR');
});
connection.end();
})


app.listen(3000,function(){
  console.log("Started on PORT 3000");
})


