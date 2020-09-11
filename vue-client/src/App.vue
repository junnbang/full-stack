<template>
  <div id="app" fluid>
    <NavBar :title="title" :logo="image" />
    
    <ItemForm 
      :title="formTitle"
      :onSubmitForm="onSubmitForm"
      :formItem="formItem"
    />

    <b-container fluid>
      <b-col>
        <b-row>
          <b-col>
            <h2 class="mt-3">My Inventory (Total Records: {{totalRecords}})</h2>
          </b-col>
          <b-col class="text-right align-self-center">
            <b-button variant="outline-dark" v-on:click="addSampleItem" class="mr-1">
              <b-icon icon="plus-square" aria-hidden="true"></b-icon> Add a Sample Record
            </b-button>
            <b-button variant="outline-success" v-on:click="openAddForm">
              <b-icon icon="plus-square" aria-hidden="true"></b-icon> Add a Record
            </b-button>
          </b-col>
        </b-row>
      </b-col>
      <b-col>
        <ItemList 
          v-bind:items="items"
          v-on:delete-item="deleteItem"
          v-on:edit-item="openEditForm"
        />
      </b-col>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios';

import config from './config';
import ItemList from './components/ItemList.vue';
import ItemForm from './components/ItemForm.vue';
import NavBar from './components/NavBar';

const ADD_FORM = 0;
const EDIT_FORM = 1;

var app = {
  name: "App",
  data() {
    let dataObj = {
      title: "Dashboard",
      formTitle: "",
      formItem: {
        name: '',
        quantity: "",
        price: "",
        seller_info: {
          name: "",
          phone: ""
        }
      },
      formType: ADD_FORM,
      image: "../assets/logo.png",
      items: []
    };
    return dataObj;
  },
  components: {
    NavBar,
    ItemList,
    ItemForm
  },
  methods: {
    onSubmitForm: function(info) {
      if (this.formType == ADD_FORM) {
        return this.addItem(info);
      } else if (this.formType == EDIT_FORM) {
        return this.editItem(info);
      }

      return null;
    },
    openEditForm: function(item) {
      this.formType = EDIT_FORM;
      this.formTitle = "Edit a record";
      this.formItem = item;
      this.$bvModal.show('modal-itemForm');
    },
    openAddForm: function() {
      let emptyItem = {
        name: '',
        quantity: "",
        price: "",
        seller_info: {
          name: "",
          phone: ""
        }
      };
      this.formType = ADD_FORM;
      this.formTitle = "Add a record";
      this.formItem = emptyItem;
      this.$bvModal.show('modal-itemForm');
    },
    getAllItems: function() {
      axios
        .get(config.SERVER_URL + "/api/items", config.options)
        .then(res => {
          this.items = res.data.data;
        })
        .catch(err => {
          console.log(err);
        })
    },
    deleteItem: function(id) {
      axios
        .delete(config.SERVER_URL + "/api/items/" + id)
        .then(res => {
          if (res.status == 200 && res.data.data.deletedCount == 1) {
            var deleteMessage = "Item (ID: " + id + ") has been deleted.";
            this.items = this.items.filter(item => item._id != id);
            this.makeToast('info',deleteMessage);
          }
        })
        .catch(err => {
          console.log(err);
        })
    },
    addSampleItem: function() {
      let itemNameList = ["Sofa", "Washing Machine", "Television", "iPhone", "Air-Conditioner" ];
      let nameList = ["Chloe", "Johnson", "Alex", "Erwin", "Louis"];
      let newItem = {
        name: itemNameList[Math.floor(Math.random() * itemNameList.length)],
        quantity: Math.floor(Math.random() * 10) + 1,
        price: Math.floor(Math.random() * 1000) + 1000,
        seller_info: {
          name: nameList[Math.floor(Math.random() * nameList.length)],
          phone: 80000000 + Math.floor(Math.random() * 10000000)
        }
      };

      axios
        .post(config.SERVER_URL + "/api/items", newItem)
        .then(res => {
          if (res.status == 200 && res.data.data) {
            var addedMessage = newItem.name + " has been added. (Quantity: " + newItem.quantity + ") [SAMPLE DATA]";
            var sampleItem = res.data.data;
            this.items.push(sampleItem);
            this.makeToast('success', addedMessage);
          } else {
            let errorMessage = res.data.message;
            this.makeToast('danger', errorMessage);
          }
        });
    },
    addItem: function(item) {
      axios
        .post(config.SERVER_URL + "/api/items", item)
        .then(res => {
          if (res.status == 200 && res.data.data) {
            let createdItem = res.data.data;
            var addedMessage = createdItem.name + " has been added. (Quantity: " + createdItem.quantity + ")";
            let newItem = {
              _id: createdItem._id,
              name: createdItem.name,
              quantity: createdItem.quantity,
              price: createdItem.price,
              seller_info: createdItem.seller_info
            }
            this.items.push(newItem);
            this.makeToast('info', addedMessage);
          } else {
            let errorMessage = res.data.message;
            this.makeToast('danger', errorMessage);
          }
        })
    },
    editItem: function(item) {
      axios
        .put(config.SERVER_URL + "/api/items/" + item._id, item)
        .then( res => {
          if (res.status == 200 && res.data.data) {
            let updatedItem = res.data.data;
            let newItem = {
              _id: updatedItem._id,
              name: updatedItem.name,
              quantity: updatedItem.quantity,
              price: updatedItem.price,
              seller_info: updatedItem.seller_info
            }

            var foundIndex = this.items.findIndex(item => item._id == newItem._id);
            this.items.splice(foundIndex, 1, newItem);
            
            var updatedMessage = "Item (ID: " + newItem._id + ") has been updated.";
            this.makeToast('info', updatedMessage);
          } else {
            let errorMessage = res.data.message;
            this.makeToast('danger', errorMessage);
          }
        })
    },
    makeToast(variant = null, message) {
      this.$bvToast.toast(message, {
        title: 'Notification',
        variant: variant,
        solid: true
      })
    }
  },
  mounted() {
    this.getAllItems();
  },
  computed: {
    totalRecords: function() {
      return this.items.length;
    }
  }
};

export default app;
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#logo {
  height: 60px;
  width: 60px;
}
.right-middle {
  text-align: center;
}
</style>
