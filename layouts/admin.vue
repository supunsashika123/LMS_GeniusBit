<template>
  <div>
    <notifications group="foo" />
    <client-only><vue-confirm-dialog class="confirm-alert" /></client-only>
    <HeaderBarAdmin />
    <SidebarAdmin
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
import HeaderBarAdmin from '@/components/header/HeaderBarAdmin'
import FooterBar from '@/components/footer/FooterBar'
import SidebarAdmin from '~/components/sidebar/SidebarAdmin'

export default {
  name: 'Admin',

  middleware: ['auth-admin'],

  components: { SidebarAdmin, FooterBar, HeaderBarAdmin },

  data() {
    return {
      menuItems: ['Pending', 'Students', 'Classes', 'Videos', 'Docs'],

      activeMenuItem: 'Pending',
    }
  },

  methods: {
    handleMenuClick(route) {
      this.activeMenuItem = route
      this.$router.push({
        path: '/' + route.toLowerCase(),
      })
    },
  },
}
</script>

<style>
.confirm-alert {
  font-size: 16px !important;
}

@media screen and (min-width: 640px) {
  .padding-left {
    padding-left: 224px;
  }
}

.padding-top {
  padding-top: 84px;
}
</style>
