const router =  require('express').Router(); 
const {getData, getDatas, postData, putData, deleteData } = require('../controllers/patient');

router.get('/',getDatas)

router.get('/:id',getData)

router.post('/',postData)

router.put('/:id',putData)

router.delete('/:id',deleteData)

module.exports = router;