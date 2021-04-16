
const {response, request} = require = require('express');


const usariosGet = (req = request, res = response)=> {

    req.getConnection((err,conn) =>{
        conn.query('SELECT * FROM estudent', (error, answer) =>{
            if(error){
                res.json(error);
            }
            console.log(answer);
            res.render('about');
        });
    });

    /* 
    const {nombre, apikey, pag = 10} = req.query;

    res.json({
        msg:'get API - controlador',
        nombre,
        apikey,
        pag
    }); */
};

const usariosPost = (req, res = response)=> {

    const {nombre, edad} = req.body;

    res.json({
        msg:'post API - controlador',
        nombre, edad
    });
};

const usariosPut = (req, res = response)=> {

    const {id} = req.params;

    res.json({
        msg:'put API - controlador',
        id

    });
};

const usariosPatch = (req, res = response)=> {

    res.json({
        msg:'parch API - controlador'      
    });
};

const usariosDelete = (req, res = response)=> {

    res.json({
        msg:'delete API - controlador'      
    });
};






module.exports = {
    usariosGet,
    usariosPost,
    usariosDelete,
    usariosPatch,
    usariosPut
}