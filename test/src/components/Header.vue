<template>
  <createPostPopupComponent
    :is-open="isPopupOpen"
    @close="isPopupOpen = false"
  ></createPostPopupComponent>
  <header
    class="max-w-[600px] bg-orange-100 m-auto p-[50px] rounded-[12px] flex justify-center flex-wrap gap-x-4 gap-y-6"
  >
    <img alt="Vue logo" src="../assets/logo.png" class="w-10" />
    <input
      type="text"
      placeholder="Введите название"
      class="rounded-[12px] text-xs p-2"
      v-model="searchValue"
    />
    <div
      class="font-medium cursor-pointer h-10 w-10 bg-white flex justify-center items-center color-orange-100 rounded-[12px] hover:opacity-80"
      @click="openPopup"
    >
      +
    </div>
  </header>
</template>

<script lang="ts">
import { useStore } from "@/store/store";
import { defineComponent } from "vue";
import createPostPopupComponent from "./popups/createPostPopupComponent.vue";

export default defineComponent({
  name: "HeaderComponent",
  data() {
    return {
      searchValue: "" as string,
      isPopupOpen: false as boolean,
    };
  },
  methods: {
    openPopup(): void {
      this.isPopupOpen = true;
    },
  },
  watch: {
    searchValue: function (): void {
      const store = useStore();
      store.searchPosts(this.searchValue);
    },
  },
  components: { createPostPopupComponent },
});
</script>

<style scoped lang="scss"></style>
