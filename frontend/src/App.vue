<template>
  <v-app>
    <router-view @changeStatus="changeStatus($event)" />
    <v-footer app>
      PORNTEERA PAKDEE
      <span> &copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>
<script>

export default {
  name: "App",

  data() {
    return {
      isLogin: false,
      user: "guest",
    };
  },
  methods: {
    changeStatus(status) {
      this.isLogin = status;
    },
  },
  mounted() {
    if (localStorage.getItem("user") == null) {
      this.isLogin = false;
      this.$router.push({ path: "/login" });
    } else if (localStorage.getItem("user") !== null) {
      this.isLogin = true;
    }
  },
  watch: {
    isLogin: function () {
      this.user = localStorage.getItem("user");
    },
  },
};
</script>
