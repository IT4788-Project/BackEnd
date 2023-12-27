const personalInfoController = require("../controllers/personalInfoController.js")
const authMiddleware = require("../middlerwares/authMiddlerware.js")
const router = require('express').Router()

router.get('/', authMiddleware.authMiddleware, personalInfoController.getOnePersonalInfo)
router.post('/', authMiddleware.authMiddleware, personalInfoController.addPersonalInfo)
router.put('/', authMiddleware.authMiddleware, personalInfoController.updatePersonalInfo)
router.delete('/', authMiddleware.authMiddleware, personalInfoController.deletePersonalInfo)
router.get('/getAll', personalInfoController.getAllPersonalInfo)


module.exports = router