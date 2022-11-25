const ApiError = require('../error/ApiError')
const { User, Link, Connection } = require('../models/models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const uuid = require('uuid')
const path = require('path')
const axios = require('axios')

const generateJwt = (id, email, username) => {
    return jwt.sign(
        { id, email, username },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    )
}

class UserController {
    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.username)
        return res.json({ token })
    }

    async getInfo(req, res, next) {
        const { id } = req.user
        const info = await User.findOne({ include: Link, where: { id } })
        return res.json(info)
    }

    async saveBio(req, res, next) {
        const { id } = req.user
        const { bio } = req.body
        const response = await User.update({ bio }, { where: { id } })
        return res.json({ response })
    }

    async changeAvatar(req, res, next) {
        const { id } = req.user
        try {
            const { img } = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            await User.update({ avatar: fileName }, { where: { id } })
            return res.json(fileName)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async changeUsername(req, res, next) {
        const { id } = req.user
        const { username } = req.body
        await User.update({ username }, { where: { id } })
        const token = generateJwt(req.user.id, req.user.email, username)
        return res.json({ token })
    }

    async addLink(req, res, next) {
        const { id } = req.user
        const { title, link } = req.body
        try {
            const data = await Link.create({ title, link, userId: id })
            return res.json(data)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
        return res.json({ title, link })
    }

    async deleteLink(req, res, next) {
        const userId = req.user.id
        const { id } = req.body
        try {
            const data = await Link.destroy({ where: { id, userId } })
            return res.json(data)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async editLink(req, res, next) {
        const userId = req.user.id
        const { id, title, link } = req.body
        try {
            const data = await Link.update({ title, link }, { where: { id, userId } })
            return res.json(data)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
        return res.json({ id, title, link, userId })
    }

    async getConnections(req, res, next) {
        const userId = req.user.id
        try {
            const data = await Connection.findAll({ where: { userId } })
            return res.json(data)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async setEmail(req, res, next) {
        const { id } = req.user
        const { email } = req.body
        try {
            const data = await User.update({ distEmail: email }, { where: { id } })
            return res.json(data)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async setMailing(req, res, next) {
        const { id } = req.user
        const { status } = req.body
        try {
            const data = await User.update({ mailing: status }, { where: { id } })
            return res.json(data)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    // Unauthorized
    async getLayerInfo(req, res, next) {
        const { id } = req.params
        const userInfo = await User.findOne({ attributes: ['id', 'username', 'avatar', 'bio'], include: Link, where: { username: id } })
        return res.json(userInfo)
    }

    // oAuth API

    async GithubAuth(req, res, next) {
        const client_id = "7a5b9eeac74f6ad14299"
        const client_secret = "b4c986a0eea978ae32d525cc276361ef075ebd85"
        const { code } = req.body

        const params = "?client_id=" + client_id + "&client_secret=" + client_secret + "&code=" + code
        axios.post("https://github.com/login/oauth/access_token" + params, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            const resString = new URLSearchParams(response.data)
            const paramObject = Object.fromEntries(resString.entries());
            if (paramObject.access_token) {
                const access_token = paramObject.access_token
                axios.get("https://api.github.com/user", {
                    headers: {
                        "Authorization": "Bearer " + access_token,
                    }
                }).then(async response => {
                    const gitInfo = response.data
                    const connectionData = await Connection.findOne({ where: { oAuthID: gitInfo.id.toString() } })
                    if (connectionData) {
                        const user = await User.findOne({ where: { id: connectionData.userId } })
                        const token = generateJwt(user.id, user.email, user.username)
                        return res.json({ token })
                    } else {
                        const email = gitInfo.login + "@github.com"
                        const user = await User.create({ email })
                        const connectionAdd = await Connection.create({ email, oAuthID: gitInfo.id, service: 'github', userId: user.id })
                        const token = generateJwt(user.id, user.email, '')
                        return res.json({ token })
                    }
                })
            }
        })
    }

    async GoogleAuth(req, res, next) {
        const { email, googleId } = req.body
        try {
            const connectionData = await Connection.findOne({ where: { oAuthID: googleId } })
            if (connectionData) {
                const user = await User.findOne({ where: { id: connectionData.userId } })
                const token = generateJwt(user.id, user.email, user.username)
                return res.json({ token })
            } else {
                const user = await User.create({ email })
                const connectionAdd = await Connection.create({ email, oAuthID: googleId, service: 'google', userId: user.id })
                const token = generateJwt(user.id, email, '')
                return res.json({ token })
            }
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    // Connect API
    async GithubConnect(req, res, next) {
        const client_id = "278ebeee654546b331c5"
        const client_secret = "e1768f849b1b0bef044c39457c2f82c65516f38d"
        const userId = req.user.id
        const { code } = req.body

        const params = "?client_id=" + client_id + "&client_secret=" + client_secret + "&code=" + code
        axios.post("https://github.com/login/oauth/access_token" + params, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            const resString = new URLSearchParams(response.data)
            const paramObject = Object.fromEntries(resString.entries());
            if (paramObject.access_token) {
                const access_token = paramObject.access_token
                axios.get("https://api.github.com/user", {
                    headers: {
                        "Authorization": "Bearer " + access_token,
                    }
                }).then(async response => {
                    const gitInfo = response.data
                    const connectionData = await Connection.findOne({ where: { oAuthID: gitInfo.id.toString() } })
                    if (connectionData) {
                        return res.json({ status: 0, message: "This account is already connected to another account" })
                    } else {
                        const email = gitInfo.login + "@github.com"
                        const connectionAdd = await Connection.create({ email, oAuthID: gitInfo.id, service: 'github', userId })
                        return res.json({ status: 1, message: "Account connected successfully" })
                    }
                })
            }
        })
    }

    async GoogleConnect(req, res, next) {
        const { email, googleId } = req.body
        const userId = req.user.id
        try {
            const connectionData = await Connection.findOne({ where: { oAuthID: googleId } })
            if (connectionData) {
                return res.json({ status: 0, message: "This account is already connected to another account" })
            } else {
                const connectionAdd = await Connection.create({ email, oAuthID: googleId, service: 'google', userId })
                return res.json({ status: 1, message: "Account connected successfully" })
            }
            return res.json({ email, googleId, userId })
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }


    // Delete Connect
    async deleteConnect(req, res, next) {
        const userId = req.user.id
        const { api } = req.body
        try {
            const data = await Connection.destroy({ where: { service: api, userId } })
            return res.json(data)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

}

module.exports = new UserController()