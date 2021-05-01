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

                //console.log(answer[0]);

                if(answer[0].typeUser == 'profesor'){

                    res.render('userProfe',{
                        nombre: answer[0].nameUser,
                        idUser: answer[0].idUser,
                        objeto: objectoClases(answer[0].idUser,req,res)

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
const objectoClases = (id, req, res ) => {  
    


    const consulta = `SELECT * FROM users`;  
    
    
    req.getConnection((err, conn) => {
        conn.query(consulta, (error, answer) => {
            if (error) {
                res.json({
                    error
                });            
            }

            console.log(answer);
            return answer;
              
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
    addCurso
}