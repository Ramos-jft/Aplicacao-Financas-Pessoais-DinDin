const pool = require("../conexao");

const listarTransacoes = async (req, res) => {
    const { id } = req.usuario;
    
    try {
        const transacoes = await pool.query(`
            select * from transacoes where usuario_id = $1`, [id]
        );
        if (transacoes.rowCount < 1) {
            return res.status(200).json([])
        }

        return res.status(200).json(transacoes.rows);

    } catch (error) {
        return res.status(500).json(error.message);
    }
}

module.exports = { listarTransacoes }