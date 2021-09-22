<template>
  <div class="h-screen overflow-auto">
    <div class="m-6">
      <div class="text-2xl font-bold pt-4 text-center lg:text-left">
        Student Info
      </div>
      <div
        class="flex flex-col lg:flex-row pt-4 md:ml-4 form-height overflow-auto"
      >
        <div class="flex justify-center items-center mx-12">
          <div class="text-center lg:hidden">
            <div>
              <SvgIcon
                v-if="!profileImageUrl"
                name="profile"
                class="w-32 h-32 xl:h-48 xl:w-48"
              />
              <div v-if="profileImageUrl" class="w-32 h-32 xl:h-48 xl:w-48">
                <img
                  :src="profileImageUrl"
                  class="w-full border rounded-lg"
                  alt="Profile image"
                />
              </div>
            </div>
            <input
              ref="uploadInput"
              :disabled="textBoxReadOnly"
              type="file"
              accept="image/*"
              hidden
              @change="handleFileSelect"
            />
            <button
              :disabled="textBoxReadOnly"
              class="text-right"
              @click="$refs.uploadInput.click()"
            >
              <SvgIcon
                v-if="!textBoxReadOnly"
                name="camera"
                class="h-6 w-6 cursor-pointer"
              />
            </button>
          </div>
        </div>
        <div class="w-full form-width">
          <TextField
            v-model="formFields.first_name"
            name="first_name"
            :disabled="true"
            :value="formFields.first_name"
            class="pt-4 mx-4 lg:mx-0 lg:mr-2"
            label="First Name"
          />
          <TextField
            v-model="formFields.last_name"
            name="last_name"
            class="pt-4 mx-4 lg:mx-0 lg:mr-2"
            label="Last Name"
            :disabled="true"
            :value="formFields.last_name"
          />
          <TextField
            v-model="formFields.username"
            name="username"
            class="pt-4 mx-4 lg:mx-0 lg:mr-2"
            label="Username"
            :disabled="true"
          />
          <TextField
            v-model="formFields.email"
            name="email"
            class="pt-4 mx-4 lg:mx-0 lg:mr-2"
            label="Email Address"
            :disabled="textBoxReadOnly"
            :value="formFields.email"
          />
          <TextField
            v-model="formFields.mobile"
            name="mobile"
            class="pt-4 mx-4 lg:mx-0 lg:mr-2"
            label="Whatsapp Number"
            :disabled="true"
            :value="formFields.mobile"
          />
        </div>
        <div class="form-width lg:ml-12">
          <TextField
            v-model="formFields.address"
            name="address"
            class="pt-4 mx-4 lg:mx-0 lg:mr-2"
            label="Address"
            :disabled="textBoxReadOnly"
            :value="formFields.address"
          />
          <TextField
            v-model="formFields.school"
            name="school"
            class="pt-4 mx-4 lg:mx-0 lg:mr-2"
            label="School"
            :disabled="textBoxReadOnly"
            :value="formFields.school"
          />
          <div class="pt-4 mx-4 lg:mx-0 lg:mr-2">
            <label class="block text-2xs font-normal text-black text-left">
              A/L Year
            </label>
            <select
              id="alYear"
              v-model="formFields.al_year"
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
              :disabled="true"
            >
              <option :value="formFields.al_year">
                {{ formFields.al_year }}
              </option>
            </select>
          </div>
          <div class="pt-4 mx-4 lg:mx-0 lg:mr-2">
            <label class="block text-2xs font-normal text-black text-left">
              Gender
            </label>
            <select
              id="gender"
              v-model="formFields.gender"
              :disabled="true"
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
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div class="flex justify-center lg:justify-between pt-8">
            <div class="flex flex-row flex-wrap">
              <div
                v-for="(classItem, index) of formFields.classes"
                :key="index"
                class="
                  h-12
                  w-16
                  select-none
                  shadow
                  bg-green-900
                  text-white
                  mx-2
                  my-2
                  rounded-lg
                  text-xs
                  font-bold
                  flex
                  items-center
                  justify-center
                  text-center
                "
              >
                {{ classItem.year + " " + classItem.type }}
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col justify-center items-center">
          <div class="hidden lg:block mx-12 pb- 24">
            <div class="text-center hidden lg:block">
              <div>
                <SvgIcon
                  v-if="!profileImageUrl"
                  name="profile"
                  class="w-32 h-32 xl:h-48 xl:w-48"
                />
                <div v-if="profileImageUrl" class="w-32 h-32 xl:h-48 xl:w-48">
                  <img
                    :src="profileImageUrl"
                    class="w-full border rounded-lg"
                    alt="Profile image"
                  />
                </div>
                <input
                  ref="uploadInput"
                  :disabled="textBoxReadOnly"
                  type="file"
                  accept="image/*"
                  hidden
                  @change="handleFileSelect"
                />
              </div>
              <button
                :disabled="textBoxReadOnly"
                class="text-right focus:outline-none"
                @click="$refs.uploadInput.click()"
              >
                <SvgIcon
                  v-if="!textBoxReadOnly"
                  name="camera"
                  class="h-6 w-6 cursor-pointer"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-center lg:justify-end pb-16">
        <div class="flex lg:pr-12">
          <div>
            <PrimaryButton
              v-if="textBoxReadOnly"
              text="Edit"
              @click="textBoxReadOnly = !textBoxReadOnly"
            />
          </div>
          <div class="pl-4">
            <PrimaryButton
              v-if="!textBoxReadOnly"
              text="Cancel"
              @click="textBoxReadOnly = true"
            />
          </div>
          <div class="pl-4">
            <PrimaryButton
              v-if="!textBoxReadOnly"
              :loading="loading"
              text="Save"
              @click="handleSaveButtonClick"
            />
          </div>
        </div>
      </div>
      <modal
        width="90%"
        height="auto"
        name="crop-modal"
        :click-to-close="false"
      >
        <div class="px-4 w-full py-8 justify-center flex">
          <ClientOnly>
            <div>
              <div class="font-bold text-center mb-5">
                Crop profile image to fit
              </div>
              <div style="width: 300px; height: 300px">
                <VueCropper
                  ref="cropper"
                  :src="profileImageUrl"
                  :aspect-ratio="1"
                  :zoomable="true"
                  style="height: 300px; width: 300px"
                  alt="Source Image"
                >
                </VueCropper>
              </div>
              <PrimaryButton text="Done" @click="handleCroppedImageSave" />
            </div>
          </ClientOnly>
        </div>
      </modal>
    </div>
  </div>
</template>

<script>
import PrimaryButton from "@/components/buttons/PrimaryButton";
import TextField from "@/components/TextField";
import SvgIcon from "@/components/SvgIcon";
import "cropperjs/dist/cropper.css";
import VueCropper from "vue-cropperjs";

export default {
  name: "StudentInfo",

  components: { SvgIcon, TextField, PrimaryButton, VueCropper },

  layout: "dashboard",

  data() {
    return {
      profileImageUrl: "",
      profileImage: "",
      textBoxReadOnly: true,
      loading: false,
      formFields: {
        first_name: "",
        last_name: "",
        email: "",
        mobile: "",
        username: "",
        address: "",
        school: "",
        al_year: "",
        gender: "",
        classes: [],
        date_from: "",
        date_to: "",
      },
    };
  },

  created() {
    this.fetchUser();
  },

  methods: {
    handleCroppedImageSave() {
      this.profileImageUrl = this.$refs.cropper.getCroppedCanvas().toDataURL();

      this.$refs.cropper.getCroppedCanvas().toBlob((blob) => {
        this.profileImage = blob;
      });

      this.$modal.hide("crop-modal");
    },

    handleFileSelect(evt) {
      const files = evt.target.files;

      if (!files) return;

      const file = files[0];

      if (file.size > 1024 * 5 * 1024) {
        this.showNotification(
          "error",
          "Image size is too big! Please use image less than 5 mb."
        );

        return;
      }

      this.profileImageUrl = URL.createObjectURL(file);
      this.profileImage = files[0];

      this.$modal.show("crop-modal");
    },

    handleReaderLoaded(e) {
      this.formFields.image = e.target.result;
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

    handleSaveButtonClick() {
      this.updateUserInfo(this.formFields);
    },

    async updateUserInfo(payload) {
      try {
        this.loading = true;

        const formData = new FormData();

        formData.append("file", this.profileImage);
        formData.append(
          "payload",
          JSON.stringify({
            ...payload,
            class_ids: payload.classes.map((c) => c.id),
          })
        );

        await this.$axios.put("user/" + this.$auth.state.user.id, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        this.loading = false;
        this.textBoxReadOnly = true;

        await this.$auth.fetchUser();

        this.showNotification("success", "User updated successfully!");

        await this.fetchUser();
      } catch (e) {
        this.loading = false;

        this.showNotification("error", e.response.data.message);
      }
    },

    async fetchUser() {
      try {
        this.loading = true;
        const { data } = await this.$axios.get(
          "user/" + this.$auth.state.user.id
        );
        this.loading = false;
        const userResponse = data.data;
        if (userResponse) {
          this.formFields = { ...this.formFields, ...userResponse };
          this.profileImageUrl = userResponse.image + "?" + Math.random() ?? "";
        }
      } catch (e) {}
    },
  },
};
</script>

<style scoped>
@media screen and (min-width: 1024px) {
  .form-width {
    width: 350px;
  }
}

.form-height {
  height: auto;
}
</style>
