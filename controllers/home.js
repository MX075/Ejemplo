const Users = require('../models/User')

const home = async(req, res) => {
    const data = await Users.findOne()
    res.render('home', { gas: data.username })
}

module.exports = {
    home,

}