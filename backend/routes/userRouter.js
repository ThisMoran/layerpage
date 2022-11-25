const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/saveBio', authMiddleware, userController.saveBio)
router.post('/changeAvatar', authMiddleware, userController.changeAvatar)
router.post('/changeUsername', authMiddleware, userController.changeUsername)

router.post('/addLink', authMiddleware, userController.addLink)
router.post('/deleteLink', authMiddleware, userController.deleteLink)
router.post('/editLink', authMiddleware, userController.editLink)

router.post('/setMailing', authMiddleware, userController.setMailing)
router.post('/setEmail', authMiddleware, userController.setEmail)

// oAuth API
router.post('/GoogleAuth', userController.GoogleAuth)
router.post('/GithubAuth', userController.GithubAuth)

// Connect API
router.post('/GithubConnect', authMiddleware, userController.GithubConnect)
router.post('/GoogleConnect', authMiddleware, userController.GoogleConnect)

// Delete API
router.post('/deleteConnect', authMiddleware, userController.deleteConnect)

router.get('/check', authMiddleware, userController.check)
router.get('/getInfo', authMiddleware, userController.getInfo)
router.get('/getConnections', authMiddleware, userController.getConnections)

router.get('/:id', userController.getLayerInfo)

module.exports = router