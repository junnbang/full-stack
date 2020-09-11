<template>
  <div>
      <b-modal
        id="modal-itemForm"
        size="lg"
        header-bg-variant="info"
        header-text-variant="light"
        okTitle="Submit"
        :title="title"
        @show="resetModal"
        @hidden="resetModal"
        @ok="onSubmit"
        hide-footer
      >
        <form ref="form" @submit.prevent="onSubmit" class="itemForm">

        <span class="h4 text-info">Item Information</span>
        <hr />

        <b-form-group>
          <label>Item name<span class="text-danger">*</span></label>
          <b-input-group class="mb-2">
            <b-input-group-prepend is-text>
              <b-icon icon="box"></b-icon>
            </b-input-group-prepend>
            <b-form-input v-model="item.name" placeholder="Washing Machine" required></b-form-input>
          </b-input-group>
        </b-form-group>

        <b-form-row>
          <b-col>
            <b-form-group>
              <label>Quantity<span class="text-danger">*</span></label>
              <b-input-group class="mb-2">
                <b-input-group-prepend is-text>
                  <b-icon icon="collection"></b-icon>
                </b-input-group-prepend>
                <b-form-input v-model="item.quantity" type="number" min="1" placeholder="5" required></b-form-input>
              </b-input-group>
            </b-form-group>
            </b-col>

            <b-col>
            <b-form-group label="Price">
              <b-input-group class="mb-2">
                <b-input-group-prepend is-text>
                  <b-icon icon="cash"></b-icon>
                </b-input-group-prepend>
                <b-form-input v-model="item.price" type="number" step="0.01" min="0.01" placeholder="10.50"></b-form-input>
              </b-input-group>
            </b-form-group>
          </b-col>
        </b-form-row>

        <span class="h4 text-info">Seller Information</span>
        <hr />
      
        <b-form-row>
          <b-col>
            <b-form-group label="Name">
              <b-input-group class="mb-2">
                <b-input-group-prepend is-text>
                  <b-icon icon="person-circle"></b-icon>
                </b-input-group-prepend>
                <b-form-input v-model="item.seller_info.name" placeholder="Chloe"></b-form-input>
              </b-input-group>
            </b-form-group>
            </b-col>

            <b-col>
            <b-form-group label="Phone No.">
              <b-input-group class="mb-2">
                <b-input-group-prepend is-text>
                  <b-icon icon="telephone"></b-icon>
                </b-input-group-prepend>
                <b-form-input v-model="item.seller_info.phone" placeholder="91226666"></b-form-input>
              </b-input-group>
            </b-form-group>
          </b-col>
        </b-form-row>
        
        <span class="text-danger">* required</span>

        <hr />

        <b-form-row class="justify-content-end">
          <b-button variant="info" type="submit" class="mr-1">
            Submit
          </b-button>
          <b-button variant="secondary" @click="$bvModal.hide('modal-itemForm')">
            Cancel
          </b-button>
        </b-form-row>
        
      </form>
    </b-modal>
  </div>
</template>

<script>
var ItemForm = {
  name: 'ItemForm',
  props: {
    title: {
      type: String,
      required: true,
      default: ''
    }
  },
  data() {
    let dataObj = {
      item: {
        name: '',
        quantity: "",
        price: "",
        seller_info: {
          name: "",
          phone: ""
        }
      },
      inputError: []
    }
    
    return dataObj;
  },
   methods: {
      resetModal() {
        this.item = {
          name: '',
          quantity: "",
          price: "",
          seller_info: {
            name: "",
            phone: ""
          }
        }
      },
      onSubmit(e) {
        e.preventDefault();
        if (!this.$refs.form.checkValidity()) {
          return ;
        }

        this.$emit('add-item', this.item);
        this.$nextTick(() => {
          this.$bvModal.hide('modal-itemForm')
        })
      }
    }
};

export default ItemForm;
</script>

<style scoped>
.itemForm {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
