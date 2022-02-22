<template>
    <h2>Asiakkaat</h2>
    <table class="table table-striped">
        <tr>
            <th>#</th>
            <th>Nimi</th>
            <th>Sähköposti</th>
            <th>Aktiivisia projekteja</th>
            <th></th>
        </tr>
        <tr v-for="customer in $store.state.customers" :key="customer.id">
            <th>{{ customer.id }}</th>
            <td>{{ customer.name }}</td>
            <td>{{ customer.email }}</td>
            <td>{{ customer.curprojects }}</td>
            <td><div class="btn btn-primary" @click=getProjects(customer)>Muokkaa</div></td>
        </tr>
    </table>
    <CustomerEdit v-if="$store.state.projects.length" :customer="this.customer" />
</template>

<script>
import CustomerEdit from "./CustomerEdit.vue"

export default {
    beforeCreate() {
    this.$store.dispatch("getCustomers");
  },
  data() {
      return {
          customer: [
              {
                id: '',
                name: '',
                email: '',
                curProjects: ''
              }
          ]
      }
  },
  components: {
      CustomerEdit
  },
  methods: {
      getProjects(customer) {
          this.customer.id = customer.id
          this.customer.name = customer.name
          this.customer.email = customer.email
          this.customer.curProjects = customer.curProjects
          this.$store.dispatch("getProjects", customer);
      }
  }
}
</script>

<style scoped>
 .table tr td {
     padding:5px;
 }
</style>