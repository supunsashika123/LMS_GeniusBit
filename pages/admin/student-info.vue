<template>
  <div>
    <div class="m-6">
      <div class="text-3xl text-gray-900 font-font">Students</div>
      <div class="pt-8 table-width">
        <div>
          <SearchField class="mb-4" />
        </div>
        <div class="flex text-base text-gray-900 font-bold pb-2 min-width">
          <div class="w-3/12">Name</div>
          <div class="w-2/12">Username</div>
          <div class="w-5/12">Email</div>
          <div class="w-2/12">button</div>
        </div>
        <div class="overflow-auto table-height min-width">
          <StudentsPageTableRow
            v-for="(pendingList, index) of pendingLists"
            :key="index"
            :name="pendingList.name"
            :user-name="pendingList.userName"
            :email="pendingList.email"
          />
        </div>
      </div>
    </div>
    <div class="w-1/3"></div>
  </div>
</template>

<script>
import StudentsPageTableRow from "@/components/admin/students/StudentsPageTableRow";
import SearchField from "@/components/SearchField";

export default {
  name: "StudentInfo",

  components: {
    SearchField,
    StudentsPageTableRow,
  },

  layout: "admin",

  data() {
    return {
      pendingLists: [],
    };
  },

  created() {
    this.fetchPendingList();
  },

  methods: {
    fetchPendingList() {
      // TODO:this.pendingLists = await this.$axios.get('URL')
      const respose = {
        template: "MEVN",
        price: 0,
        options: [
          {
            name: "Lasitha",
            userName: "L0001",
            email: "Lasitha@gmail.com",
          },
          {
            name: "Supun",
            userName: "S0001",
            email: "supun@gmail.com",
          },
          {
            name: "Piyum",
            userName: "P0001",
            email: "piyum@gmail.com",
          },
        ],
      };

      this.pendingLists = respose.options;
    },
  },
};
</script>

<style scoped>
.table-height {
  height: 400px;
}

.table-width {
  overflow-x: auto;
}

.min-width {
  min-width: 800px;
}
</style>
