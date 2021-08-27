<template>
  <div>
    <notifications group="foo" />

    <client-only></client-only>
    <HeaderBar />
    <Sidebar
      :active-menu="activeMenuItem"
      :menu-items="menuItems"
      class="hidden sm:block"
      @menu-item-click="handleMenuClick($event)"
    />
    <Nuxt class="padding-left padding-top" />
    <FooterBar />
  </div>
</template>

<script>
import HeaderBar from "@/components/header/HeaderBar";
import FooterBar from "@/components/footer/FooterBar";
import Sidebar from "@/components/sidebar/Sidebar";

export default {
  name: "Dashboard",

  components: { Sidebar, FooterBar, HeaderBar },

  data() {
    return {
      menuItems: ["Home", "Online-Classes", "Documents"],

      activeMenuItem: "Home",
    };
  },

  methods: {
    handleMenuClick(route) {
      this.activeMenuItem = route;
      this.$router.push({
        path: "/" + route.toLowerCase(),
      });
    },
  },
};
</script>

<style scoped>
@media screen and (min-width: 640px) {
  .padding-left {
    padding-left: 224px;
  }
}

.padding-top {
  padding-top: 64px;
}
</style>
