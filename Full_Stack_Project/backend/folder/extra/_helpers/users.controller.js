const userService = require("../../src/services/user.service")
exports.authenticate = async function (req, res, next) {
    userService.authenticate(req.body)
        .then(user => res.json(user))
        .catch(next);
}

exports.getAll = async function (req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(next);
}