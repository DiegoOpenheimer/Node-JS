const index = ({ Curso }, req, res) => {
    Curso.findAll().then((result) =>{
        res.render('index', { result })
    }).catch(() => res.send('Não foi possivel carregar página'))    
}

const indexEdit = async({ Curso }, req, res) => {
   const resultado = {
       id: req.body.id,
    }
    if(req.body.nota == 'nota-1'){
        resultado.nota1 = req.body.valor
    }else if( req.body.nota == 'nota-2' ){
         resultado.nota2 = req.body.valor
    }else if (req.body.nota == 'nota-3') {
      resultado.nota3 = req.body.valor
    } 
    
    await Curso.update(resultado, {
        where:{
            id: resultado.id
        }
    })

    res.redirect('/')
}


module.exports = {
    index,
    indexEdit
}