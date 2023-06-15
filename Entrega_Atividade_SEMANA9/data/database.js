const sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "./data/db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    } else {
        console.log('Conexão com o banco de dados estabelecida.')
        db.run(`CREATE TABLE IF NOT EXISTS tbl_msg (
                id_msg INTEGER PRIMARY KEY,
                msg text)`,
        (err) => {
            if (err) {
                console.log('ERRO PARA tabela de países', err.message);
            } else {
                console.log('A tabela de países foi criad.');
            } 
        });
    };
});

module.exports = db;
