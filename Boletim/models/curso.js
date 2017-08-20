const cursoModel = (sequelize, DataTypes) => {
    const Curso = sequelize.define('Curso',{
        disciplina: DataTypes.STRING,
        professor: DataTypes.STRING,
        nota1: DataTypes.INTEGER,
        nota2: DataTypes.INTEGER,
        nota3: DataTypes.INTEGER
        
    })


    return Curso
}

module.exports = cursoModel