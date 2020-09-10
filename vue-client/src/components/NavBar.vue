<template>
  <b-navbar toggleable="sm"  type="secondary" variant="light">
    <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>

    <b-navbar-brand>
      <img alt="logo" id="logo" src="../assets/logo.png">
    </b-navbar-brand>

    <b-collapse id="nav-text-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-text>
          <h3>{{title}}</h3>
        </b-nav-text>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
var NavBar = {
  props: {
    logo: String,
    title: String
  },
  data: function () {
    let dataObj = {};
    return dataObj;
  },
  computed: {},
  methods: {},
};

export default NavBar;
</script>

<style scoped>
</style>
