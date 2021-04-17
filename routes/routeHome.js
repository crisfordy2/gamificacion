
const {Router} = require('express');
const { homeGet,
      RegistroUsuariosGet,
      AddUserPost,
      loguinGet,
      RegistroUserGet,
      generic,
      prueba } = require('../controllers.js/home');

const router = Router();


router.get('/', homeGet);

router.get('/registro', RegistroUsuariosGet);

router.get('/registroUser', RegistroUserGet);

router.post('/addUser', AddUserPost);

router.get('/login', loguinGet);

router.get('/generic', generic);

router.get('/prueba', prueba);





/*

router.post('/', usariosPost);

router.put('/:id', usariosPut);

router.patch('/', usariosPatch);

router.delete('/', usariosDelete); 
*/




module.exports = router;