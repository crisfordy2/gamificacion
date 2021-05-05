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

    const consulta = `SELECT * FROM activities WHERE idClass = ${data.idClass}`;

    req.getConnection((err, conn) => {
        if (err) throw err;
        conn.query(consulta, (error, answer) => {

            res.render("userProfeCursos", {
                idClass: data.idClass,
                actividades: answer
            });

        });
    });    

    
};

const asignarActividad = (req = request, res = response)=> {

    const data = req.body;

    console.log("llegando a crear actividad", data);

    res.render('crearActividad',{
        idClass: data.idClass
    });

}

const crearActividad = (req = request, res = response) => {

    const data = req.body;
    
    console.log("datos actividad", data);

    const consulta = `INSERT INTO activities(nameActivity, descActivity, typeActivity, idClass) VALUES ("${data.nameActivity}", "${data.descActivity}", "${data.typeActivity}", ${data.idClass} )`;

    req.getConnection((err, conn) => {
        if (err) throw err;
        conn.query(consulta, (error, answer) => {

            const consulta2 = `SELECT * FROM activities WHERE idClass = ${data.idClass}`;

            conn.query(consulta2, (error, result) => {

                res.render("userProfeCursos", {
                    idClass: data.idClass,
                    actividades: result
                });
            })
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
    console.log("aqui DATA:", data);

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

            //console.log('Objecto Resultado',answer);

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
    crearActividad
};
