<script setup>
import ManagerHeader from '@/components/manager/ManagerHeader.vue'
import XModal from '@/components/ui/XModal.vue'
import { useOrderItemStore } from '@/stores/orderItem'
import { ref } from 'vue'

const orderItemStore = useOrderItemStore()

const { order, orderItems } = defineProps({
  order: Object,
  orderItems: Array
})

const editingOrderItem = ref(null)

const changeStatus = async (status) => {
  await orderItemStore.changeOrderStatus(editingOrderItem.value.id, status)
  editingOrderItem.value = null
}
</script>

<template>
  <div v-if="order" class="flex flex-col w-full px-5 md:px-10 lg:px-20">
    <ManagerHeader>Order # {{ order.id }} (Table {{ order.tableId }})</ManagerHeader>

    <div class="flex flex-col gap-4 p-4 max-h-96">
      <div class="overflow-auto">
        <table class="w-full table-auto">
          <thead>
            <tr>
              <th class="text-left">Item</th>
              <th class="text-left">Quantity</th>
              <th class="text-left">Price/EA</th>
              <th class="text-left">Total Price</th>
              <th class="text-left">Status</th>
              <th class="text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="orderItems.length <= 0">
              <td colspan="5" class="text-center font-bold text-gray-500">No order items</td>
            </tr>
            <tr v-for="orderItem in orderItems" :key="orderItem.id">
              <td>{{ orderItem.item.name.en }}</td>
              <td>{{ orderItem.quantity }}</td>
              <td>{{ orderItem.item.price }}</td>
              <td>{{ orderItem.quantity * orderItem.item.price }}</td>
              <td>{{ orderItem.status }}</td>
              <td>
                <button
                  @click="editingOrderItem = orderItem"
                  class="bg-theme-500 hover:bg-theme-400 text-white p-2 rounded-lg items-center flex justify-center h-12 w-full transition duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-pencil-square"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <XModal
      :title="`Edit Order Item: ${editingOrderItem?.item.name.en}`"
      :show="!!editingOrderItem"
      @close="editingOrderItem = null"
      class="flex justify-center items-center"
    >
      <div class="flex flex-col gap-4">
        <label for="status">Status</label>
        <select
          id="status"
          @change="changeStatus($event.target.value)"
          :value="editingOrderItem?.status"
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
    </XModal>
  </div>
</template>
