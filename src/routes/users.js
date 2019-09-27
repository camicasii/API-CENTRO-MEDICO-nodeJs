const router =  require('express').Router(); 
const {getData, getDatas, postData, putData, deleteData } = require('../controllers/users');



router.get('/',getDatas)

router.get('/:id',getData)

router.put('/:id',putData)

router.delete('/:id',deleteData)


module.exports = router;