import React from "react";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";

function CartMain(props) {
  // const getCount = useSelector(cartItemCount);

  const getInfo = useSelector((state) => state.cart.cartItems);

  return (
    <div>
      <h2>Danh sách giỏ hàng</h2>
      <CartItem detail={getInfo} />
    </div>
  );
}

export default CartMain;
