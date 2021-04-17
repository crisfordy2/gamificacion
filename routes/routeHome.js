
const {Router} = require('express');
const { homeGet,
      RegistroUsuariosGet,
      AddUserPost,
      loguinGet } = require('../controllers.js/home');

const router = Router();


router.get('/', homeGet);

router.get('/registro', RegistroUsuariosGet);

router.post('/addUser', AddUserPost);

router.get('/login', loguinGet);

/*

router.post('/', usariosPost);

router.put('/:id', usariosPut);

router.patch('/', usariosPatch);

router.delete('/', usariosDelete); 
*/




module.exports = router;