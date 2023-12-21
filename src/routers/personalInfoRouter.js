const personalInfoController = require("../controllers/personalInfoController.js")
const authMiddleware = require("../middlerwares/authMiddlerware.js")
const router = require('express').Router()

router.get('/:userId',authMiddleware.authMiddleware, personalInfoController.getOnePersonalInfo)
router.post('/',authMiddleware.authMiddleware,personalInfoController.addPersonalInfo)
router.put('/userId',authMiddleware.authMiddleware,personalInfoController.updatePersonalInfo)
router.delete('/:userId',authMiddleware.authMiddleware,personalInfoController.deletePersonalInfo)



module.exports = router