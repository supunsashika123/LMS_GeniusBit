<template>
  <div class="h-screen overflow-auto">
    <div class="m-6">
      <div class="text-2xl font-bold pt-4 text-center lg:text-left">
        Upload/Edit Video
      </div>
      <div class="flex flex-col lg:flex-row px-4 lg:px-0">
        <ValidationObserver ref="videoSubmitForm" class="w-full lg:w-1/2">
          <div class="pt-4 max-w-lg">
            <Button
              class="px-2 py-1 rounded-2xl cursor-pointer focus:outline-none mb-2"
              :class="{ 'selected-video-type': videoSource === 'vimeo' }"
              @click="videoSource = 'vimeo'"
              >Vimeo</Button
            >
            <Button
              class="px-2 py-1 rounded-2xl cursor-pointer focus:outline-none mb-2"
              :class="{ 'selected-video-type': videoSource === 'youtube' }"
              @click="videoSource = 'youtube'"
              >Youtube</Button
            >
            <TextField
              v-if="videoSource === 'vimeo'"
              v-model="url"
              rules="required"
              name="url"
              label="Add Vimeo Video ID"
            />
            <TextField
              v-if="videoSource === 'youtube'"
              v-model="url"
              rules="required"
              name="url"
              label="Add Youtube Video ID"
            />
          </div>
          <div class="pt-4 max-w-lg">
            <TextField
              v-model="title"
              rules="required"
              name="title"
              label="Add Title"
            />
          </div>
          <div class="pt-4 max-w-lg">
            <TextFieldMultipleLines
              v-model="description"
              rules="required"
              name="first_name"
              label="Add Description"
            />
          </div>
          <div>
            <div class="pt-4 block text-2xs font-normal text-black text-left">
              Select Classes
            </div>
            <multiselect
              v-model="selectedClasses"
              class="max-w-lg"
              :options="
                classesList.map((elem) => ({
                  id: elem.id,
                  name: capitalizeFirstLetter(elem.name),
                }))
              "
              :multiple="true"
              :close-on-select="false"
              track-by="id"
              label="name"
            ></multiselect>
          </div>

          <div>
            <div class="pt-4 block text-2xs font-normal text-black text-left">
              Upload Thumbnail (1280 X 720 px)
            </div>
            <input type="file" accept="image/*" @change="handleFileSelect" />
            <img class="h-24 w-48 mt-4 lg:mb-24" :src="selectedImage" alt="" />
          </div>
        </ValidationObserver>
        <div class="w-full lg:w-1/2">
          <div>
            <ValidationObserver ref="timeStampForm">
              <div class="pt-4 w-full">
                <TextField
                  v-model="currentTimestamp.title"
                  rules="required"
                  name="timestampTitle"
                  label="Add Timestamp Title"
                />
              </div>
              <div
                class="flex flex-col lg:flex-row lg:items-end justify-between w-full lg:max-w-lg"
              >
                <div class="">
                  <div class="pt-4 w-full lg:max-w-lg">
                    <TextField
                      v-model="currentTimestamp.minutes"
                      rules="required"
                      type="number"
                      name="timestampTimekjhg"
                      label="Minutes"
                    />
                  </div>
                </div>
                <div class="">
                  <div class="pt-4 w-full lg:max-w-lg">
                    <TextField
                      v-model="currentTimestamp.seconds"
                      type="number"
                      rules="required"
                      name="timestampTime"
                      label="Seconds"
                    />
                  </div>
                </div>
                <div class="">
                  <PrimaryButton text="Add" @click="addTimestamp" />
                </div>
              </div>
            </ValidationObserver>
            <div class="pt-4">Timestamps List</div>
            <div class="overflow-y-auto h-48 max-w-lg mt-4">
              <div
                v-for="(timestamp, index) in timestamps"
                :key="index"
                class="flex"
              >
                <div class="w-1/2">
                  <div class="pt-4 max-w-lg">
                    <TextField
                      :value="timestamp.title"
                      rules="required"
                      name="timestampTitle"
                      label=""
                      :disabled="true"
                    />
                  </div>
                </div>
                <div class="w-1/2 px-4">
                  <div class="pt-4 max-w-lg">
                    <TextField
                      :value="timestamp.minutes"
                      rules="required"
                      name="timestampTime"
                      label=""
                      :disabled="true"
                    />
                  </div>
                </div>
                <div class="w-1/2 px-4 flex items-center">
                  <div class="pt-4 max-w-lg">
                    <TextField
                      :value="timestamp.seconds"
                      rules="required"
                      name="timestampTime"
                      label=""
                      :disabled="true"
                    />
                  </div>
                </div>
                <button
                  class="text-red font-bold focus:outline-none pt-4"
                  @click="deleteTimestamp(index)"
                >
                  Delete
                </button>
              </div>
            </div>
            <div class="flex justify-center pt-12 pb-24">
              <div>
                <PrimaryButton text="Done" @click="handleVideoUploadClick" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TextField from '@/components/TextField'
import PrimaryButton from '@/components/buttons/PrimaryButton'
import Multiselect from 'vue-multiselect'
import { ValidationObserver } from 'vee-validate'
import moment from 'moment'
import TextFieldMultipleLines from '~/components/TextFieldMultipleLines'

export default {
  name: 'UploadVideo',

  components: {
    TextFieldMultipleLines,
    PrimaryButton,
    TextField,
    Multiselect,
    ValidationObserver,
  },

  layout: 'admin',

  data() {
    return {
      id: this.$route.query.id ?? '',
      videoSource: 'vimeo',
      selectedImage: '',
      selectedClasses: [],
      timestamps: [],
      classesList: [],
      title: '',
      description: '',
      url: '',
      currentTimestamp: {
        title: '',
        minutes: '',
        seconds: '',
      },
    }
  },

  created() {
    this.fetchClasses()
  },

  methods: {
    capitalizeFirstLetter(text) {
      return text.charAt(0).toUpperCase() + text.slice(1)
    },

    async fetchVideo() {
      const { data } = await this.$axios.get('video/' + this.id)

      this.title = data.data.title
      this.url =
        data.data.source === 'vimeo'
          ? data.data.url.split('https://player.vimeo.com/video/')[1]
          : data.data.url
      this.description = data.data.description

      const tmp = []
      data.data.classes.forEach((c) => {
        const t = this.classesList.filter((old) => old.id === c)[0]
        if (t) tmp.push(t)
      })

      this.selectedClasses = tmp

      this.selectedImage = data.data.thumbnail
      this.timestamps = data.data.timestamps
      this.videoSource = data.data.source
    },

    showNotification(type, text) {
      this.$notify({
        type,
        group: 'foo',
        title: type === 'success' ? 'Success' : 'Error!',
        text,
        position: 'top right',
      })
    },

    handleFileSelect(evt) {
      const files = evt.target.files
      const file = files[0]
      if (files && file) {
        const reader = new FileReader()
        reader.onload = this.handleReaderLoaded.bind(this)
        reader.readAsBinaryString(file)
      }
    },

    handleReaderLoaded(e) {
      this.selectedImage = 'data:image/png;base64,' + btoa(e.target.result)
    },

    async addTimestamp() {
      if (!(await this.$refs.timeStampForm.validate())) {
        this.showNotification('error', 'Please fill required fields.')
        return false
      }

      this.timestamps.push(this.currentTimestamp)
      this.currentTimestamp = { title: '', minutes: '', seconds: '' }
      await this.$refs.timeStampForm.reset()
    },

    deleteTimestamp(index) {
      this.timestamps.splice(index, 1)
    },

    async fetchClasses() {
      try {
        this.isLoading = true

        const { data } = await this.$axios.get('class')

        this.isLoading = false
        if (data) {
          this.classesList = data.data

          if (this.id) await this.fetchVideo()
        }
      } catch (e) {}
    },

    async resetFields() {
      this.title = ''
      this.description = ''
      this.url = ''
      this.selectedClasses = []
      this.selectedImage = ''
      this.timestamps = []

      await this.$refs.videoSubmitForm.reset()
    },

    async uploadVideo() {
      try {
        await this.$axios.post('video', {
          title: this.title,
          description: this.description,
          source: this.videoSource,
          url:
            this.videoSource === 'vimeo'
              ? 'https://player.vimeo.com/video/' + this.url
              : this.url,
          classes: this.selectedClasses.map((c) => c.id),
          thumbnail: this.selectedImage,
          timestamps: this.timestamps,
        })
        this.showNotification('success', 'Video submitted successfully!')
        await this.resetFields()
        return this.$router.push('videos')
      } catch (e) {
        this.showNotification('error', 'Video submit error!')
      }
    },

    async updateVideoInfo() {
      try {
        await this.$axios.put('video/' + this.id, {
          title: this.title,
          description: this.description,
          url:
            this.videoSource === 'vimeo'
              ? 'https://player.vimeo.com/video/' + this.url
              : this.url,
          classes: this.selectedClasses.map((c) => c.id),
          thumbnail: this.selectedImage,
          timestamps: this.timestamps,
          source: this.videoSource,
        })
        this.showNotification('success', 'Video info updated successfully!')
        await this.resetFields()
        return this.$router.push('videos')
      } catch (e) {
        this.showNotification('error', 'Something went wrong!')
      }
    },

    async handleVideoUploadClick() {
      if (!(await this.$refs.videoSubmitForm.validate())) {
        this.showNotification('error', 'Please fill required fields.')
        return false
      }

      if (!this.selectedClasses.length) {
        this.showNotification('error', 'Please add classes!')
        return false
      }

      if (!this.selectedImage) {
        this.showNotification('error', 'Please add thumbnail!')
        return false
      }

      if (!this.id) {
        await this.uploadVideo()
        return false
      }

      await this.updateVideoInfo()
    },
  },
}
</script>

<style scoped>
.selected-video-type {
  background: red;
  color: white;
}
</style>
