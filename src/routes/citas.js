const router =  require('express').Router(); 
const { getCita,getCitas, postCita, postCitaEmployee,
    putCita,deleteCita,deleteCitaEmployee} = require('../controllers/citas')
const  {checkToken} =  require('../lib/tokenController');

router.get('/',checkToken,getCitas)
router.get('/:id',checkToken,getCita)
router.post('/:docId/:userId',checkToken,postCita)

router.post('/employee/:docId/:userId',checkToken,postCitaEmployee)
router.put('/:id',checkToken,putCita)
router.delete('/:userid/:id',checkToken,deleteCita)

router.delete('/employee/:userid/:id',checkToken,deleteCitaEmployee)

module.exports = router;