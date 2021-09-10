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




<style scoped></style>