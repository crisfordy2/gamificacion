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

    res.render('elements');

};


const prueba = (req = request, res = response) => {

    res.render('prueba');

};


const loguinGet = (req = request, res = response) => {

    res.render('login',{
        mensaje:''
    });

};

const AddUserPost = (req = request, res = response) => {

    const data = req.body;    
    
    const consulta = "INSERT INTO estudent SET ?";        
    console.log(data);
    req.getConnection((err, conn) => {
        conn.query(consulta, [data] , (error, answer) => {
        if (error) {
            res.json(error);
        }
        console.log(answer);
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
    prueba
}