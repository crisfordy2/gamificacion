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


const prueba = (req = request, res = response) => {

    res.render('prueba');

};


const loguinGet = (req = request, res = response) => {

    res.render('login',{
        mensaje:''
    });

};


const loginUser = (req = request, res = response) => {

    const data = req.body;            

    const consulta = `SELECT * FROM estudent WHERE userEstudent = "${data.userEstudent}" and passEstudent = "${data.passEstudent}"`;  
    
    
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

            res.render('userLogin',{
                mensaje: answer[0].nameEstudent
            }); 

        }                
              
        });
    });    
};



const AddUserPost = (req = request, res = response) => {

    const data = req.body;    
    
    const consulta = "INSERT INTO estudent SET ?";        
    
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
    prueba,
    loginUser
}