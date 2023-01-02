<template>
  <HeaderComponent></HeaderComponent>
  <main
    class="max-w-[600px] max-h-[600px] m-auto flex overflow-y-scroll flex-wrap mt-[20px] gap-x-4 mb-[50px]"
  >
    <div
      v-for="(item, index) in todosByTitle"
      :key="index"
      class="w-full min-h-30 border-2 mt-[10px]"
    >
      <PostComponent :post="item"></PostComponent>
    </div>
  </main>
</template>

<script lang="ts">
import { useStore } from "../store/store";
import { defineComponent } from "vue";
import HeaderComponent from "@/components/Header.vue";
import PostComponent from "@/components/Post.vue";
import { IPost } from "@/types/types";

export default defineComponent({
  name: "HomeView",
  data: () => {
    return {
      store: useStore(),
    };
  },
  computed: {
    todosByTitle() {
      return this.store.posts.filter((el: IPost) => {
        return (
          el.title
            .toLowerCase()
            .indexOf(this.store.searchWord.toLowerCase()) !== -1
        );
      });
    },
  },
  components: {
    HeaderComponent,
    PostComponent,
  },
});
</script>
