<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <div id="app">
      <b-container>
        <b-tabs content-class="mt-3">
          <b-tab title="Inputs" active>
            <InputTab />
          </b-tab>
          <b-tab title="RadioButtons" active>
            <RadioButtonParty />
          </b-tab>
        </b-tabs>
      </b-container>
    </div>

    <h3>Installed CLI Plugins</h3>
    <ul>
      <li>
        <a
          href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint"
          target="_blank"
          rel="noopener"
          >eslint</a
        >
      </li>
      <li>
        <a
          href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-unit-jest"
          target="_blank"
          rel="noopener"
          >unit-jest</a
        >
      </li>
    </ul>
    <h3>Installed UI Components</h3>
    <ul>
      <li>
        <a href="https://bootstrap-vue.org/" target="_blank" rel="noopener"
          >Bootstrap-Vue</a
        >
      </li>
    </ul>
  </div>
</template>

<script>
import InputTab from "./InputTab.vue";
import RadioButtonParty from "./RadioButtonParty.vue";

export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  components: {
    InputTab,
    RadioButtonParty
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
