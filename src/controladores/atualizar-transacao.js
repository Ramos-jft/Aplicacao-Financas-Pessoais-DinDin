const pool = require('../conexao');

const atualizarTransacao = async (req, res) => {
    const { id: usuarioId } = req.usuario;
    const { id: transacaoId } = req.params;

    try {
        const { descricao, valor, data, categoria_id, tipo } = req.body;
        const camposObrigatorios = ['descricao', 'valor', 'data', 'categoria_id', 'tipo'];

        for (const campo of camposObrigatorios) {
            if (!req.body[campo]) {
                return res.status(400).json({ mensagem: `O campo ${campo} não foi informado` });
            };
        };

        if (tipo !== 'Despesa' && tipo !== 'Receita') {
            return res.status(400).json({ mensagem: `O campo tipo deve ser: 'Despesa' ou 'Receita` });
        };

        const { rows: transacaoExistente } = await pool.query(
            `SELECT * FROM transacoes WHERE id = $1 AND usuario_id = $2`,
            [transacaoId, usuarioId]
        );

        if (transacaoExistente.length === 0) {
            return res.status(404).json({ mensagem: 'Transação não encontrada ou não pertence ao usuário' });
        };

        const { rows: categoriaExistente } = await pool.query(
            `SELECT * FROM categorias WHERE id = $1`,
            [categoria_id]
        );

        if (categoriaExistente.length === 0) {
            return res.status(404).json({ mensagem: 'Categoria não encontrada' });
        };

        const transacoes = await pool.query(
            `UPDATE transacoes SET descricao = $1, valor = $2, data = $3, categoria_id = $4, tipo = $5 WHERE id = $6 returning *`,
            [descricao, valor, data, categoria_id, tipo, transacaoId]
        );

        return res.status(200).json();

    } catch (error) {
        console.log(error)
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    };
};


module.exports = atualizarTransacao;