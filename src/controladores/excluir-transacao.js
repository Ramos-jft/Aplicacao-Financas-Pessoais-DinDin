const pool = require('../conexao');

const excluirTransacao = async (req, res) => {
    const { id: usuarioId } = req.usuario
    const { id: transacaoID } = req.params

    try {
        const { rows: transacaoExistente } = await pool.query(
            'SELECT * FROM transacoes WHERE id = $1 AND usuario_id = $2',
            [transacaoID, usuarioId]
        )

        if (transacaoExistente.length === 0) {
            return res.status(404).json({ mensagem: 'Transação não encontrada ou não pertence ao usuário' });
        }
        const transacao = await pool.query(
            `delete from transacoes where id = $1 and usuario_id = $2`,
            [transacaoID, usuarioId]
        );
        return res.status(200).json(transacao.rows[0]);

    } catch (error) {
        
        return res.status(500).json({ message: 'Erro interno do servidor' })
    }
}

module.exports = { excluirTransacao }