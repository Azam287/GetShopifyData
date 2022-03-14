
<template>

  <div class="hello">
    <div class="main-filter-container">
      <FilterWindow @getFilter="setFilter"/>
    </div>

    <div class="table-inner">

        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">Variants List</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">

                          <div>
                            <table class="table table-bordered">
                              <thead>
                              <tr>
                                <th scope="col">#</th>
                                <th scope="col">Id</th>
                                <th scope="col">Title</th>
                                <th scope="col">sku</th>
                              </tr>
                              </thead>
                              <tbody>
                              <tr v-for="(variantItem,index) in variantsProduct " :key="variantItem.id">
                                <td>{{index+1}}</td>
                                <td>{{variantItem.id}}</td>
                                <td>{{variantItem.title}}</td>
                                <td>{{variantItem.sku}}</td>
                              </tr>
                              </tbody>
                            </table>
                          </div>
              </div>

            </div>
          </div>
        </div>


      <table id="table" class="table table-striped table-hover">
          <thead id="tableTopics" class="table-dark">
          <tr>
            <th scope="col">S.No</th>
            <th scope="col">Id</th>
            <th scope="col">Product Name</th>
            <th scope="col">Status</th>
            <th scope="col">Create At</th>
            <th scope="col">Product Type</th>
            <th scope="col">Variants</th>
            <th scope="col">Vendor_Name</th>
            <th scope="col">Price</th>
            <th scope="col">View</th>
          </tr>
          </thead>
        <tbody>
        <tr v-for="(product,index) in productData" :key="product.id">
          <td>{{index+1}}</td>
          <td>{{product.id}}</td>
          <td>{{ product.title }}</td>
          <td>{{product.status}}</td>
          <td>{{product.created_at}}</td>
          <td>{{product.product_type}}</td>
          <td v-if="product.variants.length<=1" >{{product.variants.length}}</td>
<!--          <td v-else><button @click="showPopup(product)" class="btn btn-primary" data-bs-target="#staticBackdrop">More</button></td>-->
          <td v-else>
              <button @click="showPopup(product)" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                More
              </button>
          </td>
          <td>{{product.vendor}}</td>
          <td>{{product.price}}</td>
          <td><a v-bind:href="'https://searchtap-dev-ravneet.myshopify.com/products/'+product.handle" target="_blank">View</a></td>

        </tr>
        </tbody>
      </table>
      <TriggerLoad @triggerIntersected="loadMore" />
    </div>



<!--    <button v-on:click="getData">click</button>-->
  </div>
</template>

<script>
import TriggerLoad from "@/components/TriggerLoad";
// import VariantsPopUp from "@/components/VariantsPopUp";
import FilterWindow from "@/components/FilterWindow";

const axios = require('axios')

require('intersection-observer');

export default {
  name: 'HelloWorld',
  // components: {VariantsPopUp, TriggerLoad},
  components: { FilterWindow,TriggerLoad},
  props: {
    msg: String
  },
  data: function(){
    return {
      serialNo: 0,
      productData: [],
      page: 0,
      pageSize: 30,
      variantsProduct:[],
      productTypeFilter:"",
      minPrice:"",
      maxPrice:"",
      statusFilter:"",
      filterApplied:""
    }
  },
// created() {
//   this.getData()
//   },
//   methods:{
//     async getData() {
//       const dataProduct = await axios.get('http://localhost:3000/product?page_size=10&page=3').catch(e => console.log(e));
//       this.productData = dataProduct.data.data;
//
//     }
//   }
// }
//   async mounted() {
//     const dataProduct = await axios.get('http://localhost:3000/product?page_size=100&page=1').catch(e => console.log(e));
//     console.log("page: ",this.page);
//     this.productData = dataProduct.data.data;
//     this.variantsData = this.productData[0].variants;
//   },
  methods: {
    async loadMore() {
      this.page += 1;
      console.log("page: ",this.page)
      const dataProduct = await axios.get(`http://localhost:3000/product?page_size=${this.pageSize}&page=${this.page}${this.statusFilter}${this.productTypeFilter}${this.minPrice}${this.maxPrice}`).catch(e => console.log(e));
      this.productData = [...this.productData,...dataProduct.data.data];
    },
    showPopup(product) {
      this.variantsProduct = product.variants;
      // this.$bvModal.show('staticBackdrop');
    },
    setFilter(obj){
      // const statusParam = obj.checkedStatus.toString();
      // const productTypeParam = obj.checkedProductType.toString();
      // const filterCount = obj.noOfFilter;
      //
      // this.statusFilter = `&status=${statusParam}`;
      // this.productTypeFilter = `&product_type=${productTypeParam}`;

      // const filterCount = obj.noOfFilter;
      this.filterApplied = obj.noOfFilter;


      if(obj.noOfFilter){

        this.statusFilter = (obj.checkedStatus<=0) ? "":`&status=${obj.checkedStatus.toString()}`;
        this.productTypeFilter = (obj.checkedProductType<=0) ? "": `&product_type=${obj.checkedProductType.toString()}`;
        this.minPrice = (obj.rangeFilter.minValue!=null || obj.rangeFilter.minValue !=="") ?`&min_compare_at=${obj.rangeFilter.minValue}` : "";
        this.maxPrice = (obj.rangeFilter.maxValue!=null || obj.rangeFilter.maxValue !=="") ?`&max_compare_at=${obj.rangeFilter.maxValue}` : "";

        // if(obj.checkedStatus<=0){
        //   this.statusFilter = `&status=${obj.checkedStatus.toString()}`;
        // }


        // this.statusFilter = `&status=${obj.checkedStatus.toString()}`;
        // this.productTypeFilter = `&product_type=${obj.checkedProductType.toString()}`;
        // this.minPrice = `&min_compare_at=${obj.rangeFilter.minValue}`;
        // this.maxPrice = `&min_compare_at=${obj.rangeFilter.maxValue}`;

        this.page=0;
        this.productData=[];
        this.loadMore();
      }
      else{
        this.statusFilter="";
        this.productTypeFilter="";
        this.minPrice="";
        this.maxPrice="";
        this.page=0;
        this.productData=[];
        this.loadMore();
      }


      console.log("ProductData: ",this.productData);
      console.log("StatusFilter: ",this.statusFilter);
      console.log("productTypeFilter: ",this.productTypeFilter);
      console.log("minFilter: ",this.minPrice);
      console.log("minFilter: ",this.maxPrice);
      console.log("noOfFilter: ",this.filterApplied);
    }

  },
  // watch: {
  //   // whenever question changes, this function will run
  //   status() {
  //     this.statusFilter = `&status=${this.status}`
  //   }
  // }
}



</script>


<style scoped>

/**{*/
/*  padding: 0;*/
/*  margin: 0;*/
/*  box-sizing: border-box;*/
/*}*/

.main-filter-container{
  position: absolute;
  top: 0;
  margin-top: 10px;
}

/*h3 {*/
/*  margin: 40px 0 0;*/
/*}*/
/*ul {*/
/*  list-style-type: none;*/
/*  padding: 0;*/
/*}*/
/*li {*/
/*  display: inline-block;*/
/*  margin: 0 10px;*/
/*}*/
/*a {*/
/*  color: #42b983;*/
/*}*/
</style>
