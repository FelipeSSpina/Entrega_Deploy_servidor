function getAllMsg() {
    $.get('/take', (res) => {
        res.forEach(msg => {
            const msgDb = msg.msg;
            createElementos(msgDb);
        });
    });
};

function createElementos(msgDb) {
    const divMsgCriadas = document.getElementById('msg_criadas');

    const msg = document.createElement('div');
    msg.textContent = msgDb;

    divMsgCriadas.appendChild(msg);
};

getAllMsg();
