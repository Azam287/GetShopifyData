import "reflect-metadata";
import axios from "axios";
require('dotenv').config();


export default class productStoreDataFetch{


    instance: any = axios.create({
        baseURL: process.env.BASE_URL,
        headers: {
            'X-Shopify-Access-Token': process.env.ACCESS_TOKEN
        },
    });

    async fetchShopifyProduct(pageInfo, limit){
        let response:any = false;
        if(pageInfo){
            response = await this.instance({
                'method': "get",
                'url': pageInfo,
                'params':{
                    'limit':`${limit}`,
                }
            })
        }
        return response;
    }


}