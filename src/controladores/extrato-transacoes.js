const pool = require('../conexao');

const extratoTransacoes = async (req, res) => {

    try {

        const { id } = req.usuario;

        const tipoReceitas = 'Receita';

        const tipoDespesas = 'Despesa';

        const receitas = await pool.query(`select coalesce(sum(valor), 0) as Valor from transacoes where usuario_id = $1 and tipo = $2`, [id, tipoReceitas]);

        const despesas = await pool.query(`select coalesce(sum(valor), 0) as Valor from transacoes where usuario_id = $1 and tipo = $2`, [id, tipoDespesas]);

        const resultado = {
            receitas: receitas.rows,
            despesas: despesas.rows
        };

        return res.status(200).json(resultado);

    } catch (error) {
        console.log(error);

        return res.status(400).json({ mensagem: 'Não autorizado.' });
    }
};

module.exports = extratoTransacoes;