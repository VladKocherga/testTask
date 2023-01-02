<template>
  <router-view />
</template>

<style lang="scss"></style>
<script lang="ts">
import { useStore } from "./store/store";
import { defineComponent } from "vue";
const store = useStore();
store.getAllPosts();
store.getAllComments();
store.getAllUsers();
export default defineComponent({
  name: "app",
});
</script>
