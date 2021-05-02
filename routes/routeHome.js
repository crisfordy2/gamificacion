
const {Router} = require('express');
const { homeGet,
      RegistroUsuariosGet,
      AddUserPost,
      loguinGet,      
      generic,
      contacto,      
      loginUser,
      crearCurso,
      addCurso } = require('../controllers.js/home');

const router = Router();


router.get('/', homeGet);

router.get('/registro', RegistroUsuariosGet);

router.post('/addUser', AddUserPost);

router.get('/login', loguinGet);

router.get('/generic', generic);

router.get('/contacto', contacto);

router.post('/loginUser', loginUser);

router.post('/crearCurso', crearCurso);

router.post('/addCurso', addCurso);

//router.post('/mostrarCurso', objectoClases);



/*

router.post('/', usariosPost);

router.put('/:id', usariosPut);

router.patch('/', usariosPatch);

router.delete('/', usariosDelete); 
*/




module.exports = router;