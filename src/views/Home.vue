<template>
  <div class="home container">
    <CustomerTable />
    <Alert v-if="$store.state.showAlert" />
  </div>
</template>

<script>
import CustomerTable from '../components/CustomerTable.vue'
import Alert from '../components/Alert.vue'

export default {
  name: 'Home',
  components: {
    CustomerTable,
    Alert
  }
}
</script>
