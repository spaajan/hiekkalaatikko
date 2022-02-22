import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    customers: [],
    projects: [],
    showAlert: false
  },
  mutations: {
    getCustomers(state, customers) {
      state.customers = customers
    },
    getProjects(state, projects) {
      state.projects = projects
    },
    deleteProject(state, id) {
      state.projects = state.projects.filter((projects) => projects.id !==id)
    },
    editCustomer(state) {
      state.projects = []
      state.showAlert = !state.showAlert
    },
    cancelEdit(state) {
      state.projects = []
    },
    closeAlert(state) {
      state.showAlert = !state.showAlert
    }
  },
  actions: {
    getCustomers({ commit }) {
      axios.post('api/hiekkalaatikko/Models/Project.php', {
        request: 1,
      }).then(response => {
        commit('getCustomers', response.data)
      })
    },
    getProjects({ commit }, customer) {
      axios.post('api/hiekkalaatikko/Models/Project.php', {
        request: 2,
        id: customer.id
      }).then(response => {
        if(response.data == []) {
          var emptyData = [{"id":null,"name":"","customerid":"","starttime":"","endtime":""}]
          commit('getProjects', emptyData)
        } else {
          commit('getProjects', response.data)
        }
      })
    },
    deleteProject({ commit, dispatch }, id) {
      if(confirm('Haluatko varmasti poistaa projektin?')) {
        axios.post('api/hiekkalaatikko/Models/Project.php', {
          request: 3,
          id: id
        }).then(
          commit('deleteProject', id),
          dispatch('getCustomers')
        )
      }
    },
    editCustomer({ commit, dispatch }, customer) {
      axios.post('api/hiekkalaatikko/Models/Project.php', {
        request: 4,
        id: customer.id,
        name: customer.name,
        email: customer.email
      }).then(
        commit('editCustomer'),
        dispatch('getCustomers')
      )
    },
    cancelEdit({ commit }) {
      if(confirm('Haluatko varmasti keskeyttää muokkauksen?')) { 
        commit('cancelEdit')
      }  
    },
    closeAlert({ commit }) {
      commit('closeAlert')
    },
  },
  modules: {
  }
})
