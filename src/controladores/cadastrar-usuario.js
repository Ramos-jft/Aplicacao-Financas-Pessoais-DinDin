const pool = require('../conexao');

const bcrypt = require('bcrypt');

const cadastrarUsuario = async (req, res) => {

    const { nome, email, senha } = req.body;

    const emailEmUso = async (email) => {

        const query = 'select email from usuarios where email = $1';

        const res = await pool.query(query, [email]);

        return res.rowCount > 0;

    };

    try {

        if (!nome || !email || !senha) {

            return res.status(403).json({ mensagem: 'Todos os campos devem ser informados.' });

        };

        if (await emailEmUso(email)) {

            return res.status(400).json({ mensagem: 'Já existe usuário cadastrado com o e-mail informado.' });

        };

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const novoUsuario = await pool.query(
            'insert into usuarios (nome, email, senha) values ($1, $2, $3) returning *',
            [nome, email, senhaCriptografada]
        );

        const usuarioSemSenha = { ...novoUsuario.rows[0] };

        delete usuarioSemSenha.senha;

        return res.status(201).json(usuarioSemSenha);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    };

};

module.exports = {
    cadastrarUsuario
};