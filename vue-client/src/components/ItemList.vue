<template>
  <div>
    <b-table 
      sticky-header
      striped
      show-empty
      head-variant="dark" 
      v-bind:items="items" 
      v-bind:fields="fields"
      >
      <template v-slot:cell(actions)="row">
        <b-button variant="outline-success" v-on:click="editItem(row.item)">
          <b-icon icon="pencil-square"></b-icon>
        </b-button>
        <b-button variant="outline-danger" v-on:click="deleteItem(row.item._id)">
          <b-icon icon="trash"></b-icon>
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
    },
    editItem(item) {
      this.$emit('edit-item', item);
    }
  }
};

export default ItemList;
</script>

<style scoped>

</style>
