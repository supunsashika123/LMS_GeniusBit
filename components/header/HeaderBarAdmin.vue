<template>
  <div class="w-full h-12 bg-white border-b border-dark-blue fixed z-40">
    <nav class="flex items-center justify-between flex-wrap bg-dark-blue py-2 px-4">
      <div class="flex flex-row justify-between">
        <div class="flex items-center flex-no-shrink text-white mr-6">
          <!-- <SvgIcon name="logo" class="h-12 w-24" /> -->
          <img src="~/assets/images/logo-white.jpg" class="h-12 w-24"/>
          <span class="font-bold text-xl text-white pl-4">ADMIN DASHBOARD</span>
        </div>
      </div>
      <div class="flex justify-end">
        <div class="block sm:hidden">
          <button
            class="flex items-center px-3 py-2 border rounded text-teal-lighter border-teal-light hover:text-white hover:border-white"
            @click="toggle"
          >
            <svg
              class="text-white fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
      </div>
      <div
        :class="open ? 'block' : 'hidden'"
        class="w-full sm:flex sm:items-center sm:w-auto"
      >
        <div class="text-sm sm:hidden">
          <NuxtLink to="admin/students">
            <div
              class="block text-base text-white mt-4 hover:text-white text-center"
              @click="toggle"
            >
              Students
            </div>
          </NuxtLink>
          <NuxtLink to="admin/classes">
            <div
              class="block text-base text-white mt-4 hover:text-white text-center"
              @click="toggle"
            >
              Courses
            </div>
          </NuxtLink>
          <!-- <NuxtLink to="admin/documents">
            <div
              class="block text-base text-white mt-4 hover:text-white text-center"
              @click="toggle"
            >
              Documents
            </div>
          </NuxtLink> -->

          <NuxtLink to="admin/videos">
            <div
              class="block text-base text-white mt-4 hover:text-white text-center"
              @click="toggle"
            >
              Videos
            </div>
          </NuxtLink>

          <div
            class="block text-base text-white mt-4 cursor-pointer hover:text-white text-center font-bold"
            @click="handleLogoutButtonPress"
          >
            Logout
          </div>
        </div>
      </div>
      <div class="hidden sm:block">
        <div class="cursor-pointer" @click="handleLogoutButtonPress">
          <SvgIcon name="exit" class="h-6 w-6 exit-icon-color" />
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import SvgIcon from '@/components/SvgIcon'

export default {
  name: 'HeaderBarAdmin',

  components: { SvgIcon },

  layout: 'dashboard',

  data() {
    return {
      open: false,
    }
  },
  methods: {
    handleLogoutButtonPress() {
      this.$confirm({
        message: `Are you sure want to logout?`,
        button: {
          no: 'No',
          yes: 'Logout',
        },
        callback: (confirm) => {
          if (confirm) {
            this.$auth.logout()
          }
        },
      })
    },

    toggle() {
      this.open = !this.open
    },
  },
}
</script>

<style scoped>
.exit-icon-color {
  fill: white;
}
</style>
