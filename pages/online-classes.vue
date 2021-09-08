<template>
  <div class="h-screen overflow-auto">
    <div class="m-6">
      <div
        class="flex flex-col justify-center md:flex-row items-center justify-between"
      >
        <div class="text-2xl font-bold pt-4 text-center lg:text-left pb-4">
          Videos
        </div>
      </div>
      <div class="flex flex-col md:flex-row items-center mb-24">
        <div class="w-full md:w-1/3">
          <label class="block text-2xs font-normal text-black text-left">
            Select Class
          </label>
          <select
            v-if="user.classes && user.classes.length"
            v-model="selectedClassId"
            class="border mt-1 h-10 w-full border-gray-800 focus:outline-none rounded-lg py-2"
            name="type"
          >
            <option
              v-for="(c, index) of user.classes"
              :key="index"
              :value="c.id"
            >
              {{ c.year }} - {{ capitalizeFirstLetter(c.type) }}
            </option>
          </select>
        </div>
        <div class="ml-4 mt-4">
          <PrimaryButton
            text="Filter"
            :loading="loading"
            class="px-4"
            @click="fetchVideos"
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
      <div v-else>
        <div class="text-2xl text-center text-gray-800">
          No available videos.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PrimaryButton from '@/components/buttons/PrimaryButton'
import VideoThumbnailPreview from '@/components/video/VideoThumbnailPreview'

export default {
  name: 'OnlineClasses',

  components: { VideoThumbnailPreview, PrimaryButton },

  layout: 'dashboard',

  data() {
    return {
      videoList: [],
      userClassList: [],
      selectedClassId: '',
      user: [],
      loading: false,
    }
  },

  created() {
    this.fetchUser()
  },

  methods: {
    capitalizeFirstLetter(text) {
      return text.charAt(0).toUpperCase() + text.slice(1)
    },

    async fetchUser() {
      try {
        this.loading = true
        const { data } = await this.$axios.get(
          'user/' + this.$store.state.auth.user._id
        )
        this.loading = false
        const userResponse = data.data
        this.user = userResponse
        this.selectedClassId = userResponse.classes[0]._id
        await this.fetchVideos()
      } catch (e) {}
    },

    handleVideoClick(id) {
      return this.$router.push({
        path: '/video',
        query: { id },
      })
    },

    async fetchVideos() {
      try {
        this.isLoading = true
        const { data } = await this.$axios.get('video/getFiltered', {
          params: {
            class_id: this.selectedClassId,
          },
        })
        this.isLoading = false
        this.videoList = data.data
      } catch (e) {}
    },
  },
}
</script>

<style scoped>
.card-size {
  width: 300px;
}

.card-width {
  width: 300px;
}
</style>
