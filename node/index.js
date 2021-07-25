const express = require('express')
const mysql = require('mysql')
const app = express()
const port = 5000

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb',
}

const connection = mysql.createConnection(config);

const createTable = "CREATE TABLE IF NOT EXISTS people (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL)";

const sql = `Insert into people (name) values ("Antônio"), ("Maria"), ("João")`;

connection.query(createTable);
connection.query(sql);


app.get('/', (req,resp) => {

    connection.query("SELECT name FROM people", function(err, rows, fields) {
        
        let html = `<h1>Full Cycle Rocks!!!</h1>`

        rows.forEach(function(row) {
            html += `- ${row.name} <br><br>`
        });
        
        resp.send(html)
        
    });
    
})

app.listen(port, () => {
    console.log('rodando na porta ' + port)
})
