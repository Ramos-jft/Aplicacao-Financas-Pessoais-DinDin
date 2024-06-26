const pool = require('../conexao');

const cadastrarTransacao = async (req, res) => {

    const { descricao, valor, data, categoria_id, tipo } = req.body;

    const { id: idUsuario } = req.usuario;

    try {

        if (!descricao || !valor || !data || !categoria_id || !tipo) {
            return res.status(403).json({ mensagem: 'Todos os campos devem ser informados.' });
        };

        const query = `insert into transacoes (descricao, valor, data, categoria_id, usuario_id, tipo) values ($1, $2, $3, $4, $5, $6) returning *`;

        const cadastroElementos = [descricao, valor, data, categoria_id, idUsuario, tipo];

        const { rows } = await pool.query(query, cadastroElementos);

        const { id: idTransacao } = rows[0];

        const inserirJuncao = `select * from transacoes inner join categorias on transacoes.categoria_id = categorias.id where transacoes.id = $1`;

        const parametrosJuncao = [idTransacao];

        await pool.query(inserirJuncao, parametrosJuncao);

        return res.status(201).json(rows);

    } catch (error) {

        console.log(error);

        return res.status(400).json({ mensagem: 'Id da categoria não existe.' });
    };

};

module.exports = cadastrarTransacao;