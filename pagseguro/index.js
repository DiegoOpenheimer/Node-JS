const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const Pagseguro = require('pagseguro')
const request = require('request-promise')
const parse = require('xml2js').parseString
const cors = require('cors')

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }))

const dados = {
    email: 'diegoop.pa@hotmail.com',
    token: 'E3C661D300134FB3A33B89E170D8F3FE',
    mode: 'sandbox'
}

const pagseguro = new Pagseguro(dados)

app.get('/pagar', (req, res) => {
    pagseguro.currency('BRL')
    pagseguro.reference('55555')
    pagseguro.addItem({
        id: 1,
        description: 'Bola quadrada',
        amount: '12.00',
        quantity: 4,
        weight: 1
    })

    pagseguro.setRedirectURL('http://localhost/pagok')
    pagseguro.setNotificationURL('http://localhost/notify')
    pagseguro.send((err, pags) => {
        parse(pags, (err, js) => {
            const url = 'https://sandbox.pagseguro.uol.com.br/v2/checkout/payment.html?code='
            res.redirect(url + js.checkout.code)
        })
    })
})

app.post('/notify', async(req, res) => {
    const notification = req.body.notificationCode
    const payment = await request({
        url: 'https://ws.sandbox.pagseguro.uol.com.br/v2/transactions/notifications/' + notification + '?email=' + dados.email + '&token=' + dados.token,
        method: 'get'
    })

    parse(payment, (err, dado) => {
        res.send(dado)
    })

})


app.get('/', (req, res) => {
    res.send('ok')
})


app.listen(80, () => console.log('running.. '))