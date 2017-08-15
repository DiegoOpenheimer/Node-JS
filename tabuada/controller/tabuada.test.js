const sinon = require('sinon')
const tabuada = require('./tabuada')

describe('testing tabuadaController', () => {
    it('testing list', () => {
        const res = {
            render: function () { }
        }
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

        let mock = sinon.mock(res)
        mock.expects('render').once().withArgs('tabuada/list', { valores0a25, valores26a50, valores51a75, valores76a100 })
        tabuada.list({}, res)
    })

    it('testing value', () => {
        const res = {
            render: function () { }
        }
        const num = 10
        const valores0a25 = []
        const valores26a50 = []
        const valores51a75 = []
        const valores76a100 = []

        preencherResultado(valores0a25, valores26a50, valores51a75, valores76a100, num)

        let mock = sinon.mock(res)
        mock.expects('render').once().withArgs('tabuada/tabuada', {
            num,
            valores0a25,
            valores26a50,
            valores51a75,
            valores76a100
        })

        tabuada.valor({ params: { num } }, res)
    })
})


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