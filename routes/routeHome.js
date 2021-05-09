
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
    crearActividad,
    mostrarCursoEstu,
    entregarActividadEstu,
    crearRecordActivity,
    subirArchivo,
    descargaArchivos } = require('../controllers.js/home');

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

router.post('/mostrarCursoEstu', mostrarCursoEstu);

router.post('/entregarActividadEstu', entregarActividadEstu);

router.post('/crearRecordActivity', crearRecordActivity);

router.post('/subirArchivo', subirArchivo);

router.post('/descargaArchivos',descargaArchivos);








module.exports = router;