import "reflect-metadata";
// import {createConnection} from "typeorm";
import {User} from "./entity/User";
import storeProductData from "./jobs/Product";
import formProductConnection from "./database/Product";
require('dotenv').config();
// const axios = require('axios');

const Koa  = require('koa');
const route = require('koa-router');
const cross = require('koa2-cors');
// const log = require('koa-logger');


const app = new Koa();
const routs =route();



(async function (){

    const dbConnect = new formProductConnection();
    await dbConnect.createConnection().catch(error => console.log(error));
    await dbConnect.clearDatabase(User);


    const saveData = new storeProductData(`${process.env.BASE_URL}products.json`,250,dbConnect);
    // await saveData.init().catch(error => console.log(error));

    app.use(cross({
        origin: "*"
    }));

    routs.get('/product', async (ctx)=>{

        try{
            const limit = ctx.query.page_size || 50;
            const page = (ctx.query.page - 1)*limit || 1;
            const status = ctx.query.status;
            const productType = ctx.query.product_type;
            const minPrice = ctx.query.min_compare_at;
            const maxPrice = ctx.query.max_compare_at;

            const productsData : any = await saveData.getProductRecord(page, limit, status, productType, minPrice, maxPrice).catch(error=>console.log(error));
            ctx.body = {
                data: productsData.productDataList,
                count: productsData.count,
                totalPages: productsData.totalPages
            }


        }catch (e){
            console.log(e)
        }
    })

    app.use(routs.routes());

})().catch(error => console.log(error));

const server = app.listen(process.env.PORT,()=>{
        console.log(`server listening at ${process.env.PORT}`);
    }).on("error",error => console.log(error))

export default server;