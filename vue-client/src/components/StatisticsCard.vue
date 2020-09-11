<template>
  <b-card class="col-xl-3 col-sm-6 col-12 m-1">
    <b-row no-gutters>
      <b-col md="2" class="align-self-center">
        <b-icon :icon="iconName" font-scale="5" :style="{color: iconColor}"></b-icon>
      </b-col>
      <b-col md="10" class="text-right">
        <h3 class="display-4">{{statNo}}</h3>
        <span>{{description}}</span>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
var StatisticsCard = {
  name: "StatisticsCard",
  props: {
    iconName: String,
    iconColor: String,
    statNo: Number,
    description: String
  }
}
export default StatisticsCard;
</script>

<style scoped>
</style>
