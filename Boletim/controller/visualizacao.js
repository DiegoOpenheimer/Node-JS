const getTable = async ({ Curso }, req, res) => {
   const result =  await Curso.findAll({order:['professor']})
res.render('visualizacao', { result })

}

module.exports = {
    getTable
}