<template>
  <div
    class="background-image w-full flex items-center h-screen justify-center"
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
            style="border-radius: 32px"
          />
        </div>
      </div>
      <div
        ref="whiteModal"
        class="w-full lg:w-2/3 border-l-2 border-fuchsia-600"
      >
        <ValidationObserver ref="signupForm">
          <div class="flex-row lg:flex">
            <div class="w-full lg:w-1/2">
              <div class="login-form px-4 lg:pt-12 lg:px-4">
                <div
                  class="pb-6 hidden div-height logo-position hide-logo-mobile"
                >
                  <SvgIcon
                    name="logo-red"
                    class="hidden icon-fill top-logo-size my-4"
                  />
                </div>
                <div
                  class="
                    font-bold
                    text-3xl
                    pt-12
                    sm:pt-0
                    text-center
                    sm:text-left
                  "
                >
                  Registration
                </div>
                <TextField
                  v-model="first_name"
                  rules="required"
                  label="First Name"
                  name="first_name"
                  class="pt-4"
                />
                <TextField
                  v-model="last_name"
                  rules="required"
                  label="Last Name"
                  name="last_name"
                  class="pt-4"
                />
                <TextField
                  v-model="email"
                  rules="required|email"
                  name="email"
                  label="Email Address"
                  class="pt-4"
                />
                <TextField
                  v-model="mobile"
                  rules="required|numeric"
                  name="whatsappNumber"
                  label="Whatsapp Number (07XXXXXXXX)"
                  class="pt-4"
                />
                <TextField
                  v-model="address"
                  rules="required"
                  name="address"
                  label="Address"
                  class="pt-4"
                />
              </div>
            </div>
            <div class="w-full lg:w-1/2">
              <div
                class="
                  hidden
                  logo-position
                  div-height
                  logo-position logo-responsive-display
                "
              >
                <SvgIcon
                  name="logo-red"
                  class="hidden icon-fill icon-size my-4"
                />
              </div>
              <div class="mx-4 lg:mx-0 lg:ml-2 lg:mr-4 pt-4">
                <PasswordField
                  v-model="password"
                  rules="required"
                  name="password"
                  label="Password"
                  vid="confirmation"
                />
                <PasswordField
                  name="password"
                  rules="required|confirmed:confirmation"
                  label="Confirm password"
                  class="pt-4"
                />
                <TextField
                  v-model="school"
                  rules="required"
                  name="school"
                  label="School"
                  class="pt-4"
                />
                <TextField
                  v-model="invoiceNo"
                  rules="required"
                  name="invoiceNo"
                  label="Invoice No"
                  class="pt-4"
                />
                <div class="flex pt-4">
                  <div class="w-1/2">
                    <label
                      class="block text-2xs font-normal text-black text-left"
                    >
                      Course Year
                    </label>
                    <select
                      id="alYear"
                      v-model="al_year"
                      class="
                        border
                        mt-1
                        h-10
                        w-full
                        border-gray-800
                        focus:outline-none
                        rounded-lg
                        py-2
                      "
                      name="alYear"
                    >
                      <option value="">Select</option>
                      <option
                        v-for="year of availableALYears"
                        :key="year"
                        :value="year"
                      >
                        {{ year }}
                      </option>
                    </select>
                  </div>
                  <div class="ml-4 w-1/2">
                    <label
                      class="block text-2xs font-normal text-black text-left"
                    >
                      Gender
                    </label>
                    <select
                      id="gender"
                      v-model="gender"
                      class="
                        border
                        mt-1
                        h-10
                        w-full
                        border-gray-800
                        focus:outline-none
                        rounded-lg
                        py-2
                      "
                      name="gender"
                    >
                      <option value="" selected>Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex justify-center pb-4 pt-8">
            <div class="pb-4 lg:pb-0">
              <div class="w-64">
                <PrimaryButton
                  text="Register"
                  class="mt-2 flex justify-center"
                  @click="handleSignUpClick"
                />
              </div>
              <div class="font-normal text-xs pt-1 text-center pb-4 lg:pb-0">
                if you already have an account ?
                <NuxtLink to="/auth/login">
                  <span class="font-bold" style="color: #043362">
                    login here</span
                  ></NuxtLink
                >
              </div>
            </div>
          </div>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
import TextField from "@/components/TextField";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { ValidationObserver } from "vee-validate";
import PasswordField from "@/components/PasswordField";
import SvgIcon from "@/components/SvgIcon";

export default {
  name: "Registration",

  middleware: "guest",

  layout: "authentication",

  components: {
    SvgIcon,
    PasswordField,
    PrimaryButton,
    TextField,
    ValidationObserver,
  },

  data() {
    return {
      first_name: "",
      last_name: "",
      address: "",
      email: "",
      school: "",
      mobile: "",
      al_year: "",
      gender: "",
      password: "",
      res: "",
      bgHeight: "",
      invoiceNo: "",
    };
  },

  computed: {
    availableALYears() {
      const currentYear = new Date().getFullYear();
      return [currentYear, currentYear + 1, currentYear + 2];
    },
  },

  methods: {
    showNotification(type, text) {
      this.$notify({
        type,
        group: "foo",
        title: type === "success" ? "Success" : "Error!",
        text,
        position: "top right",
      });
    },

    async handleSignUpClick() {
      if (!(await this.$refs.signupForm.validate())) {
        this.showNotification("error", "Please fill required fields.");
        return false;
      }

      if (!this.al_year) {
        this.showNotification("error", "Please select A/L year.");
        return false;
      }

      if (!this.gender) {
        this.showNotification("error", "Please select your gender.");
        return false;
      }

      if (this.mobile.length !== 10) {
        this.showNotification("error", "Invalid mobile number.");
        return false;
      }

      try {
        await this.$axios.post("user/signup", {
          first_name: this.first_name,
          last_name: this.last_name,
          address: this.address,
          email: this.email,
          school: this.school,
          invoice_no: this.invoiceNo,
          mobile: this.mobile,
          al_year: this.al_year,
          gender: this.gender,
          password: this.password,
        });

        return this.$router.push("success");
      } catch (e) {
        this.res = e.response.data.message;

        if (e.response.data.status === "success") {
          this.showNotification("success", this.res);
        } else {
          this.showNotification("error", this.res);
        }
      }
    },
  },
};
</script>

<style scoped>
@media screen and (min-width: 800px) {
  .banner-responsive-hide {
    display: none;
  }
}

.top-logo-size {
  height: 92px;
  width: 112px;
}

@media screen and (min-width: 769px) {
  .modal-responsive-size {
  }
}

.logo-position {
  display: flex;
  justify-content: center;
}

.div-height {
  height: 87px;
}

.icon-size {
  height: 64px;
  width: 84px;
}

@media screen and (max-width: 1023px) {
  .logo-responsive-display {
    display: none;
  }
}

.image-center {
  display: flex;
  align-items: center;
}

.cross-icon-color {
  fill: white;
}

.background-image {
  background-image: url("../../assets/images/Background.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}

@media screen and (min-width: 1024px) {
  .card-size {
    min-height: 602px;
    height: auto;
    width: 1099px;
    border-radius: 32px;
  }
}

@media screen and (min-width: 1024px) {
  .hide-logo-mobile {
    display: none;
  }
}

@media screen and (min-width: 1024px) {
  .padding-top {
    padding-top: 86px;
  }
}
</style>
