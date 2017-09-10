const noticiaForm = async(Noticia, req, res) => {
    const noticia = await Noticia.findOne({ _id: req.params.id })
    res.render('edit/form', { noticia })
}

const noticiaEdit = async(Noticia, req, res) => {
    await Noticia.update({ _id: req.params.id }, req.body)
    res.redirect('/admin')
}

module.exports = {
    noticiaForm,
    noticiaEdit
}