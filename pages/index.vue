<template>
  <section class="container mx-auto">
    <div class="flex justify-center py-5">
      <h1 class="text-5xl">TODO List App</h1>
    </div>
    <div class="flex justify-center py-5">
      <div class="add-area">
        <input type="text" name="add-task" id="add-task" v-model="content" placeholder="Input a task">
        <button id="add-button" class="btn btn-add" @click="add">Add</button>
      </div>
    </div>
    <div class="flex justify-center py-5">
      <div class="filter">
        <button class="btn btn-filter" v-bind:class="{'btn-filter-is-active':filterAll}" @click="filter('ALL')">ALL</button>
        <button class="btn btn-filter" v-bind:class="{'btn-filter-is-active':!filterAll && (filterState == 'TODO')}" @click="filter('TODO')">TODO</button>
        <button class="btn btn-filter" v-bind:class="{'btn-filter-is-active':!filterAll && (filterState == 'DOING')}" @click="filter('DOING')">DOING</button>
        <button class="btn btn-filter" v-bind:class="{'btn-filter-is-active':!filterAll && (filterState == 'DONE')}" @click="filter('DONE')">DONE</button>
      </div>
    </div>
    <div class="flex justify-center py-5">
      <table class="table-auto lists">
        <thead>
          <tr>
            <th>Task</th>
            <th>Date</th>
            <th>Status</th>
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in displayTodos" :key="index">
            <td>{{ item.content }}</td>
            <td>{{ item.created }}</td>
            <td>
              <button class="btn"
                  v-bind:class="{
                  'btn-todo': item.state == 'TODO',
                  'btn-doing': item.state == 'DOING',
                  'btn-done': item.state == 'DONE'}"
                  @click="changeState(item)">
                {{ item.state }}
              </button>
            </td>
            <td><button class="btn btn-remove" @click="remove(item)">Remove</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
import {mapState} from 'vuex'

export default {
  data: () => {
    return {
      content: '',
      filterState: '',
      filterAll: true,
    }
  },
  computed: {
    ...mapState(['todos']),
    displayTodos: function() {
      if (this.filterAll) {
        return this.todos
      } else {
        let filtered = []
        this.todos.forEach(element => {
          if (element.state == this.filterState) {
            filtered.push(element)
          }
        })
        return filtered
      }
    },
  },
  methods: {
    add: function() {
      if (this.content != '') {
        this.$store.commit('add', {content: this.content})
        this.content = ''
      }
    },
    remove: function(item) {
      this.$store.commit('remove', item)
    },
    changeState: function(item) {
      this.$store.commit('changeState', item)
    },
    filter: function(filterState) {
      this.filterAll = (filterState == 'ALL')
      this.filterState = filterState
    },
  },
}
</script>

<style>
  #add-task {
    @apply shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight flex-grow;
  }

  .btn {
    @apply py-2 px-4 font-semibold rounded-lg shadow-md;
  }
  .btn-add {
    @apply text-white bg-blue-500 hover:bg-blue-600;
  }
  .btn-filter {
    @apply text-gray-500 border-gray-500 hover:bg-gray-200;
  }
  .btn-filter-is-active {
    @apply text-white bg-gray-500 hover:bg-gray-600;
  }
  .btn-todo {
    @apply text-green-500 border-green-500 hover:bg-green-100;
  }
  .btn-doing {
    @apply text-green-500 border-green-500 bg-green-100 hover:bg-green-200;
  }
  .btn-done {
    @apply text-white bg-green-500 hover:bg-green-600;
  }
  .btn-remove {
    @apply text-red-500 border-red-500 hover:bg-red-100;
  }

  table th, td {
    @apply py-2 px-4;
  }
</style>
