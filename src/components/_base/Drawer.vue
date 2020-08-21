<template>
  <nav>
    <v-navigation-drawer v-model="drawer" app :width="120">
      <v-list-item v-for="item in items" :key="item.icon" link center>
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
      </v-list-item>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      items: [{ icon: 'mdi-view-dashboard' }, { icon: 'mdi-image' }]
    }
  }
}
</script>
