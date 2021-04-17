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

const loguinGet = (req = request, res = response) => {

    res.render('login');

};

const AddUserPost = (req = request, res = response) => {

    const data = req.body;

    

    if (data.tipoUsuario == 'estudiante') {
        const consulta = "INSERT INTO estudent SET ?";
        delete data.tipoUsuario;
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

    } else if (data.tipoUsuario == 'profesor') {
        const consulta = "INSERT INTO teacher SET ?";
        delete data.tipoUsuario;
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
    loguinGet
}