<template>
  <div class="h-screen overflow-auto">
    <div class="m-6">
      <div class="text-2xl font-bold pt-4 text-center lg:text-left pb-4">
        {{ video.title }}
      </div>
      <div class="flex flex-col">
        <div class="flex flex-col lg:flex-row">
          <div v-if="renderVideoPlayer" class="w-full player-height lg:w-7/12">
            <client-only
              ><vimeo-player
                v-if="video.source === 'vimeo'"
                ref="plyr"
                class="embed-container"
                :video-id="videoUrl"
                :options="{ responsive: true }"
            /></client-only>

            <client-only>
              <vue-plyr v-if="video.source === 'youtube'" ref="youtubePlayer">
                <div
                  data-plyr-provider="youtube"
                  :data-plyr-embed-id="video.url"
                ></div>
              </vue-plyr>
            </client-only>
          </div>
          <div class="w-1/12"></div>
          <div
            class="w-full timestamps-card-size lg:w-3/12 mt-6 lg:mt-0 overflow-auto p-4 border border-gray-600 rounded-lg text-center"
          >
            <div class="w-full">
              <div class="font-bold pb-2">Chapters</div>
              <div
                v-for="(stamp, index) of video.timestamps"
                :key="index"
                class="py-2 border-t-1 text-text-gray-900 text-left px-2 hover:text-purple-800"
              >
                <button class="text-left" @click="handleJumpToTimeStamp(stamp)">
                  {{ stamp.title }}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="pb-32">
          <div
            class="flex w-full lg:w-11/12 overflow-auto bg-white border border-gray-600 mt-6 rounded-lg"
          >
            <span class="whitespace-pre-wrap text-justify px-4 py-4">{{
              video.description
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VideoInfo',

  components: {},

  head() {
    return {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://unpkg.com/vue-plyr/dist/vue-plyr.css',
        },
      ],
    }
  },

  data() {
    return {
      id: this.$route.query.id,
      video: {},
      player: {},
      renderVideoPlayer: false,
      videoUrl: '',
      videoSource: '',
    }
  },

  created() {
    this.fetchVideo()
  },

  layout: 'dashboard',

  methods: {
    handleJumpToTimeStamp({ minutes, seconds }) {
      const time = minutes * 60 + +seconds

      if (this.video.source === 'vimeo')
        this.$refs.plyr.player.setCurrentTime(parseInt(time))
      else this.$refs.youtubePlayer.player.currentTime = parseInt(time)
    },

    async fetchVideo() {
      const { data } = await this.$axios.get('video/' + this.id)
      this.video = data.data
      this.videoUrl = data.data.url

      setTimeout(() => {
        this.renderVideoPlayer = true
      }, 200)
    },
  },
}
</script>

<style scoped>
.timestamps-card-size {
  height: 200px;
}

@media screen and (min-width: 1024px) {
  .timestamps-card-size {
    height: 328px;
  }
}

@media screen and (min-width: 1440px) {
  .timestamps-card-size {
    height: 511px;
  }
}

@media screen and (min-width: 1688px) {
  .timestamps-card-size {
    height: auto;
  }
}

.embed-container {
  width: 100% !important;
}

.player-height {
}
</style>
