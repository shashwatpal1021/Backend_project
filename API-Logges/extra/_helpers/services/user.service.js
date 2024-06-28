const config = require('../../../src/config.json')
const jwt = require('jsonwebtoken')

const users = [
    {
        id: 1,
        username: "test",
        password: "test",
        firstName: "Test",
        latName: "User"
    }
]

exports.authenticate = async function ({ username, password }) {
    const user = users.find(u = u.username === username && u.password === password)
    if (!user) throw "Username or password is incorrect"

    const token = jwt.sign(
        { sub: user.id },
        config.secret,
        { expiresIn: "1d" }
    )

    return {
        ...omitPassword(user),
        token
    }
}

async function getAll() {
    return users.map(u => omitPassword(u))
}

exports.omitPassword = async function (user) {
    const { password, ...userWithoutPassword } = user
    return userWithoutPassword
}

