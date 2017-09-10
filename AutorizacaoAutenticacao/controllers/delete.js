const deleteNoticia = async(Noticia, req, res) => {
    await Noticia.remove({ _id: req.params.id })
    res.redirect('/admin')
}

module.exports = {
    deleteNoticia
}