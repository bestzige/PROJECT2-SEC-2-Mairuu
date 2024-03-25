import * as fetch from '@/utils/fetch'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useUiStore } from './ui'

export const useOrderStore = defineStore('order', () => {
  const currentOrder = ref(null)
  const cartItems = ref([])

  const uiStore = useUiStore()

  const getOrder = async (orderId, setOrder = true) => {
    const data = await fetch.getItems(
      `${import.meta.env.VITE_API_ENDPOINT}/orders/${orderId}?_embed=table&_embed=order-items&_embed=service-calls`
    )
    if (setOrder) currentOrder.value = data
    return data
  }

  const totalPriceInCart = computed(() => {
    return cartItems.value.reduce((acc, cartItem) => {
      return acc + cartItem.item.price * cartItem.quantity
    }, 0)
  })

  const totalQuantityInCart = computed(() => {
    return cartItems.value.reduce((acc, cartItem) => {
      return acc + cartItem.quantity
    }, 0)
  })

  const getCartById = (id) => {
    return cartItems.value.find((cartItem) => cartItem.id === id)
  }

  const addToCart = (item) => {
    if (!item.id) return
    const isItemExist = cartItems.value.find((cartItem) => cartItem.item.id === item.id)
    if (isItemExist) {
      isItemExist.quantity++
    } else {
      cartItems.value.push({ id: `cart-${Date.now()}`, item, quantity: 1 })
    }
  }

  const removeFromCart = (id) => {
    cartItems.value = cartItems.value.filter((cartItem) => cartItem.id !== id)
  }

  const addQuantity = (id) => {
    const cartItem = getCartById(id)
    if (cartItem) {
      cartItem.quantity++
    }
  }

  const subQuantity = (id) => {
    const cartItem = getCartById(id)
    if (cartItem.quantity > 1) {
      cartItem.quantity--
    } else {
      removeFromCart(id)
    }
  }

  const itemOrdered = async (orderId) => {
    const orderItemPromises = cartItems.value.map(async (cartItem) => {
      const ordered = await fetch.postItem(`${import.meta.env.VITE_API_ENDPOINT}/order-items`, {
        orderId,
        itemId: cartItem.item.id,
        quantity: cartItem.quantity,
        orderDate: new Date().toISOString(),
        status: 'pending'
      })
      if (ordered) removeFromCart(cartItem.id)
      return ordered
    })
    const orderItems = await Promise.all(orderItemPromises)
    if (orderItems.length > 0) {
      uiStore.addToast({ message: 'Order placed', type: 'success' })
    }
    return orderItems
  }

  const getOrderItems = async (orderId) => {
    return await fetch.getItems(
      `${import.meta.env.VITE_API_ENDPOINT}/order-items?orderId=${orderId}&_embed=item&_sort=-orderDate`
    )
  }

  //get open order from table id
  const getOpenOrderByTableId = async (tableId) => {
    const data = await fetch.getItems(
      `${import.meta.env.VITE_API_ENDPOINT}/orders?tableId=${tableId}&status=open&_embed=table`
    )
    if (data.length === 0) {
      return null
    }
    return data[0]
  }

  const getOpenOrders = async () => {
    return await fetch.getItems(
      `${import.meta.env.VITE_API_ENDPOINT}/orders?status=open&_embed=table`
    )
  }

  const openOrder = async (tableId) => {
    const currentDate = new Date()
    const data = await fetch.postItem(`${import.meta.env.VITE_API_ENDPOINT}/orders`, {
      tableId: `${tableId}`,
      status: 'open',
      orderDate: `${currentDate.toISOString()}`
    })
    if (!data) {
      uiStore.addToast({
        message: 'Failed to open table',
        type: 'error'
      })
    }

    uiStore.addToast({
      message: `Table ${tableId} opened`,
      type: 'success'
    })
    
    return data
  }

  const submitOrder = async (orderId) => {
    const data = await fetch.patchItem(`${import.meta.env.VITE_API_ENDPOINT}/orders`, orderId, {
      status: 'closed'
    })

    if (!data) {
      uiStore.addToast({
        message: 'Failed to submit order',
        type: 'error'
      })
    }

    uiStore.addToast({
      message: `Table ${data.tableId} submitted`,
      type: 'success'
    })

    return data
  }

  return {
    currentOrder,
    cartItems,
    getOrder,
    totalPriceInCart,
    totalQuantityInCart,
    addToCart,
    removeFromCart,
    addQuantity,
    subQuantity,
    itemOrdered,
    getOrderItems,
    getOpenOrderByTableId,
    getOpenOrders,
    openOrder,
    submitOrder
  }
})
