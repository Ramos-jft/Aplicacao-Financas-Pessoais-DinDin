const pool = require("../conexao");

const listarCategorias = async (req, res) => {
    try {
        const categorias = await pool.query('select * from categorias ');

        if (categorias.rowCount < 1) {
            return res.status(200).json([]);
        }

        return res.status(200).json(categorias.rows)

    } catch (error) {
        return res.status(500).json({ message: 'erro interno do servidor' })
    }
};

module.exports = {
    listarCategorias
}