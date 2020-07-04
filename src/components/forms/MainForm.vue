<template>
  <div class="component-container">
      <div class="text-left">
          <b-form-group
            id="input-group-1"
            label="Ingresa Usuario:"
            label-for="input-1"
          >
            <b-form-input
              v-model="form.user"
              type="text"
              max="50"
              required
              placeholder="Ingrese usuario"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="input-group-2"
            label="Ingrese Mensaje:"
            label-for="input-2"
          >
            <b-form-input
              v-model="form.text"
              type="text"
              max="200"
              required
              placeholder="Ingrese mensaje"
            ></b-form-input>
          </b-form-group>
          <b-form-group>
          <b-button href="#" v-on:click="onSubmitForm" variant="primary">
            <div v-if="type == FORM_UPDATE">
              Update
            </div>
            <div v-else>
              Create
            </div>
          </b-button
          >
          <b-button href="#" v-on:click="onResetForm" variant="danger"
            >Reset</b-button
          >
          </b-form-group>
      </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MainForm",
  props: {
    mForm: Object,
    type: String
  },
  data() {
    return {
      response: "", 
      showFormResult: false,
      showMsgForm: false,
      msgForm: process.env.VUE_APP_MSG_WAITING,
      form: JSON.parse(JSON.stringify(this.mForm))
    };
  },
  computed: {
    showAlert() {
      return this.response.length > 2 ? true : false;
    }
  },
  methods: {
    onResetForm() {
      this.form = {
        user: "",
        text: "",
        id: null
      };
    },
    onSubmitForm() {
      if(this.type == this.FORM_UPDATE) {
        this.updateRecord();
      } else {
        this.insertRecord();
      }
    },
    insertRecord() {
      console.log("sending post: mysql-insert: " + JSON.stringify(this.form));
      this.showMsgForm = true;
      this.response = process.env.VUE_APP_MSG_WAITING

      axios
        .post(process.env.VUE_APP_BASE_URL + 'mysql-insert', {
          user: this.form.user,
          text: this.form.text
        })
        .then(response => {
          this.onResetForm();
          this.response = response.data;
          this.showMsgForm = false;
          console.log(response.data);
        })
        .catch(error => {
          this.onResetForm();
          this.response = error.message;
          this.showMsgForm = false;
          console.log(error.message);
        });
    },
    updateRecord() {
      console.log("sending put: mysql-update: " + JSON.stringify(this.form.id));
      axios
        .put(process.env.VUE_APP_BASE_URL + 'mysql-update' + '/' + this.form.id,{
          user: this.form.user,
          text: this.form.text,
        })
        .then(response => {
          this.response = response.data;
          console.log(this.response);
          this.$emit('clicked', this.form)
        })
        .catch(error => {
          this.onResetForm();
          this.response = error.message;
          console.log(error.message);
        });

    }
  }
};
</script>