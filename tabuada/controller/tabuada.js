const list = (req, res) => {
    const valores0a25 = []
    const valores26a50 = []
    const valores51a75 = []
    const valores76a100 = []

    for (let i = 1; i <= 100; i++) {
        if (i <= 25) {
            valores0a25.push(i)
        } else if (i <= 50) {
            valores26a50.push(i)
        } else if (i <= 75) {
            valores51a75.push(i)
        } else {
            valores76a100.push(i)
        }
    }
    res.render('tabuada/list', {
        valores0a25,
        valores26a50,
        valores51a75,
        valores76a100
    }) // Render na pasta views/tabuada/list
}

const valor = (req, res) => {
    const num = req.params.num
    const valores0a25 = []
    const valores26a50 = []
    const valores51a75 = []
    const valores76a100 = []

    preencherResultado(valores0a25, valores26a50, valores51a75, valores76a100, num)
 

    res.render('tabuada/tabuada', {         //Render na pasta views/tabuada/tabuada
        num,
        valores0a25,
        valores26a50,
        valores51a75,
        valores76a100
    })
}


module.exports = { list, valor }



function preencherResultado(vetor1, vetor2, vetor3, vetor4, num) {
    for (let i = 1; i <= 100; i++) {
        if (i <= 25) {
            vetor1.push({
                num,
                i,
                resultado: i * num
            })
        } else if (i <= 50) {
            vetor2.push({
                num,
                i,
                resultado: i * num
            })
        } else if (i <= 75) {
            vetor3.push({
                num,
                i,
                resultado: i * num
            })
        } else {
            vetor4.push({
                num,
                i,
                resultado: i * num
            })
        }
    }
}