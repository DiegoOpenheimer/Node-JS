const label = [
    { id: 'to-watch', name: 'Para Assistir'},
    { id: 'watching', name: 'Assistindo'},
    { id: 'watched', name: 'Assistido' }
]

const serieIndex = async ({ serie },req, res) => {
      const doc = await serie.find().sort('name')
      res.render('serie/index', { series: doc, label })
   
      //serie.find().then(doc => res.render('serie/index',{ series: doc })).catch(e => console.log(e))
      // serie.find({}, (err, doc) => console.log(doc))
}

const serieForm = (req, res) => {
    res.render('serie/serieForm')
}


const salvarSerie = ({ serie },req, res) => {
    
    const novaSerie = new serie(req.body)
    novaSerie.save(() => console.log('Saved'))
    res.redirect('/series')

}

const deleteSerie = ({ serie }, req, res) => {
    serie.remove({
        _id: req.params.id
    },(err) => {
        res.redirect('/series')
    })

   
}

const editSerie = ({ serie },req, res) => {
    serie.update({ _id: req.params.id }, req.body, (e) => res.redirect('/series'))
}

const infoOne = async ({ serie }, req, res) => {
   try {
    const doc = await serie.findOne({ _id: req.params.id })
    res.render('serie/info', { serie: doc })
   } catch (error) {
       res.send(`<h1>Error ${error.toString()}</h1>`)
   }
    
}

const addComments = async ({ serie }, req, res) => {
    await serie.updateOne({ _id: req.params.id }, {$push : { comments: req.body.comentario }}) 
       res.redirect('/series/info/'+ req.params.id)
    
    //serie.updateOne({ _id: req.params.id }, {$push:{comments: req.body.comentario}}, (err) => res.redirect('/series/info/'+ req.params.id))
}

const deleteComments = async ({ serie }, req, res) => {
    const doc = await serie.findOne({ _id: req.params.id })
    doc.comments.splice(req.params.index, 1)
   
    await serie.updateOne({ _id: req.params.id }, doc)
    res.redirect('/series/info/'+ req.params.id)
}

module.exports = {
    serieIndex,
    serieForm,
    salvarSerie,
    deleteSerie,
    editSerie,
    infoOne,
    addComments,
    deleteComments
}