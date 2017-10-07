const request = require('request-promise')

const listItems = async(req, res) => {
    const limit = "limit" in req.query ? req.query.limit : 1;
    res.header("Cache-control", "public, max-age=3600");
    let results = {}

    try {
          results = await request({
                url: limit == 1 ?
                "https://pokeapi.co/api/v2/item/?limit=20" : "https://pokeapi.co/api/v2/item/?limit=20&&offset=" +
                (limit - 1) * 20,
                method: "get",
                json: true
            })
    } catch(e) {
        res.render('notFound')
        return false
    }

    res.locals.limit = limit;

    res.render("listItems", {
        results
    });
}

const infoItems = async(req, res) => {
    let info = {}

    try {
            info = await request({
                url: "https://pokeapi.co/api/v2/item/" + req.params.name,
                method: "get",
                json: true
             })
    } catch(e) {
        res.render('notFound')
        return false
    }

    res.render("item", {
        info
    });
}

module.exports = {
    listItems,
    infoItems
}