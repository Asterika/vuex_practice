const store = new Vuex.Store({
  state: {
    loadingStatus: 'notloading',
    todos: []
  },
  mutations: {
    //takes the state of our loadingStatus
    //updates it
    SET_LOADING_STATUS(state, status) {
      state.loadingStatus = status
    },
    //takes state of todos and sets accordingly
    SET_TODOS(state, todos) {
      state.todos = todos
    }
  },
  actions: {
    //taking in context object contains properties of Vuex store and allows us to make mutations
    //1. commit loading status = sets loading status to loading
    fetchTodos(context) {
      context.commit('SET_LOADING_STATUS', 'loading'),
      //2. api call - when that call is returned, we'll commit the loading status mutation again, setting it to not loading
      axios.get('/api/todos').then(response => {
        context.commit('SET_LOADING_STATUS', 'notLoading')
        //3. finally, will commit set todos state with response we got from API call
        context.commit('SET_TODOS', response.data.todos)
      })
    }
  }
})

//if we need to only retrieve the todos labeled "done"/true,
//we can use a gettter, which will retrieve only the specific state we want
i.e.
const store = new Vuex.Store({
  state: {
    loadingStatus: 'notLoading',
    todos: [
      { id: 1, text: '...', done: false},
      { id: 2, text: '...', done: true},
      { id: 3, text: '...', done: true},
    ]
  },
  getters: {
    doneTodos(state) {
      return state.todos.filter(todo => todo.done)
    }
  }
})
