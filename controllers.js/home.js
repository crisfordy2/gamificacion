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
    
    const objeto = {  idClass: '',
        nameClass: '',
        idUser: '',
        codeClass: '',
        passClass: ''}

    console.log("aqui nameclass", objeto.nameClass);
    
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

                //console.log(answer[0]);

                if(answer[0].typeUser == 'profesor'){

                    res.render('userProfe',{
                        nombre: answer[0].nameUser,
                        idUser: answer[0].idUser,
                        objeto                       
                    });
                }else{
                    res.render('userEstu',{
                        nombre: answer[0].nameUser
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


const addCurso = (req = request, res = response) => {

    const data = req.body;          

    console.log(data);

    const nombre = data.nombreProfe;

    delete data.nombreProfe;
    
    
    const consulta = "INSERT INTO class SET ?";        
    
    req.getConnection((err, conn) => {
        conn.query(consulta, [data] , (error, answer) => {
        if (error) {
            res.json(error);
        }        
        res.render('userProfe',{
            nombre,
            idUser: data.idUser
        });
        console.log("answer", answer);
        });
    });    
    
};

/*
function objectoClases(id) {

}*/


// prueba metodo local


const objectoClases = (req = request, res = response) => {      

    const data = req.body; 
    console.log("data aqui:",data.idUser);
    


    const consulta = `SELECT * FROM class WHERE idUser = ${data.idUser}`;  
    //const consulta = `SELECT * FROM class WHERE idUser = 2`;  
    
    
    req.getConnection((err, conn) => {
        conn.query(consulta, (error, answer) => {
            if (error) {
                res.json({
                    error
                });            
            }

            console.log(answer);
           
            
            res.render('userProfe',{
                nombre: "jorge",
                idUser: 2,
                objeto: answer
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
    crearCurso,
    addCurso,
    objectoClases
    
}