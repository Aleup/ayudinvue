<template>
  <div class="container">
    <b-card class="text-center">
      <b-form-group label="Radio Buttons">
        <b-form-radio-group
          id="btn-radios-2"
          v-model="selected"
          :options="options"
          buttons
          @change="onChangeRadioForm"
          button-variant="outline-primary"
          name="radios-btn-default"
        ></b-form-radio-group>
      </b-form-group>
      <MainForm
        ref="mainForm"
        v-show="showForm"
        v-bind:mForm="formInsert"
        v-bind:type="FORM_INSERT"
      />
      <div v-show="showTable">
        <b-table show-empty small stacked="sm" :items="items" :fields="fields">
          <template v-slot:cell(options)="data">
            <b-button
              size="sm"
              @click="infoItem(data, data.id, $event.target)"
              class="mr-1"
            >
              <b-icon-search></b-icon-search>
            </b-button>
            <b-button
              size="sm"
              @click="deleteItem(data, data.id, $event.target)"
              class="mr-1"
            >
              <b-icon-trash></b-icon-trash>
            </b-button>
          </template>
        </b-table>

        <!-- Info modal -->
        <b-modal
          :id="infoModal.id"
          :title="infoModal.title"
          ok-only
          @hide="resetInfoModal"
          :ref="infoModal.id"
        >
          <MainForm
            ref="updateForm"
            v-show="true"
            v-bind:mForm="infoModal.item"
            v-bind:type="FORM_UPDATE"
            @clicked="onUpdateTable"
          />
        </b-modal>

        <!-- Delete modal -->
        <b-modal
          :id="deleteModal.id"
          :title="deleteModal.title"
          @hide="resetDeleteModal"
          :ref="deleteModal.id"
        >
          <pre>{{ deleteModal.content }}</pre>
          <template v-slot:modal-footer="{ ok, cancel }">
            <b-button
              size="sm"
              variant="success"
              @click="onDeleteForm(deleteModal.itemId)"
            >
              OK
            </b-button>
            <b-button size="sm" variant="danger" @click="cancel()">
              Cancel
            </b-button>
          </template>
        </b-modal>
      </div>
      <b-alert class="align-left" variant="success" :show="showAlert">
        <span v-html="response" />
      </b-alert>
    </b-card>
  </div>
</template>

<script>
import axios from "axios";
import MainForm from "./forms/MainForm.vue";

export default {
  name: "RadioButtonParty",
  props: {
    msg: String
  },
  components: {
    MainForm
  },
  data() {
    return {
      selected: "error",
      response: "",
      options: [
        { text: "MySQL Insert", value: "mysql-insert" },
        { text: "MySQL Select", value: "mysql-select" }
      ],
      fields: [
        {
          key: "user",
          label: "Usuario",
          sortable: true,
          sortDirection: "desc"
        },
        {
          key: "msj_text",
          label: "Mensaje",
          sortable: true,
          sortDirection: "desc"
        },
        {
          key: "record_date",
          label: "Fecha Registro",
          sortable: true,
          sortDirection: "desc",
          formatter: "formatISOString"
        },
        { key: "options", label: "Opciones" }
      ],
      items: [],
      showForm: false,
      showTable: false,
      showFormResult: false,
      showMsgForm: false,
      msgForm: process.env.VUE_APP_MSG_WAITING,
      formInsert: {
        id: null,
        user: "",
        text: ""
      },
      infoModal: {
        id: "infoModal",
        title: "",
        content: "",
        item: {
          id: null,
          user: "",
          text: ""
        }
      },
      deleteModal: {
        id: "deleteModal",
        title: "Eliminar Registro",
        content: "¿Esta seguro que desea eliminar este registro?",
        itemId: null
      }
    };
  },
  computed: {
    showAlert() {
      return this.response.length > 2 ? true : false;
    }
  },
  methods: {
    infoItem(row, index, button) {
      console.log(row.item);
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
      this.infoModal.title = `Registro con el id: ${row.item.id}`;
      this.infoModal.item.id = row.item.id;
      this.infoModal.item.user = row.item.user;
      this.infoModal.item.text = row.item.msj_text;
      console.log(this.infoModal.item);
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    deleteItem(row, index, button) {
      this.deleteModal.itemId = row.item.id;
      this.$root.$emit("bv::show::modal", this.deleteModal.id, button);
    },
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = "";
    },
    resetDeleteModal() {
      this.deleteModal.itemId = null;
    },
    onSearchRecorsMensajes() {
      console.log("sending get: mysql-select");
      axios
        .get(process.env.VUE_APP_BASE_URL + this.selected)
        .then(response => {
          this.items = response.data;
          console.log(this.items);
        })
        .catch(error => {
          this.response = error.message;
          console.log(error.message);
        });
    },
    onChangeRadioForm(value) {
      this.selected = value;
      this.response = "";
      if (value == "mysql-insert") {
        this.showForm = true;
        this.showTable = false;
        console.log(this.showForm);
      } else if (value == "mysql-select") {
        this.showForm = false;
        this.showTable = true;

        MainForm.methods.onResetForm();
        this.onSearchRecorsMensajes();
      }
    },
    onDeleteForm(itemId) {
      console.log("sending get: mysql-delete");
      this.$refs.deleteModal.hide();
      axios
        .delete(process.env.VUE_APP_BASE_URL + "mysql-delete" + "/" + itemId)
        .then(response => {
          this.response = response.data;
          this.items.forEach(element => {
            if (element.id == itemId)
              this.items.splice(this.items.indexOf(element), 1);
          });
          console.log(this.response);
        })
        .catch(error => {
          this.response = error.message;
          console.log(error.message);
        });
    },
    onUpdateTable(obj) {
      console.log(obj);
      this.items.forEach(value => {
        if (value.id == obj.id) {
          value.user = obj.user;
          value.msj_text = obj.text;
          value.record_date = new Date();
        }
      });
      this.$refs.infoModal.hide();
    },
    formatISOString(isoString) {
      var result;
      var date = new Date(isoString);
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var dt = date.getDate();
      var hour = date.getHours();
      var min = date.getMinutes();
      var sec = date.getSeconds();

      if (dt < 10) {
        dt = "0" + dt;
      }
      if (month < 10) {
        month = "0" + month;
      }
      if (hour < 10) {
        hour = "0" + hour;
      }
      if (min < 10) {
        min = "0" + min;
      }
      if (sec < 10) {
        sec = "0" + sec;
      }
      result =
        dt + "/" + month + "/" + year + " " + hour + ":" + min + ":" + sec;
      return result;
    }
  }
};
</script>

<style scoped>
.align-left {
  text-align: left !important;
}
</style>
