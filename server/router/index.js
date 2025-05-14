const Router = require('express').Router
const router = new Router()
const {body} = require('express-validator')
const authMiddleware = require('../middlewares/auth-middleware')
const adminMiddleware = require('../middlewares/admin-middleware')
const UserController = require('../controllers/user-controller')
const ProductController = require('../controllers/product-controller')

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 8, max: 16}),
    UserController.registration
)
router.post('/login', UserController.login)
router.post('/logout', UserController.logout)
router.get('/refresh', UserController.refresh)

router.get('/product', ProductController.getAll)
router.get('/product/:id', ProductController.getById)
router.post('/product', adminMiddleware, ProductController.create)
router.put('/product/:id', adminMiddleware, ProductController.update)
router.delete('/product/:id', adminMiddleware, ProductController.delete)
router.post('/product/:id/review', authMiddleware, ProductController.addReview)

module.exports = router