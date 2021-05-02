const { response, request } = require = require('express');


const homeGet = (req = request, res = response) => {

    res.render('index');

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
        if (err) throw err;
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

                const consulta2 = `SELECT * FROM class WHERE idUser = ${answer[0].idUser}`;

                conn.query(consulta2, (error, result) => {
                    if (error) throw error;

                    console.log('RESULT: ', result);

                    if(answer[0].typeUser == 'profesor'){

                        res.render('userProfe',{
                            nombre: answer[0].nameUser,
                            idUser: answer[0].idUser,
                            objeto: result                   
                        });
                    }else{
                        res.render('userEstu',{
                            nombre: answer[0].nameUser
                        });
                    }
                });
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

    const nombre = data.nombreProfe;    
    
    const consulta = `INSERT INTO class ( nameClass, idUser, codeClass, passClass) VALUES ("${data.nameClass}",${data.idUser},"${data.codeClass}","${data.passClass}"); SELECT * FROM class WHERE idUser = ${data.idUser}`;    
    
    req.getConnection((err, conn) => {
        conn.query(consulta, (error, answer) => {
        if (error) {
            res.json(error);
        }        
        console.log('Answer AQUI:',answer[1]);
        res.render('userProfe',{
            nombre,
            idUser: data.idUser,
            objeto: answer[1]
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
    addCurso    
    
}



/*

const objectoClases = (req = request, res = response) => {      

    const data = req.body; 
    //console.log("data aqui:",data.idUser);

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


 */
