const jwt = require('jsonwebtoken');
const pool = require('../conexao');
const { jwtSecret } = require('../configs');

const verificarTokens = async (req, res, next) => {
    const { authorization } = req.headers;
    try {
        const token = authorization.split(' ')[1];

        const { id } = jwt.verify(token, jwtSecret);

        const usuario = await pool.query(`
            select * from usuarios where id = $1`,
            [id]
        );

        if (usuario.rowCount < 1) {
            return res.status(404).json({ mensagem: 'Usuario não encontrado' });
        }

        next();
    } catch (error) {
        return res.status(401).json({ mensagem: "Para acessar este recurso um token de autenticação válido deve ser enviado." });
    };
};

module.exports = {
    verificarTokens
};