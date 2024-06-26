const pool = require('../conexao');

const detalharTransacao = async (req, res) => {

    const { id } = req.params;

    const idUsuario = req.usuario.id;

    try {

        const { rows, rowCount } = await pool.query('select * from transacoes where id = $1 and usuario_id = $2', [id, idUsuario]);

        if (rowCount < 1) {
            return res.status(400).json({ mensagem: 'Transação não encontrada ou não pertence ao usuário logado.' });
        };

        const transacao = rows[0];

        const resultado = await pool.query(
            `select transacoes.*, categorias.id from transacoes join categorias on transacoes.categoria_id = categorias.id where transacoes.id = $1`,
            [id]
        );

        const requisicao = resultado.rows[0];

        return res.status(200).json(requisicao);

    } catch (error) {
        console.log(error)
        return res.status(400).json({ mensagem: 'Não autorizado.' });
    };

};
module.exports = detalharTransacao;