
const {Router} = require('express');
const { homeGet,
   usariosPost,
    usariosPut,
     usariosPatch,
      usariosDelete } = require('../controllers.js/home');

const router = Router();


router.get('/', homeGet);

/*

router.post('/', usariosPost);

router.put('/:id', usariosPut);

router.patch('/', usariosPatch);

router.delete('/', usariosDelete); 
*/




module.exports = router;