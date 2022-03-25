const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser'); 
const config ={
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'appdb'
};

app.use(bodyParser.json()); 
const mysql = require('mysql');

app.get('/', (req, res)=>{

    const connection = mysql.createConnection(config);
    const sql = `SELECT name FROM people`

    let htmlOutput = '<h1>Full cycle Rocks!</h1></br>';
    connection.query(sql, (err, rows)=>{
		if(rows){
			htmlOutput += '<ul>';
			rows.forEach(row => {
				htmlOutput += `<li>${row.name}</li>`;
			});
			
			htmlOutput += '</ul>';
			res.send(htmlOutput);	
		}
		else{
            htmlOutput += '<h3>Not found records.</h3>';
			res.send(htmlOutput);
		}
    });
    connection.end();
});


app.post('/', (req, res)=>{
    let username=req.body.name;
    const connection = mysql.createConnection(config);
    const sql = `INSERT INTO people(name) VALUES ('${username}')`;
    connection.query(sql, (err)=>{
        if(err){
            res.send(err);
        }
        else{
            res.send('<h2>Usuario cadastrado com sucesso!</h2>');
        }
    });
    connection.end();
});

app.listen(port, ()=>{
    console.log(`App runing on port ${port}.`)
});
