const Router = require('express')
const router = new Router()
const messageController = require('../controllers/messageController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/createMessage', authMiddleware, messageController.createMessage)
router.post('/deleteMessage', authMiddleware, messageController.deleteMessage)
router.post('/starredMessage', authMiddleware, messageController.starredMessage)
router.post('/readMessage', authMiddleware, messageController.readMessage)
router.post('/createUnauthMessage', messageController.createUnauthMessage)

router.get('/getMessages', authMiddleware, messageController.getMessages)

module.exports = router