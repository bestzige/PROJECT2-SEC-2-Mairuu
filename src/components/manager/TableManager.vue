<script>
export default {
  data() {
    return {
      showData: {
        1: false,
        2: false,
        3: false
      }
    }
  },
  methods: {
    toggleDropdown(table) {
      this.showData[table] = !this.showData[table]
    }
  }
}
</script>

<template>
  <div>
    <div class="flex justify-center">
      <div class="bg-theme-500 text-white w-3/4 p-20 m-10 text-center">
        <h1 class="text-7xl font-bold">Table Management</h1>
      </div>
    </div>

    <!-- ข้อมูล 1-->
    <div>
      <div class="flex justify-center">
        <button
          @click="toggleDropdown(1)"
          class="bg-blue-500 hover:bg-blue-700 text-white text-start font-bold py-2 px-4 rounded mt-4 w-3/4"
        >
          <span v-if="!showData[1]">Table 1</span>
          <span v-else>Table 1 </span>
        </button>
      </div>

      <!-- แสดงข้อมูล 1-->
      <div v-if="showData[1]" class="flex justify-center mt-4">
        <ul class="bg-white shadow rounded overflow-hidden w-3/4">
          <li class="px-4 py-2 border-b border-gray-200">
            ID : <input type="Table 1" placeholder="ID" />
          </li>
          <li class="px-4 py-2 border-b border-gray-200">
            Name TH : <input type="Table 1" placeholder="ID" />
          </li>
          <li class="px-4 py-2 border-b border-gray-200">
            Name ENG : <input type="Table 1" placeholder="ID" />
          </li>
          <li class="px-4 py-2 border-b border-gray-200">
            Size : <input type="Table 1" placeholder="ID" />
          </li>
          <li class="px-4 py-2 border-b border-gray-200">
            Status : <input type="Table 1" placeholder="ID" />
          </li>
        </ul>
      </div>
    </div>

    <!-- ข้อมูล 2-->
    <div>
      <div class="flex justify-center">
        <button
          @click="toggleDropdown(2)"
          class="bg-blue-500 hover:bg-blue-700 text-white text-start font-bold py-2 px-4 rounded mt-4 w-3/4"
        >
          <span v-if="!showData[2]">Table 2</span>
          <span v-else>Table 2 </span>
        </button>
      </div>

      <!-- แสดงข้อมูล 2-->
      <div v-if="showData[2]" class="flex justify-center mt-4">
        <ul class="bg-white shadow rounded overflow-hidden w-3/4">
          <li class="px-4 py-2 border-b border-gray-200">
            ID : <input type="Table 2" placeholder="ID" />
          </li>
          <li class="px-4 py-2 border-b border-gray-200">
            Name TH : <input type="Table 2" placeholder="ID" />
          </li>
          <li class="px-4 py-2 border-b border-gray-200">
            Name ENG : <input type="Table 2" placeholder="ID" />
          </li>
          <li class="px-4 py-2 border-b border-gray-200">
            Size : <input type="Table 2" placeholder="ID" />
          </li>
          <li class="px-4 py-2 border-b border-gray-200">
            Status : <input type="Table 2" placeholder="ID" />
          </li>
        </ul>
      </div>
    </div>

    <!-- ข้อมูล 3-->
    <div>
      <div class="flex justify-center">
        <button
          @click="toggleDropdown(3)"
          class="bg-blue-500 hover:bg-blue-700 text-white text-start font-bold py-2 px-4 rounded mt-4 w-3/4"
        >
          <span v-if="!showData[3]">Table 3</span>
          <span v-else>Table 3 </span>
        </button>
      </div>

      <!-- แสดงข้อมูล 3-->
      <div v-if="showData[3]" class="flex justify-center mt-4">
        <ul class="bg-white shadow rounded overflow-hidden w-3/4">
          <li class="px-4 py-2 border-b border-gray-200">
            ID : <input type="Table 3" placeholder="ID" />
          </li>
          <li class="px-4 py-2 border-b border-gray-200">
            Name TH : <input type="Table 3" placeholder="ID" />
          </li>
          <li class="px-4 py-2 border-b border-gray-200">
            Name ENG : <input type="Table 3" placeholder="ID" />
          </li>
          <li class="px-4 py-2 border-b border-gray-200">
            Size : <input type="Table 3" placeholder="ID" />
          </li>
          <li class="px-4 py-2 border-b border-gray-200">
            Status : <input type="Table 3" placeholder="ID" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
