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

    res.render('registroUsuarios');

};

const generic = (req = request, res = response) => {

    res.render('generic');

};


const prueba = (req = request, res = response) => {

    res.render('prueba');

};

const RegistroUserGet = (req = request, res = response) => {

    res.render('registroUser');

};

const loguinGet = (req = request, res = response) => {

    res.render('login');

};

const AddUserPost = (req = request, res = response) => {

    const data = req.body;

    

    if (data.typeUser == 'estudiante') {
        const consulta = "INSERT INTO estudent SET ?";        
        console.log(data);
        req.getConnection((err, conn) => {
                conn.query(consulta, [data] , (error, answer) => {
                    if (error) {
                        res.json(error);
                    }
                    console.log(answer);
                    res.send('Se ha creado un estudiante con éxito!');                    
                });
            });

    } else if (data.typeUser == 'profesor') {
        const consulta = "INSERT INTO teacher SET ?";        
        console.log(data);
        req.getConnection((err, conn) => {
                conn.query(consulta, [data] , (error, answer) => {
                    if (error) {
                        res.json(error);
                    }
                    console.log(answer);
                    res.send('Se ha creado un estudiante con éxito!');                    
                });
            });
    }
};


module.exports = {
    homeGet,
    RegistroUsuariosGet,
    AddUserPost,
    loguinGet,
    RegistroUserGet,
    generic,
    prueba
}