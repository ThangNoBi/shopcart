import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    showMiniCart: false,
    cartItems: [],
  },
  reducers: {
    showMiniCart(state) {
      state.showMiniCart = true;
    },
    hideMiniCart(state) {
      state.showMiniCart = false;
    },

    addToCart(state, action) {
      const newItem = action.payload; // newItem = { id , product, quantity}
      const index = state.cartItems.findIndex((z) => z.id === newItem.id);

      if (index >= 0) {
        // Nếu đã có trong giỏ hàng thì tăng giá trị
        state.cartItems[index].quantity += newItem.quantity;
      } else {
        // Nếu chưa có thì push item mới vào
        state.cartItems.push(newItem);
      }
    },
    setQuantity(state, action) {
      const { id, quantity } = action.payload;
      const index = state.cartItems.findIndex((x) => x.id === id);
      if (index >= 0) {
        state.cartItems[index].quantity = quantity;
      }
    },
    removeFromCart(state, action) {
      // const idToRemove = action.payload;
      // let newCart = state.cartItems;
      // newCart = newCart.filter((x) => x.id !== idToRemove);
      // state.cartItems = state.cartItems.filter((x) => x.id !== idToRemove);
      const { id } = action.payload;
      const index = state.cartItems.findIndex((x) => x.id === id);
      if (index >= 0) {
        state.cartItems.splice(index, 1);
      }
    },
  },
});

const { actions, reducer } = cartSlice;
export const {
  showMiniCart,
  hideMiniCart,
  addToCart,
  setQuantity,
  removeFromCart,
} = actions; // name export
export default reducer; // default export
