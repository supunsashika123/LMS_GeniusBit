<template>
  <div class="h-screen overflow-auto">
    <div class="m-6">
      <modal
        width="90%"
        height="auto"
        name="classes-modal"
        :click-to-close="false"
      >
        <div class="px-4 w-full table-width py-8">
          <div class="w-full">
            <div class="flex justify-between">
              <div class="text-xl font-bold pb-2">Add New Course</div>
              <button class="focus:outline-none" @click="close">
                <SvgIcon name="cross" class="h-6 w-6 focus:outline-none mr-4" />
              </button>
            </div>
            <div class="pt-2">
              <TextField
                v-model="name"
                rules="required"
                name="name"
                label=" Name"
              />
            </div>
            <div class="pt-2">
              <label class="block text-2xs font-normal text-black text-left">
                Course Type
              </label>
              <select
                id="class_type"
                v-model="type"
                class="border mt-1 h-10 w-full border-gray-800 focus:outline-none rounded-lg py-2"
                name="type"
              >
                <option value="" selected disabled>Please Select</option>
                <option value="robotics">Robotics</option>
                <option value="test 2">Test 2</option>
                <option value="test 3">Test 3</option>
              </select>
            </div>
            <div class="pt-2">
              <label class="block text-2xs font-normal text-black text-left">
                Course Year
              </label>
              <select
                id="alYear"
                v-model="year"
                class="border mt-1 h-10 w-full border-gray-800 focus:outline-none rounded-lg py-2"
                name="alYear"
              >
                <option value="" disabled selected>Please Select</option>
                <option v-for="y of availableALYears" :key="y" :value="y">
                  {{ y }}
                </option>
              </select>
            </div>
            <div class="pt-2">
              <label class="block text-2xs font-normal text-black text-left">
                Institute Location
              </label>
              <select
                id="institute"
                v-model="institute"
                class="border mt-1 h-10 w-full border-gray-800 focus:outline-none rounded-lg py-2"
                name="institute"
              >
                <option value="" selected>Select Institute</option>
                <option value="Colombo">Colombo</option>
                <option value="Gampaha">Gampaha</option>
                <option value="NIBM">NIBM</option>
                <option value="Online">Online</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div class="pt-4" @click="handleClassFormClick()">
              <PrimaryButton :text="modalButtonText" :loading="isLoading" />
            </div>
          </div>
        </div>
      </modal>
      <div class="flex justify-between items-center">
        <div class="text-2xl font-bold pt-4 text-center lg:text-left pb-4">
          Courses
        </div>
        <PendingTableRemoveButton
          class="px-4 py-2"
          text="Add new course"
          @click="showNewModal"
        />
      </div>
      <div class="flex flex-col lg:flex-row">
        <div class="w-full overflow-auto min-width table-height">
          <div
            v-for="(singleClass, index) of classesList"
            :key="index"
            class="flex bg-blue-light px-4 py-2 rounded-lg mt-2"
          >
            <div class="w-48">{{ singleClass.name }}</div>
            <div class="w-48">
              {{ capitalizeFirstLetter(singleClass.type) }}
            </div>
            <div class="w-48">{{ singleClass.year }}</div>
            <div class="w-48">{{ singleClass.institute }}</div>
            <div class="flex">
              <PendingTableRemoveButton
                text="Update"
                class="px-4"
                @click="showUpdateModal(singleClass)"
              />
              <PendingTableRemoveButton
                text="Delete"
                class="px-4 ml-4"
                @click="handleDeleteButtonClick(singleClass)"
              />
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
import PendingTableRemoveButton from '@/components/admin/pending-page/PendingTableRemoveButton'
import SvgIcon from '@/components/SvgIcon'

export default {
  name: 'Classes',

  components: { SvgIcon, PendingTableRemoveButton, PrimaryButton, TextField },

  middleware: 'guest',

  layout: 'admin',

  data() {
    return {
      name: '',
      type: '',
      year: '',
      institute: '',
      classesList: [],
      isLoading: false,
      modalButtonText: 'Add',
      isUpdate: false,
      classId: '',
      selectedClassType: '',
      deactivated: false,
    }
  },

  computed: {
    availableALYears() {
      const currentYear = new Date().getFullYear()
      return [currentYear, currentYear + 1, currentYear + 2]
    },
  },

  created() {
    this.fetchClasses()
  },

  methods: {
    capitalizeFirstLetter(text) {
      return text.charAt(0).toUpperCase() + text.slice(1)
    },

    handleDeleteButtonClick(classObj) {
      this.$confirm({
        message: `Are you sure want to delete the the class?`,
        button: {
          no: 'No',
          yes: 'Delete class',
        },
        callback: async (confirm) => {
          if (confirm) {
            try {
              this.isLoading = true
              await this.$axios.delete('class/' + classObj.id)

              await this.fetchClasses()

              this.isLoading = false
            } catch (e) {}
          }
        },
      })
    },

    showNewModal() {
      this.name = ''
      this.type = ''
      this.year = ''
      this.deactivated = false
      this.institute = ''
      this.modalButtonText = 'Add'
      this.isUpdate = false

      this.$modal.show('classes-modal')
    },

    close() {
      this.isUpdate = false
      this.$modal.hide('classes-modal')
    },

    showUpdateModal(singleClass) {
      this.isUpdate = true
      this.name = singleClass.name
      this.type = singleClass.type
      this.year = singleClass.year.toString()
      this.institute = singleClass.institute
      this.classId = singleClass.id
      this.deactivated = singleClass.deactivated
      this.modalButtonText = 'Update'

      this.$modal.show('classes-modal')
    },

    async handleClassFormClick() {
      try {
        this.isLoading = true

        if (!this.name || !this.type || !this.year || !this.institute) {
          this.$notify({
            type: 'error',
            group: 'foo',
            title: 'Form error!',
            text: 'Empty fields!',
            position: 'top right',
          })

          this.isLoading = false
          return false
        }

        const payload = {
          name: this.name,
          type: this.type,
          year: this.year,
          institute: this.institute,
          deactivated: this.deactivated,
        }

        if (this.isUpdate) {
          const res = await this.$axios.put('class/' + this.classId, payload)

          this.isLoading = false

          if (res.data.status === 'success') {
            this.$notify({
              type: 'success',
              group: 'foo',
              title: 'Success!',
              text: 'Class updated successfully!',
              position: 'top right',
            })

            this.$modal.hide('classes-modal')

            await this.fetchClasses()
          }
          return false
        }

        const { data } = await this.$axios.post('class/', payload)

        if (data.status === 'success') {
          this.$notify({
            type: 'success',
            group: 'foo',
            title: 'Success!',
            text: 'Class added successfully!',
            position: 'top right',
          })

          this.$modal.hide('classes-modal')

          await this.fetchClasses()
        }

        this.isLoading = false
      } catch (e) {
        this.$notify({
          type: 'error',
          group: 'foo',
          title: 'Form error!',
          text: 'Something went wrong in classes!',
          position: 'top right',
        })

        this.isLoading = false
      }
      this.$modal.hide('classes-modal')
    },

    async fetchClasses() {
      try {
        this.isLoading = true

        const { data } = await this.$axios.get('class/')

        this.isLoading = false
        if (data) {
          this.classesList = data.data
        }
      } catch (e) {}
    },
  },
}
</script>

<style scoped>
.table-width {
  min-width: 450px;
}

.table-height {
  height: 400px;
}

.min-width {
  min-width: 500px;
}
</style>
