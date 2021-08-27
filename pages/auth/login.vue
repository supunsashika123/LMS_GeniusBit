<template>
  <div
    class="background-image w-full flex items-center h-screen justify-center"
    :style="{
      height: bgHeight,
    }"
  >
    <div class="bg-white w-full h-screen card-size sm:flex">
      <div
        class="w-1/3 flex items-center hidden lg:flex bg-pink"
        style="border-radius: 32px"
      >
        <div class="my-auto">
          <img
            class="side-banner-image-styles flex items-center p-4"
            src="~/assets/images/banner-image.jpg"
          />
        </div>
      </div>
      <div class="w-full md:w-1/2 lg:w-1/3 border-l-2 border-fuchsia-600">
        <div class="login-form py-6 px-4 sm:py-12 lg:px-12">
          <div class="sm:hidden text-center pb-6">
            <div class="hidden div-height logo-position hide-logo-mobile">
              <img
                class="hidden icon-fill icon-size my-4"
                src="~/assets/images/logo.jpg"
                alt=""
                style="width: 150px"
              />
            </div>
          </div>
          <div class="font-bold text-3xl text-center sm:text-left">Login</div>
          <ValidationObserver ref="loginForm">
            <TextField
              v-model="username"
              rules="required"
              name="userName"
              label="Username"
              class="pt-8"
            />
            <PasswordField
              v-model="password"
              rules="required"
              label="Password"
              class="pt-8"
              @keyup.native.enter="handleLoginClick"
            />
            <button
              class="font-bold text-xs pt-6 focus:outline-none"
              @click="showForgotPasswordMessage"
            >
              Forgot password?
            </button>
            <PrimaryButton
              text="Login"
              :loading="loading"
              @click="handleLoginClick"
            />
            <div class="font-normal text-xs pt-4 text-center">
              Still don’t have an account?
            </div>
            <NuxtLink to="/auth/registration">
              <SecondaryButton text="Register" class="mt-4" />
            </NuxtLink>
          </ValidationObserver>
        </div>
      </div>
      <div class="w-full md:w-1/2 lg:w-1/3 px-6 py-8">
        <div class="hide-logo-web logo-position">
          <img
            class="hide-logo-web icon-fill w-32"
            src="~/assets/images/logo.jpg"
            alt=""
          />
        </div>
        <div class="sm:mt-6">
          <div class="text-center sm:text-left text-base text-black font-bold">
            Login instructions
          </div>
          <div class="mt-6 mb-4 flex">
            <div class="flex items-center">
              <img class="w-8 h-48" src="~/assets/images/steps-image.png" />
            </div>
            <div class="ml-6">
              <div class="text-sm text-black font-bold">Step 1</div>
              <div class="text-sm text-black font-normal mt-2">
                Enter the given username in to the username field.
              </div>
              <div class="text-sm text-black font-bold mt-4">Step 2</div>
              <div class="text-sm text-black font-normal mt-2">
                Enter the given password in to the password field.
              </div>
              <div class="text-sm text-black font-bold mt-4">Step 3</div>
              <div class="text-sm text-black font-normal mt-2">
                After entering the login credentials, please press the login
                button below the fields.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.background-image {
  background-image: url("../../assets/images/Background.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}

@media screen and (min-width: 640px) {
  .card-size {
    min-height: 602px;
    height: auto;
    width: 1099px;
    border-radius: 32px;
  }
}

.icon-fill {
  fill: "black";
}

.logo-position {
  display: flex;
  justify-content: center;
}

@media screen and (min-width: 1024px) {
  .hide-logo-mobile {
    display: none;
  }
}

@media screen and (min-width: 1024px) {
  .image-responsive-display {
    display: none;
  }
}

@media screen and (max-width: 640px) {
  .hide-logo-web {
    display: none;
  }
}

.icon-size {
  height: 92px;
  width: 112px;
}

.side-banner-image-styles {
  border-radius: 32px;
}

.image-center {
  display: flex;
  align-items: center;
}

.logo-position {
  display: flex;
  justify-content: center;
}
</style>
<script>
import PrimaryButton from "@/components/buttons/PrimaryButton";
import SecondaryButton from "@/components/buttons/SecondaryButton";
import TextField from "@/components/TextField";
import { ValidationObserver } from "vee-validate";
import PasswordField from "@/components/PasswordField";
import SvgIcon from "@/components/SvgIcon";

export default {
  components: {
    SvgIcon,
    PasswordField,
    SecondaryButton,
    PrimaryButton,
    TextField,
    ValidationObserver,
  },

  middleware: "guest",

  layout: "authentication",

  data() {
    return {
      username: "",
      password: "",
      res: "",
      bgHeight: "",
      loading: false,
    };
  },

  mounted() {
    if (this.$refs.whiteModal) {
      const modalHeight = this.$refs.whiteModal.clientHeight;
      const bodyHeight = window.innerHeight;

      if (modalHeight <= bodyHeight) {
        this.bgHeight = bodyHeight + "px";
      } else {
        this.bgHeight = modalHeight + +100 + "px";
      }
    }
  },

  methods: {
    showForgotPasswordMessage() {
      this.$notify({
        group: "foo",
        title: "Nothing to worry !",
        text: "Please contact admin",
        position: "top right",
        width: "800px",
      });
    },

    showNotification(type, text) {
      this.$notify({
        type,
        group: "foo",
        title: type === "success" ? "Success" : "Error!",
        text,
        position: "top right",
        width: "800px",
      });
    },

    async handleLoginClick() {
      if (!(await this.$refs.loginForm.validate())) {
        this.showNotification("error", "Please fill required fields.");
        return false;
      }

      try {
        this.loading = true;
        const { data } = await this.$auth.loginWith("local", {
          data: {
            username: this.username,
            password: this.password,
          },
        });

        if (data.status === "failed") {
          this.loading = false;
          this.showNotification("error", data.message);
          return false;
        }

        const path =
          data.data.user.type === "admin" ? "/admin/students" : "/home";

        return this.$router.push({
          path,
        });
      } catch (e) {
        console.log(e);
        this.loading = false;
        this.showNotification(
          "error",
          e.response && e.response.data.message
            ? e.response.data.message
            : "Invalid credentials!"
        );
      }
    },
  },
};
</script>
