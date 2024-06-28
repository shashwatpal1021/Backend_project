const { expressjwt } = require("express-jwt")

const config = require('../config.json')

exports.Jwt = function () {
    const { secret } = config
    return expressjwt({
        secret,
        algorithms:['HS256']
    }).unless({
        path:[
            'users/authenticate'
        ]
    })
}