<template>
  <div class="lg:ml-12">
    <div class="text-2xl font-bold pt-12 text-center lg:text-left">
      Upload Document
    </div>
    <div class="flex flex-col lg:flex-row">
      <ValidationObserver
        ref="documentSubmitForm"
        class="w-full px-8 lg:px-0 lg:w-1/2"
      >
        <div class="pt-4 max-w-lg">
          <div>
            <div class="pt-4 block text-2xs font-normal text-black text-left">
              Upload Document
            </div>
            <input
              type="file"
              accept="application/pdf"
              @change="handleDocumentSelect"
            />
          </div>
        </div>
        <div class="pt-4 max-w-lg">
          <TextField
            v-model="title"
            rules="required"
            name="title"
            label="Add title"
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
        <div class="flex flex-col lg:flex-row justify-between max-w-lg mt-4">
          <div class="max-w-lg pt-4 lg:pt-0">
            <div>
              <label class="block text-2xs font-normal text-black text-left"
                >Select auto publish date
              </label>
              <div class="mt-1 relative rounded-md">
                <client-only>
                  <datetime
                    v-model="auto_publish_date"
                    input-class="appearance-none w-full block w-full flex items-center h-10 px-2 border border-gray-800 rounded-lg placeholder-gray-400 focus:outline-none transition duration-150 ease-in-out text-sm sm:leading-5 font-medium"
                    type="datetime"
                    :minute-step="15"
                  >
                  </datetime>
                </client-only>
              </div>
            </div>
          </div>
          <div class="max-w-lg">
            <div>
              <label class="block text-2xs font-normal text-black text-left"
                >Select expiry date
              </label>
              <div class="mt-1 relative rounded-md">
                <client-only>
                  <datetime
                    v-model="expiry_date"
                    input-class="appearance-none w-full block w-full flex items-center h-10 px-2 border border-gray-800 rounded-lg placeholder-gray-400 focus:outline-none transition duration-150 ease-in-out text-sm sm:leading-5 font-medium"
                    type="datetime"
                    :minute-step="15"
                  ></datetime>
                </client-only>
              </div>
            </div>
          </div>
        </div>
        <div class="flex items-end">
          <div class="flex justify-center mt-6 mb-16">
            <PrimaryButton
              :loading="loading"
              text="Upload"
              @click="handleDocumentUploadClick"
            />
            <PrimaryButton
              v-if="id"
              class="ml-4"
              :loading="loading"
              text="Delete"
              @click="handleDeleteButtonClick"
            />
          </div>
        </div>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import PrimaryButton from '@/components/buttons/PrimaryButton'
import Multiselect from 'vue-multiselect'
import { ValidationObserver } from 'vee-validate'
import TextField from '@/components/TextField'
import moment from 'moment'

export default {
  name: 'UploadDocument',

  components: {
    TextField,
    PrimaryButton,
    Multiselect,
    ValidationObserver,
  },

  layout: 'admin',

  data() {
    return {
      id: this.$route.query.id ?? '',
      selectedImage: '',
      classesList: [],
      title: '',
      selectedClasses: [],
      expiry_date: new Date().toISOString(),
      auto_publish_date: new Date().toISOString(),
      pdf: '',
      loading: false,
    }
  },

  created() {
    this.fetchClasses()
  },

  methods: {
    capitalizeFirstLetter(text) {
      return text.charAt(0).toUpperCase() + text.slice(1)
    },

    handleDeleteButtonClick() {
      this.$confirm({
        message: `Are you sure want to delete this file?`,
        button: {
          no: 'No',
          yes: 'Delete',
        },
        callback: (confirm) => {
          if (confirm) {
            this.deleteDocument()
          }
        },
      })
    },

    async deleteDocument() {
      try {
        this.loading = true
        await this.$axios.put('doc/' + this.id, {
          classes: this.selectedClasses.map((c) => c.id),
          deleted: true,
        })
        this.showNotification('success', 'File deleted successfully!')
        return this.$router.push({
          path: 'documents',
        })
      } catch (e) {
        this.loading = false
        this.showNotification('error', 'File delete error!')
      }
    },

    async fetchDocument() {
      this.loading = true
      const { data } = await this.$axios.get('doc/' + this.id)
      this.loading = false

      this.title = data.data.title
      this.expiry_date = data.data.expiry_date
      this.auto_publish_date = data.data.auto_publish_date

      const tmp = []
      data.data.classes.forEach((c) => {
        tmp.push(this.classesList.filter((old) => old.id === c)[0])
      })

      this.selectedClasses = tmp
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

    handleDocumentSelect(evt) {
      const files = evt.target.files
      this.pdf = files[0]
    },

    async fetchClasses() {
      try {
        this.loading = true
        const { data } = await this.$axios.get('class')
        this.loading = false
        if (data) {
          this.classesList = data.data
          if (this.id) await this.fetchDocument()
        }
      } catch (e) {}
    },

    async resetFields() {
      this.title = ''
      this.selectedClasses = []
      this.selectedImage = ''
      this.expiry_date = ''
      this.auto_publish_date = ''

      await this.$refs.documentSubmitForm.reset()
    },

    async handleDocumentUploadClick() {
      if (!(await this.$refs.documentSubmitForm.validate())) {
        this.showNotification('error', 'Please fill required fields.')
        return false
      }

      if (!this.title) {
        this.showNotification('error', 'Please add title!')
        return false
      }

      if (!this.selectedClasses.length) {
        this.showNotification('error', 'Please select classes!')
        return false
      }

      if (!this.expiry_date) {
        this.showNotification('error', 'Please select expiry date!')
        return false
      }

      if (!this.auto_publish_date) {
        this.showNotification('error', 'Please select publish date!')
        return false
      }

      const publishDate = new Date(this.auto_publish_date)
      const expiryDate = new Date(this.expiry_date)

      if (expiryDate < publishDate) {
        this.showNotification(
          'error',
          'Expiration date is greater than publish date!'
        )
        return false
      }

      if (!this.id) {
        await this.postDocument()
      } else {
        await this.updateDocument()
      }
    },

    async postDocument() {
      if (!this.pdf) {
        this.showNotification('error', 'Please upload file!')
        return false
      }

      try {
        const formData = new FormData()
        formData.append('file', this.pdf)
        formData.append(
          'payload',
          JSON.stringify({
            title: this.title,
            classes: this.selectedClasses.map((c) => c.id),
            expiry_date: moment.utc(this.expiry_date),
            auto_publish_date: moment.utc(this.auto_publish_date),
          })
        )

        this.loading = true
        await this.$axios.post('doc', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })

        this.loading = false

        this.showNotification('success', 'Document submitted successfully!')

        await this.resetFields()
      } catch (e) {
        this.showNotification(
          'error',
          'Something went wrong when uploading doc!'
        )
      }
    },

    async updateDocument() {
      try {
        this.loading = true
        await this.$axios.put('doc/' + this.id, {
          title: this.title,
          classes: this.selectedClasses.map((c) => c.id),
          expiry_date: this.expiry_date,
          auto_publish_date: this.auto_publish_date,
          url: this.url,
          deleted: false,
        })
        this.loading = false

        this.showNotification('success', 'Document submitted successfully!')

        await this.resetFields()
      } catch (e) {
        this.showNotification(
          'error',
          'Something went wrong when uploading doc!'
        )
      }
    },
  },
}
</script>

<style scoped></style>