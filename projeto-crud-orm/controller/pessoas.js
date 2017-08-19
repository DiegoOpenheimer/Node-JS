const pessoas = async({
    Pessoa
}, req, res) => {
    const result = await Pessoa.findAll({
        order: ['nome']
    })
    res.render('pessoas/list', {
        result
    })
}

const pessoasCreate = (req, res) => {
    res.render('pessoas/create')
}

const addPessoa = async({
    Pessoa
}, req, res) => {
    await Pessoa.create(req.body)
    res.redirect('/pessoas/create')
}

const deleteOne = async({
    Pessoa
}, req, res) => {
    await Pessoa.destroy({
        where: {
            id: req.params.id
        }
    })

    res.redirect('/pessoas')
}


const updatePessoas = async({Pessoa}, req, res) => {
    await Pessoa.update(req.body,{
        where:{
            id: req.body.id
        }
    })

    res.redirect('/pessoas')
}

module.exports = {
    pessoas,
    pessoasCreate,
    addPessoa,
    deleteOne,
    updatePessoas
}