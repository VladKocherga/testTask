<template>
  <div
    v-if="isOpen"
    class="fixed top-0 left-0 bottom-0 right-0 z-[99] bg-stone-500/75"
    @click="close"
  >
    <div
      class="popup flex flex-col gap-y-2.5 min-w-[300px] min-h-[100px] fixed top-[10%] p-5 left-1/2 z-101 bg-white rounded-xl"
      @click.stop
    >
      <h2 class="text-2xl font-black">{{ post.title }}</h2>
      <div class="flex flex-wrap gap-x-5 justify-end">
        <p class="price">
          price: <span class="text-lime-400 font-bold">{{ post.price }}$</span>
        </p>
        <p class="rating">rating: {{ post.rating ? post.rating : 0 }}</p>
      </div>
      <div class="m-auto">
        <a :href="post.thumbnail" target="_blank">
          <img class="w-60 h-36" :src="post.thumbnail" />
        </a>
      </div>
      <div class="flex max-h-25 justify-center gap-5">
        <a
          class="w-12 h-12"
          :href="item"
          target="_blank"
          v-for="(item, index) in post.images"
          :key="index"
        >
          <img class="w-12 h-12" :src="item" />
        </a>
      </div>
      <div>
        <h2 class="font-bold leading-10">Description:</h2>
        <p class="bg-orange-100">{{ post.description }}</p>
      </div>
      <h2 class="font-bold" v-if="post.id < 28">Comments:</h2>
      <div class="comments" v-if="post.id < 28">
        <div
          class="flex flex-wrap gap-2.5"
          v-for="(item, index) in getComments(post.id)"
          :key="index"
        >
          <img class="w-7 h-7 bg-center" :src="getUserImg(item.id)" />
          <p class="text-lime-400 font-bold leading-[30px]">
            {{ getUserName(item.id) }} -
          </p>
          <p class="leading-8">{{ item.body }}</p>
        </div>
      </div>
      <div class="text-right">
        <slot name="actions" :close="close">
          &nbsp;
          <button @click="close">Ок</button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from "@/store/store";
import { IComments, IPost, IUser } from "@/types/types";
import { PropType } from "vue";

export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    post: {
      type: Object as PropType<IPost>,
      required: true,
    },
  },
  emits: {
    ok: null,
    close: null,
  },

  mounted(): void {
    document.addEventListener("keydown", this.handleKeydown);
  },
  beforeUnmount(): void {
    document.removeEventListener("keydown", this.handleKeydown);
  },

  methods: {
    handleKeydown(e: KeyboardEvent): void {
      if (this.isOpen && e.key === "Escape") {
        this.close();
      }
    },
    getComments(id: number): IComments[] {
      const index = id >= 30 ? (id = 29) : id;
      const store = useStore();
      return [store.comments[index], store.comments[index + 1]];
    },
    getUserImg(id: number): string {
      if (!id || id > 29) {
        return "";
      }
      const storeUsers: IUser[] = useStore().users;
      return storeUsers[id].image;
    },
    getUserName(id: number): string {
      const index = id >= 30 ? (id = 29) : id;
      const storeUser: IUser[] = useStore().users;
      return storeUser[index].username;
    },

    close() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped lang="scss">
.popup {
  transform: translateX(-50%);
}
</style>
