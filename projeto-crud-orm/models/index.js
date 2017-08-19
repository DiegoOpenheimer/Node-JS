const Sequelize = require('sequelize')
const sequelize = new Sequelize('cadastro-orm', 'root', '', {
    dialect: 'mysql',
    host: '127.0.0.1'
})

//const pessoas = sequelize.import('./pessoas.js')

const models = {}
const path = require('path')
const fs = require('fs')

fs
    .readdirSync(__dirname)
    .filter((file) => file !== 'index.js')
    .map((file) => {
        const model = sequelize.import(path.join(__dirname, file))
        models[model.name] = model
    })

    Object.keys(models).forEach((modelName) => {
        if('associate' in models[modelName]) {
            models[modelName].associate(models)
        }
    })


module.exports = {
    sequelize,
    models
}