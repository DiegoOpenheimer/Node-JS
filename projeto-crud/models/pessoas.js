const findAll = (connection) => {

    return new Promise((resolve, reject) => {
        connection.query('select * from pessoas order by nome', (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}

const deleteOne = (connection, id) => {
    return new Promise((resolve, reject) => {
        connection.query('delete from pessoas where id = ' + id + ' limit 1', (err) => {
            if (err) {
                reject(err)
            } else {
                resolve()
            }
        })
    })
}

const addPessoa = (connection, data) => {
    return new Promise((resolve, reject) => {
        connection.query(`insert into pessoas (nome, nascimento, cargo) values ('${data.nome}','${data.nascimento}','${data.cargo}')`, (err) => {
            if (err) {
                reject(err)
            } else {
                resolve()
            }
        })
    })
 

}

const editPerson = (connection, data) => {
    return new Promise((resolve, reject) => {
        connection.query(`update pessoas set nome = '${data.nome}',
        nascimento = '${data.nascimento}', cargo = '${data.cargo}' where id = '${data.id}'`,(err) => {
            if(err){
                reject(err)
            }else{
                resolve()
            }
        })
    })
}




module.exports = {
    findAll, deleteOne, addPessoa, editPerson
}