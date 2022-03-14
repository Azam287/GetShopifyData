<template>

  <div class="filter-container">
    <div class="status-filter-container">
      <div class="status-title-container">
        <span>Filter</span>
      </div>

      <div class="filter-list-container">
        <div class="status-inner-container">
          <div class="status-check-container">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="active" value="active" v-on:change="passFilter" v-model="filterData.checkedStatus">
              <label class="form-check-label" for="active">
                Active
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="unactive" value="unactive" v-on:change="passFilter" v-model="filterData.checkedStatus">
              <label class="form-check-label" for="unactive">
                Unactive
              </label>
            </div>
          </div>
          <!--        <button type="button" class="btn btn-primary" @click.prevent="passFilter"> Apply</button>-->
        </div>
        <div class="product-type-filter-container">
          <div class="product-type-filter-inner-container">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="toys" value="TOYS" v-on:change="passFilter" v-model="filterData.checkedProductType">
              <label class="form-check-label" for="toys">
                Toys
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="toys2" value="TOYS2" v-on:change="passFilter" v-model="filterData.checkedProductType">
              <label class="form-check-label" for="toys2">
                Toys2
              </label>
            </div>
          </div>

          <!--      <button type="button" class="btn btn-primary" @click.prevent="passFilter"> Apply</button>-->
        </div>


      </div>
      <div class="range-filter-container">
        <div class="range-filter-inner-container">
          <div class="form-check" v-for="obj in productPriceList" :key="obj">
            <input class="form-check-input" type="checkbox" v-bind:id="obj" v-bind:value="obj" v-on:change="passFilter" v-model="filterData.selectedRange">
            <label class="form-check-label" v-bind:for="obj">
              {{obj.minValue}}-{{obj.maxValue}}
            </label>
          </div>
<!--          {{filterData.selectedRange}}-->
        </div>
      </div>

    </div>



  </div>



</template>

<script>
export default {
  name: "FilterWindow",
  data:function (){
    return{
      filterData:{
        checkedStatus: [],
        checkedProductType:[],
        selectedRange:[],
        rangeFilter:{
          minValue:"",
          maxValue:""
        },
        noOfFilter:false,
      },
      productPriceList:[
        {

          minValue:0,
          maxValue:10
        },
        {
          minValue:11,
          maxValue:50
        },
        {
          minValue:51,
          maxValue:100
        },
        {
          minValue:101,
          maxValue:500
        },
        {
          minValue:501,
          maxValue:1000
        },
        {
          minValue:1001,
          maxValue:5000
        },
        {
          minValue:5001,
          maxValue:10000
        }
      ]
    }
  },
  methods:{
    passFilter()
    {
      if(this.filterData.checkedStatus.length!=0 || this.filterData.checkedProductType.length!=0 || this.filterData.rangeFilter.minValue!=0 ||this.filterData.rangeFilter.maxValue!="" || this.filterData.selectedRange.length !=0){
        this.filterData.noOfFilter = true;

        let minPrice = Number.MAX_VALUE;
        let maxPrice = Number.MIN_VALUE;

        if(this.filterData.selectedRange.length>0){
          console.log("++++++++++++")
          this.filterData.selectedRange.forEach(obj => {
            minPrice = Math.min(minPrice,obj.minValue);
            minPrice = Math.min(minPrice,obj.maxValue);
            maxPrice = Math.max(maxPrice,obj.minValue);
            maxPrice = Math.max(maxPrice,obj.maxValue);
          })
          // console.log('MinValue: ',minPrice);
          // console.log('MaxValue: ',maxPrice);
          this.filterData.rangeFilter.minValue = minPrice;
          this.filterData.rangeFilter.maxValue = maxPrice;

          console.log('MinValue: ',this.filterData.rangeFilter.minValue);
          console.log('MaxValue: ',this.filterData.rangeFilter.maxValue);

        }
        else{
          this.filterData.rangeFilter.minValue="";
          this.filterData.rangeFilter.maxValue="";
        }

      }
      else{
        console.log("FFFAAALLSSE");
        this.filterData.noOfFilter = false;
      }

      console.log("getFilterFalseORTrue: ",this.filterData.noOfFilter)



      this.$emit('getFilter',this.filterData)
    }
  },
  // watch:{
  //   filterData() {
  //     this.filterData.noOfFilter = this.filterData.checkedStatus.length + this.filterData.checkedProductType;
  //   }
  // }
}
</script>

<style scoped>
/*.filter-container{*/
/*  !*width: 10%;*!*/
/*}*/

.status-filter-container{
  display: flex;
}

.status-check-container, .product-type-filter-inner-container {
  font-size: 14px;
  padding: 15px 20px;
  border: 2px solid #ddcfc5;
  margin: 10px 0px;
}

.range-filter-container{
  font-size: 14px;
  padding: 15px 20px;
  border: 2px solid #ddcfc5;
  margin: 10px 0px;
}

.filter-list-container{
  display: flex;
}

.status-inner-container {
  margin-right: 16px;
}
.product-type-filter-container {
  margin-right: 16px;
}




</style>