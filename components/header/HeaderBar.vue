<template>
  <div class="w-full h-12 bg-white border-b border-red fixed z-40">
    <nav class="flex items-center justify-between flex-wrap bg-red py-2 px-4">
      <div class="flex items-center flex-no-shrink text-white mr-6">
        <SvgIcon name="logo" class="h-12 w-24" />
      </div>
      <div class="flex flex-row items-center">
        <NuxtLink to="student-info">
          <div class="h-8 w-8 rounded-full bg-white sm:hidden">
            <SvgIcon name="profile" class="h-8 w-8" />
          </div>
        </NuxtLink>
        <div class="sm:hidden">
          <MenuToggleButton v-model="showMobileMenu" class="ml-4" />
        </div>
      </div>
      <div
        :class="open ? 'block' : 'hidden'"
        class="w-full sm:flex sm:items-center sm:w-auto"
      >
        <div class="text-sm sm:hidden">
          <NuxtLink to="home" @click.native="showMobileMenu = false">
            <div
              class="
                block
                text-base text-white
                mt-4
                hover:text-white
                text-center
              "
              @click="toggleMenu"
            >
              Home
            </div>
          </NuxtLink>
          <NuxtLink to="online-classes" @click.native="showMobileMenu = false">
            <div
              class="
                block
                text-base text-white
                mt-4
                hover:text-white
                text-center
              "
              @click="toggleMenu"
            >
              Online Classes
            </div>
          </NuxtLink>
          <NuxtLink to="documents" @click.native="showMobileMenu = false">
            <div
              class="
                block
                text-base text-white
                mt-4
                hover:text-white
                text-center
              "
              @click="toggleMenu"
            >
              Documents
            </div>
          </NuxtLink>
          <NuxtLink to="live-classes" @click.native="showMobileMenu = false">
            <div
              class="
                block
                text-base text-white
                mt-4
                hover:text-white
                text-center
              "
              @click="toggleMenu"
            >
              Live Classes
            </div>
          </NuxtLink>
          <NuxtLink to="gallery" @click.native="showMobileMenu = false">
            <div
              class="
                block
                text-base text-white
                mt-4
                hover:text-white
                text-center
              "
              @click="toggleMenu"
            >
              Gallery
            </div>
          </NuxtLink>
          <NuxtLink to="/online-quiz" @click.native="showMobileMenu = false">
            <div
              class="
                block
                text-base text-white
                mt-4
                hover:text-white
                text-center
              "
              @click="toggleMenu"
            >
              Online Quizzes
            </div>
          </NuxtLink>
          <NuxtLink to="/papers" @click.native="showMobileMenu = false">
            <div
              class="
                block
                text-base text-white
                mt-4
                hover:text-white
                text-center
              "
              @click="toggleMenu"
            >
              Papers
            </div>
          </NuxtLink>
          <div
            class="
              block
              text-base text-white
              mt-4
              cursor-pointer
              hover:text-white
              text-center
              font-bold
            "
            @click="handleLogoutButtonPress"
          >
            Logout
          </div>
        </div>
        <div>
          <div class="hidden sm:block">
            <div class="flex">
              <NuxtLink to="student-info">
                <div class="flex flex-row items-center">
                  <div class="h-8 w-8 rounded-full">
                    <SvgIcon name="profile" class="h-8 w-8" />
                  </div>
                  <div
                    class="
                      font-bold
                      cursor-pointer
                      text-sm
                      px-4
                      text-white
                      mt-4
                      sm:mt-0
                      text-center
                    "
                  >
                    Test
                  </div>
                </div>
              </NuxtLink>
              <div class="cursor-pointer ml-2" @click="handleLogoutButtonPress">
                <SvgIcon
                  name="exit"
                  class="h-6 w-6 exit-icon-color hidden sm:block"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import SvgIcon from "@/components/SvgIcon";
import MenuToggleButton from "@/components/buttons/MenuToggleButton";
export default {
  name: "HeaderBar",

  components: { MenuToggleButton, SvgIcon },

  layout: "dashboard",

  data() {
    return {
      open: false,
      showMobileMenu: false,
    };
  },

  watch: {
    showMobileMenu(newValue) {
      this.open = newValue;
    },
  },

  methods: {
    handleLogoutButtonPress() {
      this.$confirm({
        message: `Are you sure want to logout?`,
        button: {
          no: "No",
          yes: "Logout",
        },
        callback: (confirm) => {
          if (confirm) {
            this.$auth.logout();
          }
        },
      });
    },

    toggleMenu() {
      this.open = false;
    },
  },
};
</script>

<style scoped></style>
