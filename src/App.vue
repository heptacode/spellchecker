<template>
  <textarea v-model="text" @input="onTextChanged"></textarea>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';

@Component({})
export default class App extends Vue {
  text: string = '';
  timer: any;

  onTextChanged(event: any) {
    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(async () => {
      try {
        if (this.text.trim()) {
          this.text = (await axios.post('/api', { str: event.target.value })).data;
        }
      } catch (err) {
        console.error(err);
      }
    }, 500);
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html,
body {
  width: 100vw;
  height: 100vh;
}
textarea {
  position: fixed;
  width: 100%;
  height: 100%;

  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 30px;

  color: #2c3e50;
}
</style>
