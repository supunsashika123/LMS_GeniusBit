<template>
  <div class="h-screen overflow-auto">
    <div class="m-6">
      <div
        class="flex flex-col justify-center md:flex-row items-center justify-between"
      >
        <div class="text-2xl font-bold pt-4 text-center lg:text-left pb-4">
          Documents
        </div>
        <div>
          <NuxtLink to="admin/upload-document">
            <div class="md:ml-4 flex justify-center">
              <PendingTableRemoveButton
                class="text-center px-4 py-2"
                text="Upload Doc"
              />
            </div>
          </NuxtLink>
        </div>
      </div>
      <div class="flex flex-col md:flex-row items-center mb-8 px-4 md:px-0">
        <div class="w-full md:w-1/3">
          <label class="block text-2xs font-normal text-black text-left">
            Select type
          </label>
          <select
            v-model="selectedStatus"
            class="border mt-1 h-10 w-full border-gray-800 focus:outline-none rounded-lg py-2"
            name="type"
          >
            <option value="pending">Pending</option>
            <option value="expired">Expired</option>
            <option value="active" selected>Active</option>
          </select>
        </div>
        <div class="ml-4 mt-4">
          <PrimaryButton text="Filter" class="px-4" @click="fetchDocuments" />
        </div>
      </div>
      <div class="pt-6 px-4 pb-4 flex items-center flex-wrap pb-12">
        <div
          v-for="(doc, index) of documentList"
          :key="index"
          class="card-size flex-grow flex-shrink-0 justify-start my-4"
        >
          <DocumentThumbnailPreview :doc="doc" title="" class="mx-4" />
          <!--          <DocumentEditButton text="Edit" @click="handleEditDocClick(doc.id)" />-->
        </div>
        <div class="flex-grow mx-1 card-width flex-shrink-0 h-0"></div>
        <div class="flex-grow mx-1 card-width flex-shrink-0 h-0"></div>
        <div class="flex-grow mx-1 card-width flex-shrink-0 h-0"></div>
        <div class="flex-grow mx-1 card-width flex-shrink-0 h-0"></div>
      </div>
    </div>
  </div>
</template>

<script>
import PrimaryButton from '@/components/buttons/PrimaryButton'
import DocumentThumbnailPreview from '@/components/document/DocumentThumbnailPreview'
import PendingTableRemoveButton from '@/components/admin/pending-page/PendingTableRemoveButton'

export default {
  name: 'Documents',

  auth: 'guest',

  components: {
    PendingTableRemoveButton,
    DocumentThumbnailPreview,
    PrimaryButton,
  },

  layout: 'admin',

  data() {
    return {
      documentList: [],
      selectedStatus: 'active',
    }
  },

  created() {
    this.fetchDocuments()
  },

  methods: {
    async fetchDocuments() {
      try {
        this.isLoading = true
        const { data } = await this.$axios.get('doc/getFiltered', {
          params: {
            status: this.selectedStatus,
          },
        })
        this.isLoading = false
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
