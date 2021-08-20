<template>
  <div
    class="h-screen w-56 bg-white border-r box-border absolute left-0 fixed px-4 py-12"
  >
    <div class="pt-16">
      <div class="xl:mt-5">
        <SidebarMenuItem
          v-for="route of routes"
          :key="route.value"
          :name="route.display"
          :route-name="route.value"
          :icon-name="route.icon"
          :is-active="checkIsMenuActive(route)"
        />
        <!--        <LogoutButton />-->
      </div>
    </div>
  </div>
</template>

<script>
import SidebarMenuItem from '~/components/sidebar/SidebarMenuItem'

export default {
  name: 'Sidebar',

  components: { SidebarMenuItem },

  props: {
    menuItems: {
      type: Array,
      required: true,
    },
    activeMenu: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      isShowing: false,
      routes: [
        {
          value: '/home',
          display: 'Home',
          icon: 'home',
        },
        {
          value: '/online-classes',
          display: 'Online Classes',
          icon: 'online-teaching',
        },
        {
          value: '/documents',
          display: 'Documents',
          icon: 'document',
        },
        {
          value: '/live-classes',
          display: 'Live Classes',
          icon: 'live-class',
        },
        {
          value: '/gallery',
          display: 'Gallery',
          icon: 'image-album',
        },
        {
          value: '/online-quiz',
          display: 'Online Quizzes',
          icon: 'question-mark-outline',
        },
        {
          value: '/papers',
          display: 'Papers',
          icon: 'document',
        },
      ],
    }
  },

  methods: {
    checkIsMenuActive(route) {
      const currentUrl = this.$nuxt.$route.path.split('/')[1]
      return route.value === '/' + currentUrl
    },
  },
}
</script>

<style scoped>
.box-border {
  box-shadow: 0 4px 50px rgba(167, 169, 190, 0.11);
}

.button-active {
  border: 2px solid #e00000;
}
</style>
