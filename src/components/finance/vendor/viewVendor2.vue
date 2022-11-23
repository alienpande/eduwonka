<template>
  <div>
    <div class="heading">Vendor Catalog Details</div>
    <el-card shadow="none">
      <el-row>
        <el-col :span="window.width > 767 ? 3 : 4">
          <div class="label">Item name</div>
        </el-col>
        <el-col :span="window.width > 767 ? 6 : 8" :offset="1">
          <div class="label">Description</div>
        </el-col>
        <el-col :span="window.width > 767 ? 3 : 6" :offset="1">
          <div class="label">Catagory</div>
        </el-col>
        <el-col :span="window.width > 767 ? 2 : 3" :offset="1">
          <div class="label">Cost</div>
        </el-col>
      </el-row>
      <div v-for="catalog in catalogs" :key="catalog.id">
        <el-row>
          <el-col :span="window.width > 767 ? 3 : 4">
            <div class="label-text">{{ catalog.name }}</div>
          </el-col>
          <el-col :span="window.width > 767 ? 6 : 8" :offset="1">
            <div class="label-text">{{ catalog.description }}</div>
          </el-col>
          <el-col :span="window.width > 767 ? 3 : 6" :offset="1">
            <div class="label-text">{{ catalog.category.name }}</div>
          </el-col>
          <el-col :span="window.width > 767 ? 2 : 3" :offset="1">
            <div class="label-text">{{ catalog.price }}</div>
          </el-col>
        </el-row>
      </div>
      <br/>
      <div v-for="(catalog,index) in newCatalogs" :key="index">
        <el-row>
          <el-col :span="window.width > 767 ? 3 : 4">
            <e-input v-model="catalog.name" type="textarea" />
          </el-col>
          <el-col :span="window.width > 767 ? 6 : 8" :offset="1">
            <e-input v-model="catalog.description" type="textarea" />
          </el-col>
          <el-col :span="window.width > 767 ? 3 : 6" :offset="1">
            <!-- <e-select label="Catagory"></e-select> -->
            <el-select v-model="catalog.category_id" placeholder="select" >
              <el-option v-for="item in categories" :key="item.id" :label="item.name" :value="item.id" />
           </el-select>
          </el-col>
          <el-col :span="window.width > 767 ? 2 : 3" :offset="1">
            <e-input v-model="catalog.price" type="textarea" />
          </el-col>
          <el-col :span="window.width > 767 ? 1 : 23" :offset="1">
            <br />
            <img style="margin-top: 5px" src="@/assets/images/custom-del-icon.png" alt="" @click="remove()" />
          </el-col>
        </el-row>
      </div>
      <e-button @click="addMore()" label="Add Item" :plain="true" icon="el-icon-plus" />
      <br /><br />
    </el-card>
    <el-row style="border-top: 1px solid #fcdfbd; margin-top: 20px">
      <el-col style="float: right" :span="3" :offset="6">
        <e-button :span="3" label="Save and Proceed" width="180" @click="save()" css="float-right" class="p-45" />
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { dispatchGraphql } from "@/api/dispatcher"
import screenSize from '@/mixins/screenSize'
export default {
  mixins: [screenSize],
  props: {
    vendor: {
      type: Object,
      default: () => ({})
    },
    catalogs: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {
      categories: {},
      newCatalogs: [{ name: null, price: null, description: null, vendor_id: this.vendor.id, category_id: null }],
    }
  },
  created() {
    this.getCategories()
  },
  methods:{
    remove() {
      this.newCatalogs.pop()
    },
    addMore() {
      this.newCatalogs.push({
        name: null,
        price: null,
        description: null,
        vendor_id: this.vendor.id,
        category_id: null
      })
    },
    getCategories() {
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
        'objects': this.newCatalogs
      }
    },    
    save() {
      const mutation = `mutation($objects: [catalogs_insert_input!]!) {
        insert_catalogs(objects: $objects) {
          returning {
            id
          }
        }
      }`      
      dispatchGraphql(mutation, this.getVariables()).then((response) => {
        console.log(response)
        this.$emit('save')
      })
    },
  }
};
</script>
<style>
.label-text {
  color: #00000099;
  font-size: 16px;
}
</style>
