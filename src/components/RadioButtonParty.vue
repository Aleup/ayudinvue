<template>
  <div class="container">
    <b-card class="text-center">
      <b-form-group label="AyudinNodeJs">
        <b-form-radio
          v-model="selected"
          name="some-radios"
          @change="callAbout"
          value="error"
          >Call About</b-form-radio
        >
        <b-form-radio
          v-model="selected"
          name="some-radios"
          @change="callAbout"
          value="about"
          >Call Error</b-form-radio
        >
      </b-form-group>
      <b-alert class="align-left" variant="success" :show="showAlert">
        <span v-html="response" />
      </b-alert>
    </b-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "RadioButtonParty",
  props: {
    msg: String
  },
  data() {
    return {
      selected: "error",
      response: ""
    };
  },
  computed: {
    showAlert() {
      return this.response.length > 2 ? true : false;
    }
  },
  methods: {
    callAbout() {
      console.log(process.env.VUE_APP_BASE_URL + this.selected);
      axios
        .get(process.env.VUE_APP_BASE_URL + this.selected, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers":
              "Origin, X-Requested-With, Content-Type, Accept"
          },
          data: null
        })
        .then(response => {
          this.response =
            "<b>RANK:  </b>" +
            response.data.rank +
            "<br/>" +
            "<b>TAG:  </b>" +
            response.data.tag +
            "<br/>" +
            "<b>URL:  </b>" +
            response.data.url;
          console.log(this.response);
        })
        .catch(error => {
          this.response = error.message;
          console.log(error.message);
        });
    }
  }
};
</script>

<style scoped>
.align-left {
  text-align: left !important;
}
</style>
