<template>
  <div class="h-screen overflow-auto">
    <div class="m-6">
      <div
        class="
          flex flex-col
          justify-center
          md:flex-row
          items-center
          justify-between
        "
      >
        <div class="text-2xl font-bold pt-4 text-center lg:text-left pb-4">
          Videos
        </div>
        <div class="flex flex-col md:flex-row mt-8 sm:mt-0 sm:ml-8 md:ml-0">
          <NuxtLink to="admin/upload-video">
            <div class="flex justify-center">
              <PendingTableRemoveButton
                class="text-center px-4 py-2"
                text="Add Video"
              />
            </div>
          </NuxtLink>
        </div>
      </div>
      <div class="flex flex-col md:flex-row items-center mb-8">
        <div class="w-full md:w-1/3">
          <label class="block text-2xs font-normal text-black text-left">
            Select type
          </label>
          <select
            v-model="selectedVideoType"
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
            name="type"
          >
            <option value="pending">Pending</option>
            <option value="expired">Expired</option>
            <option value="active" selected>Active</option>
          </select>
        </div>
        <div class="ml-4 lg:mr-2">
          <div class="block text-2xs font-normal text-black text-left">
            Select
          </div>
          <select
            v-model="selectedClass"
            name=""
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
          >
            <option selected value="">All</option>
            <option
              v-for="(classItem, index) of classesList"
              :key="index"
              :value="classItem.id"
            >
              {{
                classItem.name +
                " " +
                classItem.type +
                " " +
                classItem.year +
                " " +
                classItem.institute
              }}
            </option>
          </select>
        </div>
        <div class="ml-4 mt-4">
          <PrimaryButton
            text="Filter"
            :loading="loading"
            class="px-4"
            @click="handleFilterButtonClick"
          />
        </div>
      </div>
      <div
        v-if="videoList.length"
        class="sm:mx-2 flex items-center flex-wrap pb-12"
      >
        <VideoThumbnailPreview
          v-for="video of videoList"
          :key="video.id"
          :thumbnail="video.thumbnail"
          :title="video.title"
          :description="video.description"
          class="mx-4 my-4 card-size flex-grow flex-shrink-0 justify-start"
          @click="handleVideoClick(video.id)"
        />
        <div class="flex-grow mx-4 card-width flex-shrink-0 h-0"></div>
        <div class="flex-grow mx-4 card-width flex-shrink-0 h-0"></div>
        <div class="flex-grow mx-4 card-width flex-shrink-0 h-0"></div>
        <div class="flex-grow mx-4 card-width flex-shrink-0 h-0"></div>
      </div>
    </div>
  </div>
</template>

<script>
import PrimaryButton from "@/components/buttons/PrimaryButton";
import VideoThumbnailPreview from "@/components/video/VideoThumbnailPreview";
import PendingTableRemoveButton from "@/components/admin/pending-page/PendingTableRemoveButton";

export default {
  name: "Videos",

  components: {
    PendingTableRemoveButton,
    VideoThumbnailPreview,
    PrimaryButton,
  },

  layout: "admin",

  middleware: "guest",

  data() {
    return {
      videoList: [],
      selectedVideoType: "active",
      loading: false,
      classesList: [],
      selectedClass: "",
    };
  },

  created() {
    this.fetchVideos();
    this.fetchClasses();
  },

  methods: {
    async handleFilterButtonClick() {
      await this.fetchVideos();
    },

    async fetchClasses() {
      try {
        this.isLoading = true;
        const { data } = await this.$axios.get("class");
        this.isLoading = false;
        if (data) {
          this.classesList = data.data;
        }
      } catch (e) {}
    },

    handleVideoClick(id) {
      return this.$router.push({
        path: "upload-video",
        query: { id },
      });
    },

    async fetchVideos() {
      try {
        this.loading = true;

        let params = {
          status: this.selectedVideoType,
        };

        if (this.selectedClass) {
          params = { ...params, classes: this.selectedClass };
        }

        const { data } = await this.$axios.get("video/getFiltered", {
          params,
        });

        this.loading = false;

        this.videoList = data.data;
      } catch (e) {}
    },
  },
};
</script>

<style scoped>
.card-size {
  width: 300px;
}

.card-width {
  width: 300px;
}
</style>
