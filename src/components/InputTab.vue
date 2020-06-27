<template>
  <div class="container">
    <b-card class="text-center">
      <b-form-group
        horizontal
        :label-cols="4"
        description="Dejame saber tu secretos."
        label="Escribe tu nombre"
      >
        <b-form-input v-model.trim="name"></b-form-input>
      </b-form-group>
    </b-card>
    <b-alert variant="success" :show="showAlert">Bienvenido {{ name }}</b-alert>
  </div>
</template>

<script>
export default {
  name: "InputTab",
  props: {
    msg: String
  },
  data() {
    return { name: "" };
  },
  computed: {
    showAlert() {
      return this.name.length > 2 ? true : false;
    }
  }
};
</script>
