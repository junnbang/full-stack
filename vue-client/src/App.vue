<template>
  <div id="app" fluid>
    <NavBar :title="title" :logo="image" />
    <b-container fluid>
      <b-col>
      </b-col>
    </b-container>
    <b-container fluid>
      <b-col>
        <h2 class="mt-3">My Inventory</h2>
        <hr />
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
    ItemList
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
          console.log(res);
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
</style>
