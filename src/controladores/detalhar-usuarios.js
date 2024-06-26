const perfilUsuario = async (req, res) => {
    const { senha, ...user } = req.usuario

    return res.json(user);
}

module.exports = {
    perfilUsuario
}