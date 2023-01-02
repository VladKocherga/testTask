import { IComments, IPost, IUser } from "@/types/types";
import { defineStore } from "pinia";
import { createPinia, setActivePinia } from "pinia";
const postsApi = "https://dummyjson.com/products";
const usersApi = "https://dummyjson.com/users";
const commentsApi = "https://dummyjson.com/comments";
const pinia = createPinia();
setActivePinia(pinia);
export default pinia;

export const useStore = defineStore("store", {
  state: () => ({
    searchWord: "" as string,
    posts: [] as IPost[],
    comments: [] as IComments[],
    users: [] as IUser[],
  }),

  actions: {
    async getAllPosts() {
      const res = await fetch(postsApi);
      const data = await res.json();
      this.posts = data.products;
    },
    async getAllComments() {
      const res = await fetch(commentsApi);
      const data = await res.json();
      this.comments = data.comments;
    },
    async getAllUsers() {
      const res = await fetch(usersApi);
      const data = await res.json();
      this.users = data.users;
    },
    searchPosts(wordFilter: string): void {
      this.searchWord = wordFilter;
    },
  },
});
