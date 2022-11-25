const ApiError = require('../error/ApiError')
const { Message, User } = require('../models/models')
const { Op } = require("sequelize")

class MessageController {

  async getMessages(req, res, next) {
    const { username } = req.user
    const data = await Message.findAll({
      where: {
        [Op.or]: [
          { from: username },
          { to: username }
        ]
      },
      order: [
        ['createdAt', 'DESC']
      ]
    })
    return res.json(data)
  }

  async createMessage(req, res, next) {
    const { username } = req.user
    const { to, body } = req.body
    try {
      const data = await User.findOne({ where: { username } }).then(res => {
        const userId = res.id;
        Message.create({ from: username, to, body, starred: false, userId }).catch(err => console.log(err))
      })
      return res.json(data)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async deleteMessage(req, res, next) {
    const userId = req.user.id
    const { id } = req.body
    try {
      const data = await Message.destroy({ where: { id, userId } })
      return res.json(data)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async starredMessage(req, res, next) {
    const userId = req.user.id
    const { id } = req.body
    try {
      const message = await Message.findOne({ where: { id } })
      if (message.userId === userId) {
        const data = await Message.update({ SenderStarred: !message.SenderStarred }, { where: { id } })
        return res.json(data)
      } else {
        const data = await Message.update({ ReceiverStarred: !message.ReceiverStarred }, { where: { id } })
        return res.json(data)
      }
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async readMessage(req, res, next) {
    const { id } = req.body
    try {
      const data = await Message.update({ status: true }, { where: { id } })
      return res.json(data)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }

  }

  async createUnauthMessage(req, res, next) {
    const { from, to, body } = req.body
    try {
      const data = await Message.create({ from, to, body, starred: false, userId: 1 }).catch(err => console.log(err))
      return res.json(data)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

}

module.exports = new MessageController()