<template>
    <hr>
  <form class="form">
    <h3>Asiakastiedot</h3>
    <div class="form-group col-md-6">
      <label for="name">Nimi:</label>
      <input v-model="this.customer.name" type="text" class="form-control" id="name" />
    </div>
    <div class="form-group col-md-6">
      <label for="email">Sähköposti:</label>
      <input v-model="this.customer.email" type="email" class="form-control" id="email" />
    </div>
    <div v-if="$store.state.projects[0].id">
    <h3>Projektit</h3>
    <table id="projectTable" class="table table-striped">
        <tr>
            <th>#</th>
            <th>Nimi</th>
            <th>Alkaa</th>
            <th>Päättyy</th>
            <th></th>
        </tr>
        <tr v-for="project in $store.state.projects" :key="project.id">
            <th>{{ project.id }}</th>
            <td>{{ project.name }}</td>
            <td>{{ convertDate(project.starttime) }}</td>
            <td>{{ convertDate(project.endtime) }}</td>
            <td>
                <div @click=deleteProject(project.id) class="btn btn-danger pull-right">Poista</div>
            </td>
        </tr>
    </table>
    </div>
    <!--<div class="row">
        <div @click=addProject class="btn btn-success">+ Lisää projekti</div>
    </div>-->
    <div class="row">
        <div @click="cancelEdit" class="btn btn-warning pull-right">Peruuta</div>
        <div @click="editCustomer(this.customer.id)" class="btn btn-primary pull-right">Tallenna</div>
    </div>
  </form>


</template>

<script>
export default {
  props: ["customer"],
  data() {
    return {
     
    };
  },
  methods: {
      deleteProject(id) {
          this.$store.dispatch("deleteProject", id);
      },
      cancelEdit() {
          this.$store.dispatch("cancelEdit");
      },
      editCustomer(id) {
          var customer = {
              name: this.customer.name,
              email: this.customer.email,
              id: id
          }
          this.$store.dispatch("editCustomer", customer);
      },
      addProject() {
          alert('Add project')
      },
      convertDate(origdate) {
	    var date = origdate;
	    var dm = date.substr(0,date.indexOf(' ')); //Get date without time
	    var time = date.substr(date.indexOf(' ')+1); //Get time without date

	    var newtime = time.slice(0,-3);
	    var newdate = dm.split("-").reverse().join(".");
  
        date = newdate + " " + newtime;
        return date;
    }
  },
};
</script>

<style scoped>
 .table tr td {
     padding:5px;
 }
 .btn-warning {
     margin-left: 5px;
 }
</style>