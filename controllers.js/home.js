const {response, request} = require = require('express');


const homeGet = (req = request, res = response)=> {

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



module.exports = {
    homeGet   
}