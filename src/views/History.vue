<template>
  <div class="bv-example-row">
    <b-row align-v="start">
      <b-col cols="1">
        <Drawer />
      </b-col>
      <b-col cols="11">
        <b-row>
          <b-col>
            <b-card no-body class="overflow-hidden" style="max-width: 540px;">
              <b-row no-gutters>
                <b-col>
                  <b-card-body title="Horizontal Card">
                    <b-card-text>Today's Income</b-card-text>
                  </b-card-body>
                </b-col>
              </b-row>
            </b-card>
          </b-col>
          <b-col>
            <b-card no-body class="overflow-hidden" style="max-width: 540px;">
              <b-row no-gutters>
                <b-col>
                  <b-card-body title="Horizontal Card">
                    <b-card-text>Orders</b-card-text>
                  </b-card-body>
                </b-col>
              </b-row>
            </b-card>
          </b-col>
          <b-col>
            <b-card no-body class="overflow-hidden" style="max-width: 540px;">
              <b-row no-gutters>
                <b-col>
                  <b-card-body title="Horizontal Card">
                    <b-card-text>This Year's Income</b-card-text>
                  </b-card-body>
                </b-col>
              </b-row>
            </b-card>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-card no-body class="overflow-hidden">
              <b-row no-gutters>
                <b-col>
                  <b-card-body title="Revenue">
                    <b-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris congue, mi sit amet condimentum molestie, diam turpis euismod magna, et ultricies tellus nulla vitae lorem. Vivamus ac scelerisque lorem. Ut in ipsum eu ligula elementum feugiat id vel eros. Praesent nisl libero, efficitur a maximus et, hendrerit vel eros. Phasellus interdum id ex sed maximus. Curabitur tempor mauris vitae velit molestie, eu pulvinar nulla egestas. Curabitur condimentum sapien at tincidunt dapibus.</b-card-text>
                  </b-card-body>
                </b-col>
              </b-row>
            </b-card>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-card no-body class="overflow-hidden">
              <b-row no-gutters>
                <b-col>
                  <b-card-body title="Recent Order">
                    <b-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris congue, mi sit amet condimentum molestie, diam turpis euismod magna, et ultricies tellus nulla vitae lorem. Vivamus ac scelerisque lorem. Ut in ipsum eu ligula elementum feugiat id vel eros. Praesent nisl libero, efficitur a maximus et, hendrerit vel eros. Phasellus interdum id ex sed maximus. Curabitur tempor mauris vitae velit molestie, eu pulvinar nulla egestas. Curabitur condimentum sapien at tincidunt dapibus.</b-card-text>
                  </b-card-body>
                </b-col>
              </b-row>
            </b-card>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script>
// @ is an alias to /src
import Drawer from '../components/_base/Drawer'

export default {
  name: 'Home',
  components: {
    Drawer
  }
}
</script>

<style scoped>
.bv-example-row {
  padding: 0;
  margin: 0;
  height: 100vh;
  overflow: hidden;
}

.col-1 {
  padding: 0;
}

.col-11 {
  background-color: #fafafa;
  padding: 0;
}
</style>
