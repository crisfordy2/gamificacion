
const express = require('express')
const cors = require('cors');
const mysql = require('mysql');
const myConnection = require('express-myconnection');



class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/usuarios';

        // Middelewares 
        this.middlewares();


        //rutas de la app
        this.routes();

        
    }

    middlewares(){

        //cors
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

        //Directoria publico
        this.app.use( express.static('public'));

        // conexion bd
        this.app.use(myConnection(mysql, {
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'gamificacion',
            port: 3306

        }, 'single'));


    }

    routes(){

        this.app.use(this.usuariosPath, require('../routes/usuarios'));

       
    }

    conexion(){        
        let connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'gamificacion',
        port: 3306
        });
        connection.connect(function(error){
        if(error){
            throw error;
        }else{
            console.log('Conexion correcta.');
        }
        });
        connection.end();
    }

    listen(){
         
        this.app.listen(this.port,()=>{
           console.log('Servidor corriendo puerto', this.port);
        });
    }
    
}

module.exports = Server;