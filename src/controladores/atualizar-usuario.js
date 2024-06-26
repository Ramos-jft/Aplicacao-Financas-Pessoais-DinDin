const pool = require('../conexao');

const bcrypt = require('bcrypt');

const verificarEmail = async (email, usuarioId) => {
    const { rowCount } = await pool.query('SELECT email FROM usuarios WHERE email = $1 AND id <> $2', [email, usuarioId]);
    return rowCount > 0;
}

const atualizarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;
    const { id: usuarioId } = req.usuario;

    if (!nome || !email || !senha) {
        return res.status(400).json({ mensagem: 'Nome, email e senha são obrigatórios' });
    };

    try {
        const emailJaCadastrado = await verificarEmail(email, usuarioId);

        if (emailJaCadastrado) {
            return res.status(400).json({ mensagem: 'O email informado já está cadastrado' });
        }
        const { rowCount: userExists } = await pool.query('SELECT * FROM usuarios WHERE id = $1', [usuarioId]);

        if (userExists === 0) {
            return res.status(404).json({ mensagem: 'O usuário não foi encontrado' });
        };

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        await pool.query(`
            UPDATE usuarios SET nome = $1, email = $2, senha = $3 
            WHERE id = $4 returning *`,
            [nome, email, senhaCriptografada, usuarioId]
        );



        return res.status(204).json();
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

module.exports = { atualizarUsuario };