const express = require('express')
const cors = require('cors');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const fileUpload = require("express-fileupload");



class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        // agregar path
        this.homePath = '/home';
        this.usuariosPath = '/usuarios';

        // Middelewares 
        this.middlewares();


        //rutas de la app
        this.routes();


    }

    middlewares() {

        //cors
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

        //Directoria publico
        this.app.use(express.static('public'));

        this.app.set('views', './views');
        this.app.set('view engine', 'ejs');

        // conexion bd
        this.app.use(myConnection(mysql, {
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'gamificacion',
            port: 3306,
            multipleStatements: true

        }, 'single'));
        
        this.app.use(express.urlencoded({ extended: false }));

        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/'
        }));
    }

    routes() {

        this.app.use(this.homePath, require('../routes/routeHome'));

        /*
        this.app.get('/about', (req, res)=>{
            res.render('about');
        });*/
    }


    listen() {

        this.app.listen(this.port, () => {
            console.log('Servidor corriendo puerto', this.port);
        });
    }

}

module.exports = Server;