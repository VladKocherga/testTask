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
      <form
        @submit.prevent="submitHandler"
        class="flex flex-wrap flex-col gap-y-4 pr-[50px] pl-[30px]"
      >
        <h2 class="text-bold text-lg leading-[1.5rem] font-extrabold">
          Создание поста
        </h2>
        <div class="flex flex-wrap flex-col gap-y-2 relative">
          <label class="text-left">Заголовок:</label>
          <input
            type="text"
            placeholder="Введите название поста"
            class="rounded-[12px] text-xs p-2 border min-w-[300px]"
            v-model="title"
            :class="{ invalid: v$.title.required.$invalid && v$.title.$dirty }"
          />
          <small
            v-if="v$.title.required.$invalid && v$.title.$dirty"
            class="absolute bottom-[-16px] text-xs color-red text-left text-red-500"
          >
            Поле не должно быть пустым
          </small>
        </div>
        <div class="flex flex-wrap flex-col gap-y-2 relative">
          <label class="text-left">Описание:</label>
          <input
            type="text"
            placeholder="Введите описание поста"
            class="rounded-[12px] text-xs p-2 border"
            v-model.trim="description"
            :class="{
              invalid:
                v$.description.required.$invalid && v$.description.$dirty,
            }"
          />
          <small
            v-if="v$.description.required.$invalid && v$.description.$dirty"
            class="absolute bottom-[-16px] text-xs color-red text-left text-red-500"
          >
            Поле не должно быть пустым
          </small>
        </div>

        <div class="flex flex-wrap flex-col gap-y-2 relative">
          <label class="text-left">Главное изображение</label>
          <input
            type="text"
            placeholder="Введите ссылку на изображение"
            v-model.trim="mainImg"
            class="rounded-[12px] text-xs p-2 border"
            :class="{
              invalid:
                (v$.mainImg.required.$invalid || v$.mainImg.url.$invalid) &&
                v$.mainImg.$dirty,
            }"
          />
          <small
            v-if="v$.mainImg.required.$invalid && v$.mainImg.$dirty"
            class="absolute bottom-[-16px] text-xs color-red text-left text-red-500"
          >
            Поле не должно быть пустым
          </small>
          <small
            v-else-if="v$.mainImg.url.$invalid && v$.mainImg.$dirty"
            class="absolute bottom-[-16px] text-xs color-red text-left text-red-500"
          >
            Введите url картинки
          </small>
        </div>
        <div class="flex flex-wrap flex-col gap-y-2 relative">
          <label class="text-left">Дополнительное изображение</label>
          <input
            type="text"
            placeholder="Введите ссылку на изображение"
            class="rounded-[12px] text-xs p-2 border"
            v-model.trim="additionalImg"
            :class="{
              invalid:
                (v$.additionalImg.required.$invalid ||
                  v$.additionalImg.url.$invalid) &&
                v$.additionalImg.$dirty,
            }"
          />
          <small
            v-if="v$.additionalImg.required.$invalid && v$.additionalImg.$dirty"
            class="absolute bottom-[-16px] text-xs color-red text-left text-red-500"
          >
            Поле не должно быть пустым
          </small>
          <small
            v-else-if="v$.additionalImg.url.$invalid && v$.additionalImg.$dirty"
            class="absolute bottom-[-16px] text-xs color-red text-left text-red-500"
          >
            Введите url картинки
          </small>
        </div>
        <div class="flex flex-wrap flex-col gap-y-2 relative">
          <label class="text-left">Цена</label>
          <input
            type="number"
            placeholder="Введите цену"
            class="rounded-[12px] text-xs p-2 border"
            :class="{ invalid: v$.price.required.$invalid && v$.price.$dirty }"
            v-model.trim="price"
          />
          <small
            v-if="v$.price.required.$invalid && v$.price.$dirty"
            class="absolute bottom-[-16px] text-xs color-red text-left text-red-500"
          >
            Поле не должно быть пустым
          </small>
        </div>
        <div class="w-[100%] flex justify-end">
          <button class="button" type="submit">Отправить</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { required, url } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { useStore } from "@/store/store";
import { IPost } from "@/types/types";

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  props: {
    isOpen: {
      type: Boolean,
      required: true as boolean,
    },
  },
  data() {
    return {
      title: "" as string,
      description: "" as string,
      price: "" as string,
      mainImg:
        "https://jooinn.com/images/selective-focus-photography-of-black-rotary-phone.jpg",
      additionalImg: "https://jooinn.com/images/old-telephone-16.jpg",
    };
  },
  validations: {
    title: { required },
    description: { required },
    price: { required },
    mainImg: { required, url },
    additionalImg: { required, url },
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
    submitHandler() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }
      const store: IPost[] = useStore().posts;
      store.push({
        id: store.length - 1,
        title: this.title,
        description: this.description,
        price: +this.price,
        thumbnail: this.mainImg,
        images: [this.additionalImg],
      });
      this.close();
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
.invalid {
  border-color: red;
}
</style>
