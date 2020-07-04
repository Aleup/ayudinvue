<template>
  <div class="container">
    <b-card class="text-center">
      <b-form-group label="Radio Buttons">
        <b-form-radio-group
          id="btn-radios-1"
          v-model="selected"
          :options="options"
          buttons
          @change="onChangeRadioForm"
          button-variant="outline-primary"
          name="radios-btn-default"
        ></b-form-radio-group>
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
      options: [
        { text: "Call Abount", value: "about" },
        { text: "Call Error", value: "error" }
      ],
      response: ""
    };
  },
  computed: {
    showAlert() {
      return this.response.length > 2 ? true : false;
    }
  },
  methods: {
    onChangeRadioForm(value) {
      this.selected = value;
      this.response = process.env.VUE_APP_MSG_WAITING;
      this.showForm = false;
      console.log(process.env.VUE_APP_BASE_URL + this.selected);
      axios
        .get(process.env.VUE_APP_BASE_URL + this.selected, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
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
