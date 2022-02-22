<template>
  <div class="panel panel-default">
      <div class="panel-body">
          <h4><i class="fa-solid fa-check"></i> Muokkaus tallennettu onnistuneesti</h4>
          <div @click="closeAlert" class="btn btn-success">Sulje</div>
      </div>
  </div>
</template>

<script>
export default {
    methods: {
        closeAlert() {
            this.$store.dispatch("closeAlert");
        }
    }
}
</script>

<style scoped>
    .panel-default {
        width:30%;
        z-index: 999;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .panel-body {
        text-align: center;
    }
    .panel i {
        color: green
    }
</style>