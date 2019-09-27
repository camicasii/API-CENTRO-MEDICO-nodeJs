const router =  require('express').Router(); 
const { getCita,getCitas, postCita, postCitaEmployee,
    putCita,deleteCita,deleteCitaEmployee} = require('../controllers/citas')


router.get('/',getCitas)
router.get('/:id',getCita)
router.post('/:docId/:userId',postCita)

router.post('/employee/:docId/:userId',postCitaEmployee)
router.put('/:id',putCita)
router.delete('/:userid/:id',deleteCita)

router.delete('/employee/:userid/:id',deleteCitaEmployee)

module.exports = router;