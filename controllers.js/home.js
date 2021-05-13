const fs = require('fs');
const path = require('path');
const { response, request } = (require = require("express"));

const homeGet = (req = request, res = response) => {
    res.render("index");
};

const RegistroUsuariosGet = (req = request, res = response) => {
    res.render("registroUsuarios", {
        mensaje: "",
    });
};

const loguinGet = (req = request, res = response) => {
    res.render("login", {
        mensaje: "",
    });
};

const crearCurso = (req = request, res = response) => {
    res.render("crearCurso", {
        mensaje: "",
    });
};

const contacto = (req = request, res = response) => {
    res.render("contacto", {
        mensaje: "",
    });
};

const mostrarCurso = (req = request, res = response) => {

    const data = req.body;

    const consultas = `SELECT * FROM activities WHERE idClass = ${data.idClass}; SELECT u.idUser, u.nameUser, u.lastNameUser, a.idActivity , a.nameActivity, r.idRecordActivity,COALESCE(r.noteActivity, 0) as noteActivity from users u INNER JOIN detailclass d ON u.idUser = d.idUser INNER JOIN class c ON c.idClass = d.idClass INNER JOIN activities a ON c.idClass = a.idClass INNER JOIN recordactivity r ON r.idActivity = a.idActivity WHERE c.idClass = ${data.idClass} and a.typeActivity = "Individual" and u.idUser = r.idUser;`;

    req.getConnection((err, conn) => {
        if (err) throw err;
        conn.query(consultas, (error, answer) => {

            console.log("Notas", answer[1]);

            res.render("userProfeCursos", {
                idClass: data.idClass,
                actividades: answer[0],
                notas: answer[1]
            });

        });
    });


};

const asignarActividad = (req = request, res = response) => {


    const data = req.body;

    console.log("llegando a crear actividad", data);

    res.render('crearActividad', {
        idClass: data.idClass
    });

}

const crearActividad = (req = request, res = response) => {

    /**
     * cuando se crea la actividad, tambien se crean todos los estudiantes en la tabla de recordActivity
     */

    const data = req.body;    

    // se inserta la actividad
    const consulta = `INSERT INTO activities(nameActivity, descActivity, typeActivity, idClass) VALUES ("${data.nameActivity}", "${data.descActivity}", "${data.typeActivity}", ${data.idClass} )`;

    req.getConnection((err, conn) => {

        conn.query(consulta, (error, answer) => {

            const consultas = `SELECT u.idUser FROM users u INNER JOIN detailclass d on u.idUser = d.idUser where d.idClass = ${data.idClass}; SELECT * FROM activities WHERE idClass = ${data.idClass};`;

            conn.query(consultas, (error, result) => {
                if (error) throw error;

                // console.log('Respuesta answer insertId', answer.insertId);                
                // console.log('Respuesta consulta2', result[0]);
                // console.log('Respuesta consulta3', result[1]);

                let usuarios = '';

                result[0].forEach(element => {
                    usuarios += '(' + answer.insertId +', ' + element.idUser + '),';                    
                });
                
                usuarios = usuarios.substring(0,usuarios.length - 1);
                // console.log("usuarios ", usuarios);

                const consulta2 = `INSERT INTO recordactivity (idActivity, idUser) VALUES ${usuarios}; SELECT * FROM activities WHERE idClass = ${data.idClass}`;

                conn.query(consulta2, (error, resultado) => {

                    res.render("userProfeCursos", {
                        idClass: data.idClass,
                        actividades: resultado[1]
                    });
                }); 

            });
        });
    });
};



const loginUser = (req = request, res = response) => {
    const data = req.body;

    const consulta = `SELECT * FROM users WHERE userUser = "${data.userUser}" and passUser = "${data.passUser}"`;

    req.getConnection((err, conn) => {
        if (err) throw err;
        conn.query(consulta, (error, answer) => {
            if (error) {
                res.render("login", {
                    mensaje: "Error de servidor",
                });
            }

            if (answer.length == 0) {
                res.render("login", {
                    mensaje: "Error de autenticación",
                });
            } else {
                const consulta2 = `SELECT * FROM class WHERE idUser = ${answer[0].idUser}`;

                conn.query(consulta2, (error, result) => {
                    if (error) throw error;

                    if (answer[0].typeUser == "profesor") {
                        res.render("userProfe", {
                            nombre: answer[0].nameUser,
                            idUser: answer[0].idUser,
                            objeto: result,
                        });
                    } else {
                        const consulta3 = `SELECT c.nameClass, c.idClass FROM class c INNER JOIN detailclass d ON c.idClass = d.idClass WHERE d.idUser = ${answer[0].idUser}`;

                        conn.query(consulta3, (error, resultado) => {
                            if (error) throw error;

                            res.render("userEstu", {
                                nombre: answer[0].nameUser,
                                idUser: answer[0].idUser,
                                objeto: resultado,
                            });
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
        conn.query(consulta, [data], (error, answer) => {
            if (error) {
                res.json(error);
            }
            res.render("registroUsuarios", {
                mensaje: "Se ha creado el usuario con éxito!",
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

            res.render("userProfe", {
                nombre,
                idUser: data.idUser,
                objeto: answer[1],
            });
        });
    });
};

const buscarCurso = (req = request, res = response) => {
    const data = req.body;

    const consulta = `SELECT * FROM class WHERE nameClass = "${data.nameClass}"`;

    req.getConnection((err, conn) => {
        conn.query(consulta, (error, answer) => {
            if (error) {
                res.json(error);
            }

            if (answer.length == 0) {
                res.render("buscarCursos", {
                    mensaje: "No existe el curso ingresado",
                    objeto: [],
                });
            }

            console.log("AQUI ANSER: ", answer);

            res.render("buscarCursos", {
                mensaje: "",
                objeto: answer,
            });
        });
    });
};

const mostrarCursosEstu = (req = request, res = response) => {
    const data = req.body;

    /*  3 querys
    -consultar passaword
    -agregar el detailclass(insert into)
    -consultar los cursos otra vez
      */

    const consulta1 = `SELECT * FROM class WHERE idClass = ${data.idClass} and passClass = "${data.passClass}"`;

    req.getConnection((err, conn) => {
        conn.query(consulta1, (error, answer) => {
            if (error) throw error;

            if (answer.length == 0) {
                res.render("buscarCursos", {
                    mensaje: "Contraseña incorrecta",
                    objeto: [],
                });
            }

            const consulta2 = `INSERT INTO detailclass (idClass, idUser) VALUES (${data.idClass},${data.idUser})`;

            conn.query(consulta2, (error, result) => {
                if (error) throw error;

                const consulta3 = `SELECT c.nameClass, c.idClass FROM class c INNER JOIN detailclass d ON c.idClass = d.idClass WHERE d.idUser = ${data.idUser}`;

                conn.query(consulta3, (error, resultado) => {
                    if (error) throw error;

                    res.render("userEstu", {
                        nombre: data.nameUser,
                        idUser: data.idUser,
                        objeto: resultado,
                    });
                });
            });
        });
    });
};



const mostrarCursoEstu = (req = request, res = response) => {

    const data = req.body;

    // esta mala la consulta, creo q me hace falta poner que el tipo de usario es estudinate    


    const consulta1 = `SELECT a.idActivity, a.nameActivity, a.descActivity, a.typeActivity, a.idClass, u.idUser, r.deliverableActivity from users u INNER JOIN detailclass d ON u.idUser = d.idUser INNER JOIN class c ON c.idClass = d.idClass INNER JOIN activities a ON c.idClass = a.idClass INNER JOIN recordactivity r ON r.idActivity = a.idActivity WHERE u.idUser = ${data.idUser} and c.idClass = ${data.idClass} and a.typeActivity = "Individual" and r.idUser = ${data.idUser} and r.deliverableActivity is null`;



    req.getConnection((err, conn) => {
        conn.query(consulta1, (error, answer) => {
            if (error) throw error;

            /**
             * la consulta 1 trae las actividades, pero se necesita saber cuales de esas actividades vienen sin la recordactivity creada
             * si ya esta creada la recordactivity no se muestra la actividad
             */
            console.log("ANSWER CONSULTA NUEVA: ", answer);



            res.render("cursosEstudiante", {
                nameClass: data.nameClass,
                actividades: answer
            });

        });
    });

};

const entregarActividadEstu = (req = request, res = response) => {

    const data = req.body;

    res.render("entregarActividadEstu", {
        data
    });
};


const crearRecordActivity = (req = request, res = response) => {

    const data = req.body;
    console.log("aqui data de activiadad", data);
    console.log("file: ", req.files); 

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.deliverableActivity) {
        res.status(400).json({msg:'No files were uploaded.'});
        return;
    }    

    const sampleFile = req.files.deliverableActivity;

    const uploadPath = path.join(__dirname, '../uploads/', sampleFile.name);    

    sampleFile.mv(uploadPath, (err) => {
        if (err) {
            return res.status(500).josn({err});
        }    
    });
    
    const remplazo = uploadPath.replace(/\\/g, '/');
    
    console.log("AQUi remplazo", remplazo);
    console.log("nombre archivo", req.files.deliverableActivity.name);    

    // se edita la tabla de recordactivity con los registros de los archivos 
    
    
    const consulta = `UPDATE recordactivity SET deliverableActivity = "${remplazo}", nameFile = "${req.files.deliverableActivity.name}" WHERE idUser = ${data.idUser} and idActivity = ${data.idActivity}`;


    req.getConnection((err, conn) => {
        conn.query(consulta, (error, answer) => {
            if (error) throw error;

            const consulta1 = `SELECT a.idActivity, a.nameActivity, a.descActivity, a.typeActivity, a.idClass, u.idUser, r.deliverableActivity from users u INNER JOIN detailclass d ON u.idUser = d.idUser INNER JOIN class c ON c.idClass = d.idClass INNER JOIN activities a ON c.idClass = a.idClass INNER JOIN recordactivity r ON r.idActivity = a.idActivity WHERE u.idUser = ${data.idUser} and c.idClass = ${data.idClass} and a.typeActivity = "Individual" and r.idUser = ${data.idUser} and r.deliverableActivity is null`;

            conn.query(consulta1, (error, resultado) => {
                

                res.render("cursosEstudiante", {
                    nameClass: data.nameClass,
                    actividades: resultado
                });

            });

        });
    });

};


const subirArchivo = (req = request, res = response) => {

    console.log("file: ", req.files);    

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).json({msg:'No files were uploaded.'});
        return;
    }    

    const sampleFile = req.files.archivo;

    const uploadPath = path.join(__dirname, '../uploads/', sampleFile.name);
    console.log("antes", uploadPath);

    sampleFile.mv(uploadPath, (err) => {
        if (err) {
            return res.status(500).josn({err});
        }
        
        console.log("se guardo", uploadPath);
        
    });
    
    const remplazo = uploadPath.replace(/\\/g, '/');
    
    console.log("AQUi remplazo", remplazo);

    const consulta = `INSERT INTO recordactivity (deliverableActivity, idActivity, idUser) VALUES ("${remplazo}", 7, 3)`;
    
    req.getConnection((err, conn) => {
        conn.query(consulta, (error, answer) => {
            if (error) throw error;

            const consulta2 = `SELECT * FROM recordactivity WHERE idUser = 3`;

            conn.query(consulta2, (error, respuesta) => { 

                console.log("Respuesta de archivos", respuesta);

                res.render('vistaArchivos',{
                    respuesta
                });  

            });            
    
        });
    });

};


const descargaArchivos = (req = request, res = response) => {

    const {deliverableActivity} = req.body;

    console.log("data de descargar: " , deliverableActivity);    
    
    res.download(deliverableActivity);    
};


const verActividadesProfe = (req = request, res = response) => {

    const data = req.body;

    console.log("llego la activiadad", data);

    const consulta = `SELECT * FROM recordactivity WHERE idActivity = ${data.idActivity} and deliverableActivity is not null`;   

    req.getConnection((err, conn) => {
        conn.query(consulta, (error, answer) => {

            console.log("recordactivity", answer);

            
            res.render('verActividadesProfe',{
                actividades : answer
            }); 

        });
    });
};

const asignarNotas = (req = request, res = response) =>{
    const data = req.body;
    console.log("data de notas", data);

    const consulta = `UPDATE recordactivity SET ecoins = ${data.ecoins}, noteActivity = ${data.noteActivity} WHERE idRecordActivity = ${data.idRecordActivity}`;

    req.getConnection((err, conn) => {
        conn.query(consulta, (error, answer) => {

            res.send("se creo");

        });
    });


}




module.exports = {
    homeGet,
    RegistroUsuariosGet,
    AddUserPost,
    loguinGet,
    loginUser,
    contacto,
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
    descargaArchivos,
    verActividadesProfe,
    asignarNotas
};



