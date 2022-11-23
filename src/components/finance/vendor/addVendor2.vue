<template>
  <div class="mg-l-20">
    <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
    <div class="heading">
      <span class="mg-l-25">Vendor Catalog Details</span>
    </div>
    <el-card shadow="none" :rules="rules">
    <div v-for="(catalog, index) in catalogs" :key="index">
      <el-row class="mb10">
        <el-col :span="window.width > 767 ? 5 : 24">
          <e-input  v-model="catalog.name" type="textarea" label="Item name" placeholder="Enter Item Name" rules="required"></e-input>
        </el-col>
        <el-col :span="window.width > 767 ? 5 : 24" :offset="window.width > 767 ? 1 : 0">
          <e-input  v-model="catalog.description" type="textarea" label="Description" placeholder="Enter Description" rules="required"></e-input>
        </el-col>
        <el-col :span="window.width > 767 ? 4 : 24" :offset="window.width > 767 ? 1 : 0">
          <span class="tx-16">Catagory</span><br />
          <el-select v-model="catalog.category_id" placeholder="select" rules="required">
            <el-option v-for="item in categories" :key="item.id" :label="item.name" :value="item.id" rules="required" />
          </el-select>
        </el-col>
        <el-col :span="window.width > 767 ? 3 : 24" :offset="window.width > 767 ? 1 : 0">
          <e-input  v-model="catalog.price" type="textarea" label="Cost" placeholder="Enter Cost" rules="required"></e-input>
        </el-col>
        <el-col :span="window.width > 767 ? 1 : 24" :offset="window.width > 767 ? 1 : 0">
          <br />
          <img style="margin-top: 5px" src="@/assets/images/custom-del-icon.png" alt="" @click="remove()" />
        </el-col>
      </el-row>
    </div>
    <e-button @click="addMore()" label='Add Item' :plain='true' icon='el-icon-plus'></e-button>
    <br/><br/>
    </el-card>
      <el-row class="text-right" :style="window.width > 767 ? 'border-top: 1px solid #fcdfbd; margin-top: 20px' : 'border-top: 1px solid #fcdfbd; padding-top: 20px'">
        <e-button :span="window.width > 767 ? 18 : 12" label="Cancel" width="180" type="text" :class="window.width > 767 ? 'p-45 cancel-button-margin' : ''" @click="cancel()" />
        <e-button :span="window.width > 767 ? 3 : 12" label="Create" width="180" @click="handleSubmit(onSubmit())" css="float-right" :class="window.width > 767 ? 'p-45' : ''" />
      </el-row>
    </ValidationObserver>
  </div>
</template>
<script>
import { dispatchGraphql } from "@/api/dispatcher"
import screenSize from '@/mixins/screenSize'
export default {
  props: {
    vendorId: {
      type: String,
      default: null
    }
  },
  mixins: [screenSize],
  data() {
    return {
      rules: {},
      categories: {},
      categoryId:'',
      catalogs: [{name: null, price: null, description: null, vendor_id: this.vendorId, category_id: null}],
      mutation: `mutation($objects: [catalogs_insert_input!]!) {
        insert_catalogs(objects: $objects) {
          affected_rows
          returning {
            id
          }
        }
      }`
    };
  },
  created() {
    this.getcategories()
  },
  methods: {
    remove() {
      this.catalogs.pop()
    },
    addMore() {
      this.catalogs.push({
        name: null,
        price: null,
        description: null,
        vendor_id: this.vendorId,
        category_id: null
      })
    },
    getcategories() {
      const query=`query {
        categories {
          name
          id
        }
      }`
      dispatchGraphql(query).then((response) => {
        this.categories = response.categories
      })    
    },
    getVariables() {
      return {
        'objects': this.catalogs
      }
    },
    onSubmit() {
      dispatchGraphql(this.mutation, this.getVariables()).then((response) => {
        console.log(response)
        this.$router.push(this.$url.FI_VENDOR)
      })
    },
  }
}
</script>
<style scoped>
@media only screen and (device-width: 768px) {
  .cancel-button-margin {
    margin-right: 57px;
  }
}
</style>