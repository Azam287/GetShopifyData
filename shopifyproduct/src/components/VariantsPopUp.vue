<template>


<!--  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">-->
<!--    More-->
<!--  </button>-->

  <!-- Modal -->
<!--  <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">-->
<!--    <div class="modal-dialog">-->
<!--      <div class="modal-content">-->
<!--        <div class="modal-header">-->
<!--          <h5 class="modal-title" id="staticBackdropLabel">Variants List</h5>-->
<!--          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>-->
<!--        </div>-->
<!--        <div class="modal-body">-->

<!--                    <div>-->
<!--                      <table class="table table-bordered">-->
<!--                        <thead>-->
<!--                        <tr>-->
<!--                          <th scope="col">#</th>-->
<!--                          <th scope="col">Id</th>-->
<!--                          <th scope="col">Title</th>-->
<!--                          <th scope="col">sku</th>-->
<!--                        </tr>-->
<!--                        </thead>-->
<!--                        <tbody>-->
<!--                        <tr v-for="(variantItem,index) in variantList " :key="variantItem.id">-->
<!--                          <td>{{index+1}}</td>-->
<!--                          <td>{{variantItem.id}}</td>-->
<!--                          <td>{{variantItem.title}}</td>-->
<!--                          <td>{{variantItem.sku}}</td>-->
<!--                        </tr>-->
<!--                        </tbody>-->
<!--                      </table>-->
<!--                    </div>-->
<!--        </div>-->

<!--      </div>-->
<!--    </div>-->
<!--  </div>-->



  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
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
              <tr v-for="(variantItem,index) in variantList " :key="variantItem.id">
                <td>{{index+1}}</td>
                <td>{{variantItem.id}}</td>
                <td>{{variantItem.title}}</td>
                <td>{{variantItem.sku}}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
export default {
  name: "VariantsPopUp",
  props:['variantList'],

  created() {
    console.log(this.variantList);
  }

}
</script>

<style scoped>
body {
  background: #eee
}

/*.height {*/
/*  height: 100vh*/
/*}*/
</style>