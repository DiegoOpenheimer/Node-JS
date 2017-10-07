const request = require('request-promise')


const listPokemons = async(req, res) => {
    const limit = 'limit' in req.query ? req.query.limit : 1
    res.header('Cache-control', 'public, max-age=3600')
    const results = await request({
        url: limit == 1 ? "https://pokeapi.co/api/v2/pokemon/?limit=20" : "https://pokeapi.co/api/v2/pokemon/?limit=20&&offset=" + ((limit - 1) * 20),
        method: 'get',
        json: true
    })

    res.locals.limit = limit



    res.render('listPokemons', {
        results,

    })

}

const infoPokemon = async(req, res) => {
    let info = {}
       try {
          info = await request({
            url: "https://pokeapi.co/api/v2/pokemon/" + req.params.name,
            method: 'get',
             json: true
         })
       } catch(e) {
             res.render('notFound')
              return false
       }


    res.render('pokemons', {
        info
    })
}

const infoQueryPokemon =  async(req, res) => {
    let info = {}
    
    if(req.query.name === '') {
        res.redirect('/')
        return false
    }
    try {
         info = await request({
            url: "https://pokeapi.co/api/v2/pokemon/" + req.query.name,
            method: 'get',
             json: true
         })
       } catch(e) {
           res.render('notFound')
           return false
       }

    res.render('pokemons', {
        info
    })
}

module.exports = {
    listPokemons,
    infoPokemon,
    infoQueryPokemon
}