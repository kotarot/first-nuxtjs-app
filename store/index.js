import Vuex from 'vuex'

import { v4 as uuidv4 } from 'uuid'

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      todos: [
        {content: 'Release', created: '2021-08-07 22:40', state: 'TODO', uuid: '00000000-0000-0000-0000-000000000004'}, 
        {content: 'Testing', created: '2021-08-07 22:30', state: 'TODO', uuid: '00000000-0000-0000-0000-000000000003'},
        {content: 'Implementation', created: '2021-08-07 22:20', state: 'DOING', uuid: '00000000-0000-0000-0000-000000000002'},
        {content: 'Design', created: '2021-08-07 22:10', state: 'DONE', uuid: '00000000-0000-0000-0000-000000000001'},
      ],
      states: [
        {id: 0, label: 'TODO'},
        {id: 1, label: 'DOING'},
        {id: 2, label: 'DONE'},
      ],
    }),
    mutations: {
      add: (state, obj) => {
        const d = new Date()
        const created = d.getFullYear()
          + '-' + ('00' + (d.getMonth() + 1)).slice(-2)
          + '-' + ('00' + d.getDate()).slice(-2)
          + ' ' + ('00' + d.getHours()).slice(-2)
          + ':' + ('00' + d.getMinutes()).slice(-2)
        const uuid = uuidv4()
        state.todos.unshift({
          content: obj.content,
          created: created,
          state: 'TODO',
          uuid: uuid,
        })
      },
      remove: (state, obj) => {
        for (let i = 0; i < state.todos.length; i++) {
          const todo = state.todos[i]
          if (todo.uuid == obj.uuid) {
            if (confirm('Are you sure to remove "' + todo.content + '"?')) {
              state.todos.splice(i, 1)
              return
            }
          }
        }
      },
      changeState: (state, obj) => {
        for (let i = 0; i < state.todos.length; i++) {
          const todo = state.todos[i]
          if (todo.uuid == obj.uuid) {
            let nowState;
            for (let j = 0; j < state.states.length; j++) {
              if (state.states[j].label == todo.state) {
                nowState = state.states[j].id
              }
            }
            nowState = (nowState + 1) % state.states.length
            obj.state = state.states[nowState].label
            return
          }
        }
      },
    },
  })
}

export default createStore
