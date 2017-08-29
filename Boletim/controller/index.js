const index = ({
    Curso
}, req, res) => {
    Curso.findAll().then((result) => {
        res.render('index', {
            result
        })
        loadFile(result)
    }).catch(() => res.send('Não foi possivel carregar página'))


}

const indexEdit = async({
    Curso
}, req, res) => {
    const resultado = {
        id: req.body.id,
    }
    if (req.body.nota == 'nota-1') {
        resultado.nota1 = req.body.valor
    } else if (req.body.nota == 'nota-2') {
        resultado.nota2 = req.body.valor
    } else if (req.body.nota == 'nota-3') {
        resultado.nota3 = req.body.valor
    }

    await Curso.update(resultado, {
        where: {
            id: resultado.id
        }
    })

    res.redirect('/')
}


module.exports = {
    index,
    indexEdit
}


function loadFile(result) {
    const fs = require('fs')
    const myTable = fs.createWriteStream('public/tabela.csv')

    myTable.write('Professor; Disciplina; Nota-1; Nota-2; Nota-3;\n',() => {
        result.forEach(contents => {
            const data = `${contents.professor}; ${contents.disciplina}; ${contents.nota1};${contents.nota2}; ${contents.nota3};\n`

            myTable.write(data)
        })
    })

}