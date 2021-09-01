<template>
  <div
    class="background-image w-full flex h-screen items-center justify-center"
  >
    <div class="items-center justify-center box-shadow">
      <img
        class="image-width rounded-lg"
        src="~/assets/images/welcome.png"
        alt="Welcome Image"
      />
      <SuccessButton
        text="Continue"
        class="flex justify-center"
        @click="handleContinueButtonClick"
      />
    </div>
  </div>
</template>

<script>
import SuccessButton from "@/components/buttons/SuccessButton";

export default {
  name: "Success",

  components: { SuccessButton },

  middleware: "guest",

  layout: "authentication",

  methods: {
    handleContinueButtonClick() {
      return this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.greeting-text {
  font-size: 32px;
}

/*.background-image {*/
/*  background-image: url('../../assets/images/Background.jpg');*/
/*  background-repeat: no-repeat;*/
/*  background-size: cover;*/
/*}*/

.image-width {
  width: auto;
}

@media screen and (min-width: 768px) {
  .image-width {
    width: 300px;
  }
}

@media screen and (min-width: 1024px) {
  .image-width {
    width: 400px;
  }

  .box-shadow {
    box-shadow: 0 4px 40px rgba(167, 169, 190, 0.5);
  }
}
</style>
