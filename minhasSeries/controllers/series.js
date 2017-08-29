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


module.exports = {
    serieIndex,
    serieForm,
    salvarSerie,
    deleteSerie,
    editSerie
}