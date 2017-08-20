const createForm = (req, res) => {
    res.render('create/form')
}

const addDisciplina = async ({ Curso },req, res) => {
    await Curso.create(req.body)
    res.redirect('/create')
}

module.exports = {
    createForm,
    addDisciplina
}