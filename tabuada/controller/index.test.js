const indexCon = require('./index')
const sinon = require('sinon')

describe('testing indexController', () => {
    it('testindo render', () =>{
        const res = {
            render: function(){}
        }

        let mock = sinon.mock(res)
        mock.expects('render').once().withArgs('home')
        indexCon.indexController({}, res)
    })
})