<template>
  <div class="h-screen overflow-auto">
    <div class="m-6">
      <div
        class="flex flex-col justify-center md:flex-row items-center justify-between"
      >
        <div class="text-2xl font-bold pt-4 text-center lg:text-left pb-4">
          Documents
        </div>
      </div>
      <div class="flex flex-col md:flex-row items-center mb-8">
        <div class="w-full md:w-1/3">
          <label class="block text-2xs font-normal text-black text-left">
            Select type
          </label>
          <select
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
            @click="fetchDocuments"
          />
        </div>
      </div>
      <div
        v-if="documentList.length"
        class="pt-6 px-4 pb-4 flex items-center flex-wrap pb-12"
      >
        <DocumentThumbnailPreviewUser
          v-for="(doc, index) of documentList"
          :key="index"
          :doc="doc"
          title=""
          class="card-size flex-grow flex-shrink-0 justify-start my-4 mx-4"
        />
        <div class="flex-grow mx-4 card-width flex-shrink-0 h-0"></div>
        <div class="flex-grow mx-4 card-width flex-shrink-0 h-0"></div>
        <div class="flex-grow mx-4 card-width flex-shrink-0 h-0"></div>
        <div class="flex-grow mx-4 card-width flex-shrink-0 h-0"></div>
      </div>
      <div v-else>
        <div class="text-2xl text-center text-gray-800">
          No available documents.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PrimaryButton from '@/components/buttons/PrimaryButton'
import DocumentThumbnailPreviewUser from '@/components/document/DocumentThumbnailPreviewUser'

export default {
  name: 'Documents',

  components: {
    DocumentThumbnailPreviewUser,
    PrimaryButton,
  },

  layout: 'dashboard',

  data() {
    return {
      selectedAlYear: new Date().getFullYear(),
      documentList: [],
      selectedStatus: 'pending',
      selectedClassId: '',
      user: [],
      loading: false,
    }
  },

  computed: {
    availableALYears() {
      const currentYear = new Date().getFullYear()
      return [currentYear, currentYear + 1, currentYear + 2]
    },
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
        this.isLoading = true
        const { data } = await this.$axios.get(
          'user/' + this.$store.state.auth.user._id
        )
        this.isLoading = false
        const userResponse = data.data
        this.user = userResponse
        this.selectedClassId = userResponse.classes[0]._id
        await this.fetchDocuments()
      } catch (e) {}
    },

    async fetchDocuments() {
      try {
        this.loading = true
        const { data } = await this.$axios.get('doc/getFiltered', {
          params: {
            classes: this.selectedClassId,
            status: 'active',
          },
        })
        this.loading = false
        if (data) {
          this.documentList = data.data
        }
      } catch (e) {}
    },
  },
}
</script>

<style scoped>
.card-size {
  width: 200px;
  height: 300px;
}
.card-width {
  width: 200px;
}
</style>
