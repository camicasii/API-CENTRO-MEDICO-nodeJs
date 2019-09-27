const router =  require('express').Router(); 
const {getData, getDatas, postData, putData, deleteData } = require('../controllers/doctor');
const  {checkToken} =  require('../lib/tokenController');
router.get('/',checkToken,getDatas)

router.get('/:id',checkToken,getData)

router.post('/',checkToken,postData)

router.put('/:id',checkToken,putData)

router.delete('/:id',checkToken,deleteData)

module.exports = router;