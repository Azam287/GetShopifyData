import "reflect-metadata";
import productStoreDataFetch from "../services/Product";
// import formProductConnection from "../database/Product";

export default class storeProductData{

    nextLink: any;
    limit: any;
    r:any;
    countBatch:number=1;
    dbConnection: any;

    constructor(pageInfo, limitInfo, dbObj) {
        this.nextLink = pageInfo;
        this.limit = limitInfo;
        this.dbConnection = dbObj;
    }


    async init(){

        // this.dbConnection = await new formProductConnection();
        const fetchData = await new productStoreDataFetch();



        do{
            this.r = await fetchData.fetchShopifyProduct(this.nextLink,this.limit);
            const headerLink = await this.r.headers.link;
            const match = await headerLink.match(/<[^;]+\/(\w+\.json[^;]+)>;\srel="next"/);
            this.nextLink = match ? match[1] : false;
            this.r.data.products.forEach(
                obj => {
                    let minPrice:any = Number.MAX_VALUE;

                    obj.variants.forEach(item => {
                        minPrice = Math.min(parseFloat(minPrice),parseFloat(item.price))
                        // if(minPrice < item.compare_at_price) minPrice =item.compare_at_price
                    })

                    const user = this.dbConnection.userRepo.create({

                        id: obj.id,
                        title: obj.title,
                        body_html: obj.body_html,
                        vendor: obj.vendor,
                        product_type: obj.product_type,
                        created_at: obj.created_at,
                        handle: obj.handle,
                        updated_at: obj.updated_at,
                        published_at: obj.published_at,
                        template_suffix: obj.template_suffix,
                        status: obj.status,
                        published_scope: obj.published_scope,
                        tags: obj.tags,
                        admin_graphql_api_id: obj.admin_graphql_api_id,

                        variants: obj.variants,

                        options: obj.options,

                        images: obj.images,

                        image: obj.image,

                        price: minPrice,
                    });
                    this.dbConnection.userRepo.save(user).catch(error => console.log(error));
                }
            )

            if(this.nextLink)
            {
                console.log(`+++++++++++++++++Batch ${this.countBatch++} Complete+++++++++++++++++++ `);
            } else {
                console.log('++++++++++++++++Fetching Data Done+++++++++++++++++++');
            }

        }while(this.nextLink)
    }


    async getProductRecord(page:number,limit:number, status:string, productType: string, minPrice: string, maxPrice:string){


        console.log("productType: ",productType);
        console.log("status: ",typeof(status));
        console.log("status: ",status);

        //Define Array list for multiple values
        let statusList = new Array();
        let productTypeList = new Array();


        //setting every undefine value to null and converting to list

        // if(typeof(status)==="undefined") status=null
        // else{
        //
        //     statusList = status.split(",");
        // }
        //
        // if(typeof(productType)==="undefined") productType=null
        // else{
        //     productTypeList = productType.split(",");
        // }
        //
        // if(typeof(minPrice)==="undefined") minPrice=null;
        // if(typeof(maxPrice)==="undefined") maxPrice=null;



        let count:number;
        let totalPages: number;
        // let productDataList:any;

        //making Query
        let dataQuery = await this.dbConnection.userRepo
            .createQueryBuilder("user")
            .select(["user.status","user.id","user.title","user.variants","user.created_at","user.product_type","user.vendor","user.handle","user.price"])




        //trying to make new Query(now running)
        if(status!=null && status){
            console.log("STATUS IF is running");
            statusList = status.split(",");
            await dataQuery
                .andWhere("user.status IN (:...statusId)",{statusId: statusList})

        }

        if(productType!=null && productType){
            console.log("PRODUCT TYPE IF is running");
            productTypeList = productType.split(",");
            await dataQuery
                .andWhere("user.product_type IN (:...productTypeId)",{productTypeId:productTypeList})
        }

        if(minPrice!=null && minPrice){
            console.log("MIN PRICE IF is running");
            await dataQuery
                .andWhere("user.price >= :minPriceId",{minPriceId: parseFloat(minPrice)})
        }

        if(maxPrice!=null && maxPrice){
            console.log("MAX PRICE IF is running");
            await dataQuery
                .andWhere("user.price <= :maxPriceId",{maxPriceId: parseFloat(maxPrice)})
        }




        const productDataList = await dataQuery
            .skip(page)
            .take(limit)
            .getMany()

        count = await dataQuery.getCount();
        totalPages = Math.round((count/limit)+1);

        return{
            productDataList,
            count,
            totalPages
        }


    }

}

