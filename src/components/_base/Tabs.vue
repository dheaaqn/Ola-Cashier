<template>
  <div>
    <b-row>
      <b-col>
        <p class="tabsText">
          <span class="tabsTextBold">Menu</span> Category
        </p>
      </b-col>
      <b-col class="add-category">
        <b-button size="lg" variant="danger" @click="openModal">
          <b-icon icon="plus-square" variant="light" aria-hidden="true"></b-icon>
        </b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <div class="tabs-container">
          <b-row class="text-center" align-content="center">
            <b-col class="pb-2" v-for="(item, index) in category" :key="index">
              <b-button
                variant="light"
                @click="sortByCategory(item.category_id)"
              >{{item.category_name}}</b-button>
            </b-col>
          </b-row>
        </div>
      </b-col>
    </b-row>

    <b-modal ref="add-category-modal" centered hide-header hide-footer>
      <h3>Add Category</h3>
      <b-form-group>
        <b-row>
          <b-col sm="4">
            <label for="category-name">Category Name</label>
          </b-col>
          <b-col sm="8">
            <b-form-input
              id="category-name"
              placeholder="input category name"
              v-model="form.category_name"
            ></b-form-input>
          </b-col>
        </b-row>

        <b-row>
          <b-col sm="4">
            <label for="category-status">Category Status</label>
          </b-col>
          <b-col sm="8">
            <b-form-input id="category-status" placeholder="1" v-model="form.category_status"></b-form-input>
          </b-col>
        </b-row>
        <b-row text-center>
          <b-col cols="6">
            <b-button type="submit" class="mt-3" variant="danger" block @click="closeModal">Cancel</b-button>
          </b-col>
          <b-col cols="6">
            <b-button
              type="submit"
              class="mt-3"
              variant="success"
              block
              @click="addCategory()"
            >Add Category</b-button>
          </b-col>
        </b-row>
      </b-form-group>
    </b-modal>
  </div>
</template>

<style scoped>
.tabsText {
  font-size: 2em;
}

.tabsTextBold {
  font-weight: 600;
}

.add-category {
  text-align: right;
}

.tabs-container {
  height: 80px;
  background-color: #ffda6c;
  border-radius: 15px;
  align-content: center;
}
</style>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      category: [],
      form: {
        category_name: '',
        category_status: 1
      }
    }
  },
  created() {
    this.getCategory()
  },
  methods: {
    getCategory() {
      axios
        .get('http://127.0.0.1:3000/category')
        .then((res) => {
          this.category = res.data.data
          console.log(this.category)
        })
        .catch((err) => {
          return console.log(err)
        })
    },
    addCategory() {
      axios
        .post('http://127.0.0.1:3000/category', this.form)
        .then((res) => {
          this.$refs['add-category-modal'].hide()
          this.getCategory()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    sortByCategory(id) {
      console.log(id)
      this.$emit('categoryId', id)
    },
    openModal() {
      this.$refs['add-category-modal'].show()
    },
    closeModal() {
      this.$refs['add-category-modal'].hide()
    }
  }
}
</script>
