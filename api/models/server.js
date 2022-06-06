const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');


class Server{

    constructor(){

        this.app = express();
        this.port = process.env.PORT;
        this.path = {
            products: '/products',
            category: '/category',
            users: '/users',
            auth: '/auth',
            purchase: '/purchase',
            address: '/address'
        }


        this.dbConnect();

        this.middlewares();

        this.routes();
        

    }

    async dbConnect(){
        await dbConnection();
    }

    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'))

    }


    routes(){

        this.app.use(this.path.auth, require('../routes/auth'));
        this.app.use(this.path.category, require('../routes/category'));
        this.app.use(this.path.products, require('../routes/products'));
        this.app.use(this.path.users, require('../routes/users'));
        this.app.use(this.path.purchase, require('../routes/purchase'));
        this.app.use(this.path.address, require('../routes/address'));

    }
    

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Server working on port', process.env.PORT)
        })
    }


}


module.exports = Server;