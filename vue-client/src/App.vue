<template>
  <div id="app" fluid>
    <NavBar :title="title" :logo="image" />
    
    <ItemForm 
      title="Add a record"
      v-on:add-item="addItem"
      />

    <b-container fluid>
      <b-col>
        <b-row>
          <b-col>
            <h2 class="mt-3">My Inventory</h2>
          </b-col>
          <b-col class="text-right align-self-center">
            <b-button variant="outline-success" v-b-modal.modal-itemForm>
              <b-icon icon="plus-square" aria-hidden="true"></b-icon> Add a record
            </b-button>
          </b-col>
        </b-row>
      </b-col>
      <b-col>
        <ItemList 
          v-bind:items="items"
          v-on:delete-item="deleteItem"
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

var app = {
  name: "App",
  data() {
    let dataObj = {
      title: "Dashboard",
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
    addItem: function(item) {
      axios
        .post(config.SERVER_URL + "/api/items", item)
        .then(res => {
          console.log(res);
          if (res.status == 200 && res.data.data) {
            let createdItem = res.data.data;
            var addedMessage = item.name + " has been added. (Quantity: " + item.quantity + ")";
            let newItem = {
              _id: createdItem._id,
              name: createdItem.name,
              quantity: createdItem.quantity,
              price: createdItem.price,
              seller_info: createdItem.seller_info
            }
            this.items.push(newItem);
            this.makeToast('info', addedMessage);
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
