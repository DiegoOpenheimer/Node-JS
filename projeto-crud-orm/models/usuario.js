const usuarioModel = (sequelize, DataTypes) => {
    const Usuario = sequelize.define('Usuario',{
        username: DataTypes.STRING,
        cargo: DataTypes.STRING
    })

    return Usuario
}

module.exports = usuarioModel