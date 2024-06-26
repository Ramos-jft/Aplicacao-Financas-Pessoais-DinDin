
const express = require('express');

const rotas = express();

const { cadastrarUsuario } = require('./controladores/cadastrar-usuario');
const loginUsuario = require('./controladores/login-usuario');

const { perfilUsuario } = require('./controladores/detalhar-usuarios');
const { verificarTokens } = require('./intermediarios/verificar-usuarios');
const { atualizarUsuario } = require('./controladores/atualizar-usuario');

const verificarUsuarioLogado = require('./intermediarios/autenticacao');
const detalharTransacao = require('./controladores/detalhar-transacao');

const cadastrarTransacao = require('./controladores/cadastrar-transacao');

const extratoTransacoes = require('./controladores/extrato-transacoes');

const { listarCategorias } = require('./controladores/listar-categorias');
const { listarTransacoes } = require('./controladores/listar-trasacoes');
const { excluirTransacao } = require('./controladores/excluir-transacao');
const atualizarTransacao = require('./controladores/atualizar-transacao');

rotas.post('/usuario', cadastrarUsuario);
rotas.post('/login', loginUsuario);

rotas.use(verificarTokens)
rotas.use(verificarUsuarioLogado);

rotas.put('/transacao/:id', atualizarTransacao);

rotas.get('/usuario', perfilUsuario);
rotas.put('/usuario', atualizarUsuario);

rotas.post('/transacao', cadastrarTransacao);
rotas.get('/transacao/extrato', extratoTransacoes);
rotas.get('/transacao', listarTransacoes);
rotas.get('/transacao/:id', detalharTransacao);
rotas.delete('/transacao/:id', excluirTransacao);

rotas.get('/categoria', listarCategorias);



module.exports = rotas;