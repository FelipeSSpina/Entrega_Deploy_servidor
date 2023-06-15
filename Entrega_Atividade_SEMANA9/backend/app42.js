// IMPORTANDO MÓDULOS NODE
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('frontend'));

// IMPORTANDO MÓDULOS
const db = require('../data/database.js');

// ENDPOINT PRINCIPAL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..' + '/frontend/index.html'));
});

app.post('/send', (req, res) => {
    const { msg } = req.body;

    db.run('INSERT INTO tbl_msg (msg) VALUES (?)', [msg], (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Erro!!!');
        } else {
            res.redirect('/');
        }
    });
});

app.get('/take', (req, res) => {
    db.all('SELECT * from tbl_msg', (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).send('Erro !!!');
            return;
        }

        const msgData = rows.map(row => ({
            id: row.id_msg,
            msg: row.msg,
        }));

        res.json(msgData);
    });
});

// listening do servido
app.listen(3000, function(){
    console.log("Servidor rodando na URL: http://localhost:3000");
});
