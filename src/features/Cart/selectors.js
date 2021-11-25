import { createSelector } from "reselect";

//
const cartSelector = (state) => state.cart.cartItems;

// Count number of products in cart,
// Nếu cartSelector(giá trị phụ thuộc) không thay đổi giá trị thì những hàm truyền vào giá trị phụ thuộc này cũng không render lại
export const cartItemCount = createSelector(cartSelector, (cartItem) =>
  cartItem.reduce((count, item) => count + item.quantity, 0)
);

// Calculate total of cart
export const cartItemTotal = createSelector(cartSelector, (cartItem) =>
  cartItem.reduce(
    (total, item) => total + item.product.salePrice * item.quantity,
    0
  )
);
