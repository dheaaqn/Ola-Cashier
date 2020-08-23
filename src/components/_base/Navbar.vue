<template>
  <div class="c-container">
    <b-navbar toggleable="lg" style="background-color: white;">
      <b-navbar-brand>
        <h3 class="colored-text">Ola!</h3>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-input-group size="md" class="mb-2">
            <b-form-input placeholder="Search"></b-form-input>
            <template v-slot:append>
              <b-button variant="danger">
                <b-icon variant="light" icon="search"></b-icon>
              </b-button>
            </template>
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

.navbar-brand h3 {
  font-weight: 800;
  font-size: 2em;
  width: 100%;
  line-height: 0.9em;
  cursor: pointer;
}

.colored-text {
  background-color: #eb3349;
  background-image: linear-gradient(
    45deg,
    #ca4246 16.666%,
    #e16541 16.666%,
    #e16541 33.333%,
    #f18f43 33.333%,
    #f18f43 50%,
    #8b9862 50%,
    #8b9862 66.666%,
    #476098 66.666%,
    #476098 83.333%,
    #a7489b 83.333%
  );
  background-clip: content-box;
  background-size: 100%;
  background-repeat: repeat;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: colored-text-simple-animation-rev 0.75s ease forwards;
}

.colored-text:hover {
  animation: colored-text-simple-animation 0.5s ease-in forwards;
}

@keyframes colored-text-simple-animation-rev {
  0% {
    background-size: 650%;
  }
  40% {
    background-size: 650%;
  }
  100% {
    background-size: 100%;
  }
}

@keyframes colored-text-simple-animation {
  0% {
    background-size: 100%;
  }
  80% {
    background-size: 650%;
  }
  100% {
    background-size: 650%;
  }
}
</style>
