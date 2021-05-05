
const {Router} = require('express');
const { homeGet,
      RegistroUsuariosGet,
      AddUserPost,
      loguinGet,            
      contacto,      
      loginUser,
      crearCurso,
      addCurso,
      mostrarCurso,
      buscarCurso,
      mostrarCursosEstu,
      asignarActividad,
      crearActividad } = require('../controllers.js/home');

const router = Router();


router.get('/', homeGet);

router.get('/registro', RegistroUsuariosGet);

router.post('/addUser', AddUserPost);

router.get('/login', loguinGet);

router.get('/contacto', contacto);

router.post('/loginUser', loginUser);

router.post('/crearCurso', crearCurso);

router.post('/addCurso', addCurso);

router.post('/mostrarCurso', mostrarCurso);

router.post('/buscarCurso', buscarCurso);

router.post('/mostrarCursosEstu', mostrarCursosEstu);

router.post('/asignarActividad', asignarActividad);

router.post('/crearActividad', crearActividad);






module.exports = router;