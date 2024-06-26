const express = require('express');

const { serverPort } = require('./configs');

const rotas = require('./rotas');

const app = express();

app.use(express.json());

app.use(rotas);

app.listen(serverPort, () => {
    console.log(`Servidor rodando na porta ${serverPort}`);
});