const pool = require('../conexao');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const { jwtSecret } = require('../configs');

const loginUsuario = async (req, res) => {

    const { email, senha } = req.body

    try {

        const usuario = await pool.query('select * from usuarios where email = $1', [email]);

        if (usuario.rowCount < 1) {
            return res.status(404).json({ mensagem: 'E-mail ou senha invalidos.' });
        };

        const senhaValida = await bcrypt.compare(senha, usuario.rows[0].senha);

        if (!senhaValida) {
            return res.status(404).json({ mensagem: 'E-mail ou usuário invalidos.' });
        };

        const token = jwt.sign({ id: usuario.rows[0].id }, jwtSecret, { expiresIn: '8h' });

        const { senha: _, ...usuariologado } = usuario.rows[0];

        return res.status(200).json({ usuario: usuariologado, token });

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    };

};

module.exports = loginUsuario;