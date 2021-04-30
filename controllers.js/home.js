const { response, request } = require = require('express');


const homeGet = (req = request, res = response) => {

    res.render('index');

    /*
    req.getConnection((err,conn) =>{
        conn.query('SELECT * FROM estudent', (error, answer) =>{
            if(error){
                res.json(error);
            }
            console.log(answer);
            res.render('about');
        });
    });*/


};


const RegistroUsuariosGet = (req = request, res = response) => {

    res.render('registroUsuarios',{
        mensaje:''
    });

};

const generic = (req = request, res = response) => {

    res.render('elements', {
        mensaje: 'hola'
    });

};



const loguinGet = (req = request, res = response) => {

    res.render('login',{
        mensaje:''
    });

};



const crearCurso = (req = request, res = response) => {

    res.render('crearCurso',{
        mensaje:''
    });

};

const contacto = (req = request, res = response) => {

    res.render('contacto',{
        mensaje:''
    });

};


const loginUser = (req = request, res = response) => {

    const data = req.body;            

    const consulta = `SELECT * FROM users WHERE userUser = "${data.userUser}" and passUser = "${data.passUser}"`;  
    
    
    req.getConnection((err, conn) => {
        conn.query(consulta, (error, answer) => {
        if (error) {
            res.render('login',{
                mensaje:'Error de servidor'
            });            
        }      

        if(answer.length == 0){
            res.render('login',{
                mensaje:'Error de autenticación'
            });

        }else{

            console.log(answer[0]);

            if(answer[0].typeUser == 'profesor'){
                res.render('userProfe',{
                    mensaje: answer[0].nameUser,
                    idUser: answer[0].idUser
                });
            }else{
                res.render('userEstu',{
                    mensaje: answer[0].nameUser
                });
            }

             

        }                
              
        });
    });    
};



const AddUserPost = (req = request, res = response) => {

    const data = req.body;    
    
    const consulta = "INSERT INTO users SET ?";        
    
    req.getConnection((err, conn) => {
        conn.query(consulta, [data] , (error, answer) => {
        if (error) {
            res.json(error);
        }        
        res.render('registroUsuarios', {
            mensaje: 'Se ha creado el usuario con éxito!'
           });        
        });
    });    
};


module.exports = {
    homeGet,
    RegistroUsuariosGet,
    AddUserPost,
    loguinGet,    
    generic,    
    loginUser,
    contacto,
    crearCurso
}