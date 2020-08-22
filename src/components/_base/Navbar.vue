<template>
  <div class="c-container">
    <b-navbar toggleable="lg" style="background-color: white;">
      <b-navbar-brand>Ola!</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-input-group size="md" class="mb-2">
            <b-form-input placeholder="Search"></b-form-input>
            <b-input-group-append is-text>
              <b-icon icon="search"></b-icon>
            </b-input-group-append>
          </b-input-group>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  components: {}
}
</script>

<style scoped>
.c-container {
  width: 100%;
}
</style>
