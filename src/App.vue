<template>
    <div class="page-container md-layout-row">
    <md-app>
      <md-app-toolbar class="md-primary">
        <span class="md-title">{{title}}</span>
      </md-app-toolbar>
      <md-app-content>
        <Store/>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
import Store from '@/components/Store'

export default {
  name: 'App',
  components: {
    Store
  },
  data: () => { return { title: 'Sample Store Vuex App' } }
}
</script>

<style>
#app {}
</style>
