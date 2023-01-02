<template>
  <postPopupComponent
    :is-open="isPopupOpen"
    @close="isPopupOpen = false"
    :post="post"
  ></postPopupComponent>
  <div class="flex flex-wrap justify-around gap-x-[10px] w-[100%] h-[100%]">
    <div class="h-[150px] w-[30%] min-h-[150px] flex justify-center">
      <img
        :src="post.thumbnail"
        alt="logo"
        class="img h-[100%] rounded-[50%]"
      />
    </div>
    <div
      class="flex flex-col justify-around items-center w-[48%] min-h-[150px]"
    >
      <h2 class="font-bold leading-10">{{ post.title }}</h2>
      <p class="text-sm">{{ post.description }}</p>
      <div class="button" @click="openPopup">Посмотреть</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { IPost } from "@/types/types";
import postPopupComponent from "./popups/postPopupComponent.vue";
export default defineComponent({
  components: { postPopupComponent },
  name: "PostComponent",
  props: {
    post: {
      type: Object as PropType<IPost>,
      required: true,
    },
  },
  data() {
    return { isPopupOpen: false };
  },
  methods: {
    openPopup() {
      this.isPopupOpen = true;
    },
  },
});
</script>

<style scoped lang="scss">
.button {
  width: 100px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  border-radius: 25px;
  font-weight: bold;
  background-color: #ffedd5;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
}
</style>
