<template>
  <div class="h-screen overflow-auto">
    <div class="m-6">
      <modal
        width="90%"
        height="auto"
        name="student-modal"
        :click-to-close="false"
      >
        <div class="lg:ml-12 overflow-auto h-screen lg:h-auto">
          <div class="flex justify-between">
            <div class="text-2xl ml-4 font-bold pt-6 text-center lg:text-left">
              Student Info
            </div>
            <button class="focus:outline-none" @click="closeStudentModal">
              <SvgIcon name="cross" class="h-6 w-6 focus:outline-none mr-4" />
            </button>
          </div>
          <ValidationObserver
            ref="editUserForm"
            class="
              lg:mr-12
              flex flex-col
              lg:flex-row
              pt-4
              md:ml-4
              overflow-auto
            "
          >
            <div class="text-center lg:hidden">
              <div class="text-center">
                <SvgIcon
                  v-if="!formFields.image"
                  name="profile"
                  class="w-24 h-24"
                />
                <img
                  v-if="formFields.image"
                  :src="formFields.image"
                  class="w-24 h-24 rounded-full m-auto"
                  alt=""
                />
              </div>
              <div class="text-lg">{{ formFields.first_name }}</div>
              <div class="">{{ formFields.last_name }}</div>
            </div>
            <div class="w-full lg:w-1/3 px-4 lg:mx-0 lg:mr-2">
              <TextField
                v-model="formFields.first_name"
                name="first_name"
                rules="required"
                class="pt-4"
                label="First Name"
                :disabled="!isFormEditable"
              />
              <TextField
                v-model="formFields.last_name"
                name="last_name"
                rules="required"
                class="pt-4"
                label="Last Name"
                :disabled="!isFormEditable"
              />
              <TextField
                v-model="formFields.email"
                name="email"
                class="pt-4"
                rules="required"
                label="Email Address"
                :disabled="!isFormEditable"
              />
              <TextField
                v-model="formFields.mobile"
                name="mobile"
                class="pt-4"
                rules="required"
                label="Whatsapp Number"
                :disabled="!isFormEditable"
              />
              <div class="pt-4">
                <TextField
                  v-model="formFields.username"
                  name="username"
                  label="Username"
                  disabled
                />
              </div>
            </div>
            <div class="w-full lg:w-1/3 lg:ml-12">
              <TextField
                v-model="formFields.address"
                name="address"
                rules="required"
                class="pt-4 mx-4 lg:mx-0 lg:mr-2"
                label="Address"
                :disabled="!isFormEditable"
              />
              <TextField
                v-model="formFields.school"
                name="school"
                class="pt-4 mx-4 lg:mx-0 lg:mr-2"
                label="School"
                rules="required"
                :disabled="!isFormEditable"
              />
              <TextField
                v-model="formFields.al_year"
                name="al_year"
                class="pt-4 mx-4 lg:mx-0 lg:mr-2"
                label="AL Year"
                rules="required"
                :disabled="!isFormEditable"
              />
              <label
                for="student-gender"
                class="
                  block
                  text-2xs
                  font-normal
                  text-black text-left
                  pt-4
                  mx-4
                  lg:mx-0 lg:mr-2
                "
              >
                Gender
              </label>
              <div
                class="
                  py-2
                  mx-4
                  lg:mx-0 lg:mr-2
                  border border-gray-800
                  focus:outline-none
                  rounded-lg
                "
              >
                <select
                  id="student-gender"
                  v-model="formFields.gender"
                  :disabled="!isFormEditable"
                >
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                </select>
              </div>
            </div>
            <div class="w-full lg:w-1/3 lg:ml-12 px-4">
              <label
                class="block text-2xs font-normal text-black text-left mt-4"
              >
                Select type
              </label>
              <select
                v-model="formFields.status"
                :disabled="!isFormEditable"
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
                <option value="pending" disabled>Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
              <div class="pt-4 lg:mr-2">
                <div class="block text-2xs font-normal text-black text-left">
                  Select
                </div>
                <multiselect
                  v-model="formFields.classes"
                  class="max-w-lg"
                  :options="
                    classesList.map((elem) => ({
                      id: elem.id,
                      name:
                        elem.name +
                        ' - ' +
                        capitalizeFirstLetter(elem.type) +
                        ' - ' +
                        elem.year +
                        ' - ' +
                        elem.institute,
                    }))
                  "
                  :multiple="true"
                  :close-on-select="false"
                  :disabled="
                    !isFormEditable || formFields.status !== 'approved'
                  "
                  track-by="id"
                  label="name"
                ></multiselect>
              </div>
              <div>
                <label
                  class="block text-2xs font-normal text-black text-left mt-4"
                  >From Date
                </label>
                <div class="mt-1 relative rounded-md">
                  <client-only
                    ><date-picker
                      v-model="formFields.date_from"
                      :disabled="
                        !isFormEditable || formFields.status !== 'approved'
                      "
                      class="
                        appearance-none
                        w-full
                        block
                        w-full
                        flex
                        items-center
                        h-10
                        px-2
                        border border-gray-800
                        rounded-lg
                        placeholder-gray-400
                        focus:outline-none
                        transition
                        duration-150
                        ease-in-out
                        text-sm
                        sm:leading-5
                        font-medium
                      "
                      placeholder="MM/DD/YYYY"
                  /></client-only>
                </div>
              </div>
              <div>
                <label
                  class="block text-2xs font-normal text-black text-left mt-4"
                  >To Date
                </label>
                <div class="mt-1 relative rounded-md">
                  <client-only
                    ><date-picker
                      v-model="formFields.date_to"
                      :disabled="
                        !isFormEditable || formFields.status !== 'approved'
                      "
                      class="
                        appearance-none
                        w-full
                        block
                        w-full
                        flex
                        items-center
                        h-10
                        px-2
                        border border-gray-800
                        rounded-lg
                        placeholder-gray-400
                        focus:outline-none
                        transition
                        duration-150
                        ease-in-out
                        text-sm
                        sm:leading-5
                        font-medium
                      "
                      placeholder="MM/DD/YYYY"
                  /></client-only>
                </div>
              </div>
              <div class="flex justify-center mt-8 hidden lg:block">
                <div class="text-left flex">
                  <div>
                    <SvgIcon
                      v-if="!formFields.image"
                      name="profile"
                      class="w-20 h-20"
                    />
                    <img
                      v-if="formFields.image"
                      :src="formFields.image"
                      class="w-20 h-20 rounded-full"
                      alt=""
                    />
                  </div>
                  <div class="pl-4">
                    <div class="text-lg">{{ formFields.first_name }}</div>
                    <div class="">{{ formFields.last_name }}</div>
                  </div>
                </div>
              </div>
            </div>
          </ValidationObserver>
          <div
            class="
              flex flex-col
              md:flex-row
              justify-center
              md:justify-between
              pt-4
            "
          >
            <div
              class="
                flex flex-col-reverse
                md:flex-row
                justify-center
                items-center
                mb-4
                md:ml-8
              "
            >
              <div class="mt-4 md:mt-0">
                <PrimaryButton
                  :loading="isLoading"
                  :text="
                    showResetPasswordContainer
                      ? 'Update Password'
                      : 'Reset Password'
                  "
                  @click="handleResetPasswordButtonClick"
                />
                <PrimaryButton
                  v-if="showResetPasswordContainer"
                  text="Cancel"
                  @click="showResetPasswordContainer = false"
                />
              </div>
              <div
                v-if="showResetPasswordContainer"
                class="md:ml-4 pt-4 md:pt-0"
              >
                <TextField
                  v-model="newPassword"
                  type="text"
                  name="rest_password"
                  label="Reset Password"
                />
              </div>
            </div>
            <div
              class="
                flex flex
                justify-center
                flex-col
                md:flex-row
                mx-4
                md:mt-4
                lg:pr-12
                pb-8
              "
            >
              <div>
                <PrimaryButton
                  v-if="!isFormEditable"
                  text="Edit"
                  @click="isFormEditable = !isFormEditable"
                />
              </div>
              <div>
                <PrimaryButton
                  v-if="isFormEditable"
                  :loading="isLoading"
                  text="Save"
                  @click="handleSaveButtonClick()"
                />
              </div>
            </div>
          </div>
        </div>
      </modal>
      <modal
        width="80%"
        height="auto"
        name="multi-user-actions-modal"
        :click-to-close="false"
      >
        <div class="lg:ml-12 overflow-auto h-screen lg:h-auto">
          <div class="flex justify-between">
            <div class="text-2xl ml-4 font-bold pt-6 text-center lg:text-left">
              Edit multiple users
            </div>
            <button
              class="focus:outline-none"
              @click="closeMultiUserActionsModal"
            >
              <SvgIcon name="cross" class="h-6 w-6 focus:outline-none mr-4" />
            </button>
          </div>
          <div class="ml-4">
            Selected users count - {{ selectedStudentsList.length }}
          </div>
          <ValidationObserver
            ref="editMultiUserForm"
            class="
              lg:mr-12
              flex flex-col
              lg:flex-row
              pt-4
              md:ml-4
              overflow-auto
            "
          >
            <div class="w-full px-4">
              <div class="md:flex w-full">
                <div class="w-full md:px-4">
                  <label
                    class="block text-2xs font-normal text-black text-left mt-4"
                  >
                    Select new status
                  </label>
                  <select
                    v-model="selectedUsersFormFields.status"
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
                    <option value="" disabled>Select Option</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
                <div class="pt-4 md:px-4 w-full">
                  <div class="block text-2xs font-normal text-black text-left">
                    Select Classes
                  </div>
                  <multiselect
                    v-model="selectedUsersFormFields.class_ids"
                    :disabled="
                      selectedUsersFormFields.status !== 'approved' ||
                      prev_status === 'approved' ||
                      prev_status === 'expired'
                    "
                    :options="
                      classesList.map((elem) => ({
                        id: elem.id,
                        name:
                          elem.name +
                          ' - ' +
                          capitalizeFirstLetter(elem.type) +
                          ' - ' +
                          elem.year +
                          ' - ' +
                          elem.institute,
                      }))
                    "
                    :multiple="true"
                    :close-on-select="false"
                    track-by="id"
                    label="name"
                  ></multiselect>
                </div>
              </div>
              <div class="md:flex w-full">
                <div class="w-full md:px-4">
                  <label
                    class="block text-2xs font-normal text-black text-left mt-4"
                    >From Date
                  </label>
                  <div class="mt-1 relative rounded-md">
                    <client-only
                      ><date-picker
                        v-model="selectedUsersFormFields.date_from"
                        :disabled="
                          selectedUsersFormFields.status !== 'approved'
                        "
                        class="
                          appearance-none
                          w-full
                          block
                          w-full
                          flex
                          items-center
                          h-10
                          px-2
                          border border-gray-800
                          rounded-lg
                          placeholder-gray-400
                          focus:outline-none
                          transition
                          duration-150
                          ease-in-out
                          text-sm
                          sm:leading-5
                          font-medium
                        "
                        placeholder="MM/DD/YYYY"
                    /></client-only>
                  </div>
                </div>
                <div class="w-full md:px-4">
                  <label
                    class="block text-2xs font-normal text-black text-left mt-4"
                    >To Date
                  </label>
                  <div class="mt-1 relative rounded-md">
                    <client-only
                      ><date-picker
                        v-model="selectedUsersFormFields.date_to"
                        :disabled="
                          selectedUsersFormFields.status !== 'approved'
                        "
                        class="
                          appearance-none
                          w-full
                          block
                          w-full
                          flex
                          items-center
                          h-10
                          px-2
                          border border-gray-800
                          rounded-lg
                          placeholder-gray-400
                          focus:outline-none
                          transition
                          duration-150
                          ease-in-out
                          text-sm
                          sm:leading-5
                          font-medium
                        "
                        placeholder="MM/DD/YYYY"
                    /></client-only>
                  </div>
                </div>
              </div>
            </div>
          </ValidationObserver>
          <div
            class="
              flex flex-col
              md:flex-row
              justify-center
              md:justify-between
              pt-4
            "
          >
            <div
              class="
                flex flex
                justify-center
                flex-col
                md:flex-row
                mx-4
                md:mt-4
                lg:pr-12
                pb-8
              "
            >
              <div>
                <PrimaryButton
                  :loading="isLoading"
                  text="Save"
                  @click="handleSelectedStudentModalSaveButtonClick"
                />
              </div>
            </div>
          </div>
        </div>
      </modal>
      <div class="text-2xl font-bold pt-4 text-center lg:text-left pb-4">
        Students
      </div>
      <div class="table-width">
        <div class="flex flex-col sm:pb-4 md:flex-row items-center">
          <div class="w-full md:pt-5">
            <SearchField
              class="mb-4 md:mb-0 md:mr-5"
              @text-change="handleSearchTextChange"
            />
          </div>
          <div class="w-full md:w-1/3 pb-1">
            <label class="block text-2xs font-normal text-black text-left">
              Select type
            </label>
            <select
              v-model="selectedUserType"
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
              <option value="approved">Approved</option>
              <option value="expired">Expired</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <div class="mt-4 md:mt-0 md:ml-6 w-full md:w-1/3">
            <label class="block text-2xs font-normal text-black text-left">
              Select year
            </label>
            <select
              v-model="selectedUserYear"
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
              name="year"
            >
              <option
                v-for="userYear in availableALYears"
                :key="userYear"
                :value="userYear"
              >
                {{ userYear }}
              </option>
            </select>
          </div>
          <div class="sm:ml-4 mt-4">
            <PrimaryButton
              text="Filter"
              class="px-4"
              @click="handleFilterButtonClick"
            />
          </div>
        </div>

        <div class="flex items-center">
          <input v-model="selectAll" type="checkbox" />
          <div class="ml-2">Select all</div>
          <div
            v-if="selectedStudentsList.length > 1"
            class="flex justify-center sm:justify-start"
          >
            <div class="w-24 ml-4">
              <primary-button
                text="Actions"
                @click="showMultiUserActionsModal"
              />
            </div>
          </div>
        </div>
        <div
          class="
            flex
            text-base text-gray-900
            font-bold
            pt-3
            pb-2
            min-width
            overflow-x-auto
          "
        >
          <div class="w-3/12">
            <div>Name</div>
          </div>
          <div class="w-2/12">Username</div>
          <div class="w-4/12">Email</div>
          <div class="w-1/12">Status</div>
          <div class="w-2/12 text-center">Action</div>
        </div>
        <div
          class="overflow-auto table-height mb-8 min-width py-2 overflow-x-auto"
        >
          <PendingPageTableRow
            v-for="(student, index) of studentList"
            :key="index"
            first-button-text="View"
            :name="student.first_name + ' ' + student.last_name"
            :user-name="student.username"
            :email="student.email"
            :status="student.status"
            :checked="student.checked"
            @view-button-click="showStudentModal(student.id)"
            @check-change="selectedStudents($event, student)"
          />
        </div>
        <div class="flex justify-end mb-12">
          <ClientOnly>
            <Paginate
              v-model="pageIndex"
              :click-handler="changePage"
              :page-count="pageCount"
              :prev-text="'Prev'"
              :next-text="'Next'"
              container-class="shadow bg-white pagination border border-coral-700 flex rounded-md select-none text-gray"
              page-class="px-2 py-1 hover:text-coral-700 h-full"
              prev-class="px-2 py-1"
              next-class="px-2 py-1"
              active-class="text-coral-700"
            ></Paginate>
          </ClientOnly>
        </div>
      </div>
    </div>
    <div class="w-1/3"></div>
  </div>
</template>

<script>
import TextField from "@/components/TextField";
import SvgIcon from "@/components/SvgIcon";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import Multiselect from "vue-multiselect";
import { ValidationObserver } from "vee-validate";
import moment from "moment";
import PendingPageTableRow from "~/components/admin/pending-page/PendingPageTableRow";
import SearchField from "~/components/SearchField";

export default {
  name: "Students",

  components: {
    ValidationObserver,
    Multiselect,
    PrimaryButton,
    SvgIcon,
    TextField,
    SearchField,
    PendingPageTableRow,
  },

  layout: "admin",

  data() {
    return {
      searchTerm: "",
      studentList: [],
      classesList: [],
      prev_status: "pending",
      formFields: {
        first_name: "",
        last_name: "",
        email: "",
        mobile: "",
        username: "",
        address: "",
        school: "",
        al_year: "",
        gender: "",
        classes: [],
        date_from: "",
        date_to: "",
        status: "",
      },
      selectedUsersFormFields: {
        status: "",
        class_ids: [],
        date_from: "",
        date_to: "",
      },
      pageIndex: 1,
      pageCount: 0,
      isFormEditable: false,
      isLoading: false,
      selectedUserType: "pending",
      selectedUserYear: new Date().getFullYear(),
      tableRowButtonText: "",
      showResetPasswordContainer: false,
      newPassword: "",
      selectAll: false,
      selectedStudentsList: [],
      data: [],
    };
  },

  computed: {
    isFromToDatesNullForSingleUser() {
      return (
        (this.formFields.status === "rejected" &&
          this.prev_status === "approved") ||
        (this.formFields.status === "rejected" &&
          this.prev_status === "pending") ||
        (this.formFields.status === "pending" &&
          this.prev_status === "pending") ||
        (this.formFields.status === "rejected" &&
          this.prev_status === "rejected")
      );
    },

    isFromToDatesNullForMultiUsers() {
      return (
        (this.selectedUsersFormFields.status === "rejected" &&
          this.prev_status === "approved") ||
        (this.selectedUsersFormFields.status === "rejected" &&
          this.prev_status === "pending") ||
        (this.selectedUsersFormFields.status === "rejected" &&
          this.prev_status === "expired")
      );
    },

    isClassIdsNull() {
      return (
        (this.selectedUsersFormFields.status === "approved" &&
          this.prev_status === "approved") ||
        (this.selectedUsersFormFields.status === "rejected" &&
          this.prev_status === "approved") ||
        (this.selectedUsersFormFields.status === "approved" &&
          this.prev_status === "expired") ||
        (this.selectedUsersFormFields.status === "rejected" &&
          this.prev_status === "expired")
      );
    },

    availableALYears() {
      const currentYear = new Date().getFullYear();
      return [currentYear, currentYear + 1, currentYear + 2];
    },
  },

  watch: {
    selectAll(newValue) {
      this.studentList = this.studentList.map((s) => {
        if (newValue) {
          this.selectedStudentsList.push(s.id);
        } else {
          this.selectedStudentsList = this.selectedStudentsList.filter(
            (studentId) => studentId !== s.id
          );
        }

        return {
          ...s,
          checked: newValue,
        };
      });
    },
  },

  created() {
    this.fetchUsers();
    this.fetchClasses();
  },

  methods: {
    selectedStudents(isChecked, student) {
      if (isChecked) {
        this.selectedStudentsList.push(student.id);
        student.checked = true;
      } else {
        this.selectedStudentsList = this.selectedStudentsList.filter(
          (studentId) => studentId !== student.id
        );
        student.checked = false;
      }
    },

    async handleSelectedStudentModalSaveButtonClick() {
      if (!(await this.$refs.editMultiUserForm.validate())) {
        this.showNotification("error", "Please fill required fields.");
        return false;
      }

      if (
        !this.selectedUsersFormFields.status &&
        this.selectedUsersFormFields.status === "approved"
      ) {
        this.showNotification("error", "Please select status of students.");
        return false;
      }

      if (
        !this.selectedUsersFormFields.date_from &&
        this.selectedUsersFormFields.status === "approved"
      ) {
        this.showNotification("error", "Please add start date for students.");
        return false;
      }

      if (
        !this.selectedUsersFormFields.date_to &&
        this.selectedUsersFormFields.status === "approved"
      ) {
        this.showNotification(
          "error",
          "Please add expiration date for students."
        );
        return false;
      }

      if (
        !this.selectedUsersFormFields.class_ids.length &&
        this.selectedUsersFormFields.status === "approved" &&
        (this.prev_status === "pending" || this.prev_status === "rejected")
      ) {
        this.showNotification("error", "Please add classes for students.");
        return false;
      }

      await this.updateSelectedUserInfo(
        this.selectedUsersFormFields._id,
        this.selectedUsersFormFields
      );

      // reset modal
      this.selectedUsersFormFields = {
        status: "",
        class_ids: [],
        date_from: "",
        date_to: "",
      };

      this.clearSelection();

      this.$modal.hide("multi-user-actions-modal");
    },

    async updateSelectedUserInfo(studentId, payload) {
      try {
        this.isLoading = true;

        await this.$axios.put("user/updateMultiple/", {
          data: {
            status: this.selectedUsersFormFields.status,
            class_ids: this.isClassIdsNull
              ? null
              : this.selectedUsersFormFields.class_ids.map((c) => c.id),
            date_from: this.isFromToDatesNullForMultiUsers
              ? null
              : moment.utc(payload.date_from),
            date_to: this.isFromToDatesNullForMultiUsers
              ? null
              : moment.utc(payload.date_to),
          },
          prev_status: this.prev_status,
          student_ids: this.selectedStudentsList,
        });

        this.isLoading = false;

        await this.fetchUsers();

        this.$notify({
          type: "success",
          group: "foo",
          title: "User updated successfully!",
          text: "Action successful!",
          position: "top right",
        });

        this.closeStudentModal();
      } catch (e) {
        this.$notify({
          type: "error",
          group: "foo",
          title: "Form error!",
          text:
            e.response.data.message ??
            "Something went wrong when updating users!",
          position: "top right",
        });
      }
    },

    showMultiUserActionsModal() {
      this.$modal.show("multi-user-actions-modal");
    },

    resetSelectedUser() {
      this.formFields = {
        first_name: "",
        last_name: "",
        email: "",
        mobile: "",
        username: "",
        address: "",
        school: "",
        al_year: "",
        gender: "",
        classes: [],
        date_from: "",
        date_to: "",
        status: "",
      };
    },

    clearSelection() {
      this.selectedStudentsList = [];
      this.selectAll = false;
      this.prev_status = this.selectedUserType;

      this.studentList = this.studentList.map((s) => {
        return { ...s, checked: false };
      });
    },

    handleFilterButtonClick() {
      this.pageIndex = 1;

      this.clearSelection();
      this.fetchUsers();
    },

    capitalizeFirstLetter(text) {
      return text.charAt(0).toUpperCase() + text.slice(1);
    },

    changePage(pageNumber = 1) {
      this.pageIndex = pageNumber;

      this.fetchUsers();
    },

    showNotification(type, text) {
      this.$notify({
        type,
        group: "foo",
        title: type === "success" ? "Success" : "Error!",
        text,
        position: "top right",
      });
    },

    handleResetPasswordButtonClick() {
      if (this.showResetPasswordContainer) {
        if (!this.newPassword) {
          this.showNotification("error", "Please enter new password.");
          return false;
        }

        this.resetPassword();
      }

      this.showResetPasswordContainer = !this.showResetPasswordContainer;
    },

    async resetPassword() {
      if (!this.newPassword) {
        this.showNotification("error", "Please enter new password.");
        return false;
      }

      this.isLoading = true;

      try {
        await this.$axios.put("user/reset-password", {
          new_pw: this.newPassword,
          user_id: this.formFields._id,
        });

        this.showNotification("success", "Reset Password successfully!");

        this.newPassword = "";

        this.isLoading = false;
      } catch (e) {
        this.isLoading = false;

        this.$notify({
          type: "error",
          group: "foo",
          title: "Form error!",
          text: e.response.data.message ?? "Reset password error!",
          position: "top right",
        });
      }
    },

    async handleSearchTextChange(query) {
      this.searchTerm = query;
      this.pageIndex = 1;

      await this.fetchUsers();
    },

    convertToYyyyMmDd(date) {
      const d = new Date(date);
      let month = "" + (d.getMonth() + 1);
      let day = "" + d.getDate();
      const year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    },

    async updateUserInfo(studentId, payload) {
      try {
        this.isLoading = true;

        const formData = new FormData();

        formData.append(
          "payload",
          JSON.stringify({
            ...payload,
            class_ids: payload.classes.map((c) => c.id),
            date_from: this.isFromToDatesNullForSingleUser
              ? null
              : moment.utc(payload.date_from),
            date_to: this.isFromToDatesNullForSingleUser
              ? null
              : moment.utc(payload.date_to),
            prev_status: this.prev_status,
          })
        );

        await this.$axios.put("user/" + studentId, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        this.isLoading = false;

        await this.fetchUsers();

        this.$notify({
          type: "success",
          group: "foo",
          title: "User updated successfully!",
          text: "Action successful!",
          position: "top right",
        });

        this.closeStudentModal();
      } catch (e) {
        this.$notify({
          type: "error",
          group: "foo",
          title: "Form error!",
          text:
            e.response.data.message ??
            "Something went wrong when updating user!",
          position: "top right",
        });
      }
    },

    async fetchUsers() {
      try {
        this.isLoading = true;

        const { data } = await this.$axios.get("user/getFiltered", {
          params: {
            status: this.selectedUserType,
            al_year: this.selectedUserYear,
            search_term: this.searchTerm,
            page_index: this.pageIndex,
          },
        });

        this.isLoading = false;

        if (data) {
          this.pageCount = data.data.page_count;
          this.studentList = [];

          data.data.users.forEach((user) => {
            const foundUser = this.selectedStudentsList.filter(
              (studentId) => user._id === studentId
            )[0];

            if (foundUser) {
              this.studentList.push({
                checked: true,
                ...user,
              });
            } else {
              this.studentList.push({
                checked: false,
                ...user,
              });
            }
          });
        }
      } catch (e) {
        this.$notify({
          type: "error",
          group: "foo",
          title: "Form error!",
          text:
            e.response.data.message ??
            "Something went wrong when getting users!",
          position: "top right",
        });
      }
    },

    async fetchUser(userId) {
      try {
        this.isLoading = true;
        const { data } = await this.$axios.get("user/" + userId);
        this.isLoading = false;
        const userResponse = data.data;
        if (userResponse) {
          this.formFields = { ...this.formFields, ...userResponse };
        }
      } catch (e) {}
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

    async handleSaveButtonClick() {
      if (!(await this.$refs.editUserForm.validate())) {
        this.showNotification("error", "Please fill required fields.");
        return false;
      }

      if (!this.formFields.date_from && this.formFields.status === "approved") {
        this.showNotification("error", "Please add start date for student.");
        return false;
      }

      if (!this.formFields.date_to && this.formFields.status === "approved") {
        this.showNotification(
          "error",
          "Please add expiration date for student."
        );
        return false;
      }

      if (
        !this.formFields.classes.length &&
        this.formFields.status === "approved" &&
        (this.prev_status === "pending" || this.prev_status === "rejected")
      ) {
        this.showNotification("error", "Please add classes for student.");
        return false;
      }

      await this.updateUserInfo(this.formFields._id, this.formFields);

      this.$modal.hide("student-modal");
    },

    async showStudentModal(userId) {
      await this.fetchUser(userId);
      this.$modal.show("student-modal");
    },

    closeStudentModal() {
      this.resetSelectedUser();

      this.isFormEditable = false;

      this.$modal.hide("student-modal");
    },

    closeMultiUserActionsModal() {
      this.$modal.hide("multi-user-actions-modal");
    },
  },
};
</script>

<style scoped>
.table-height {
  height: 300px;
}

.table-width {
  overflow-x: auto;
}

.min-width {
  min-width: 800px;
}
</style>
