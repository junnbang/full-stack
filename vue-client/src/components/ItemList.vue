<template>
  <div>
    <b-table 
      sticky-header
      responsive
      striped 
      hover
      small
      show-empty
      outlined
      head-variant="light" 
      v-bind:items="items" 
      v-bind:fields="fields"
      >
      <template v-slot:cell(actions)="row">
        <b-button variant="outline-danger" v-on:click="deleteItem(row.item._id)">
          <b-icon icon="trash" variant="danger"></b-icon>
        </b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
var ItemList = {
  name: 'ItemList',
  props: {
    items: {
      type: Array,
      required: true,
      default: []
    }
  },
  data() {
    let dataObj = {
      fields: [
          {
            key: '_id',
            label: 'id',
            sortable: true
          },
          {
            key: 'name',
            label: 'Item Name'
          },
          {
            key: 'quantity',
            sortable: true
          },
          {
            key: 'price',
            label: 'Price ($)',
            sortable: true
          },
          {
            key: 'seller_info.name',
            label: "Seller's Name"
          },
          {
            key: 'seller_info.phone',
            label: "Seller's Phone"
          },
          {
            key: 'actions',
            label: "Actions"
          }
        ]
    }
    return dataObj;
  },
  methods: {
    deleteItem(itemId) {
      this.$emit('delete-item', itemId);
    }
  }
};

export default ItemList;
</script>

<style scoped>

</style>
