const pessoas = require('../models/pessoas')

const index = async (connection, req, res) => {
    const result = await pessoas.findAll(connection)
    res.render('pessoas/list', { result })
}

const deleteRoute = async (connection, req, res) => {
    
    await pessoas.deleteOne(connection, req.params.id)
    res.redirect('/pessoas')
}

const create = (req, res) => {
    res.render('pessoas/create')
}

const add = async (connection, req, res) =>{
    await pessoas.addPessoa(connection, req.body)
    res.redirect('/pessoas/create')
}


module.exports = {
    index,
    deleteRoute,
    create,
    add
}