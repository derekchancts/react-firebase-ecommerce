
export const existingCartItem = ({ prevCartItems, nextCartItem }) => {
  return prevCartItems.find(
    cartItem => cartItem.documentID === nextCartItem.documentID
  )
}



export const handleAddToCart = ({ prevCartItems, nextCartItem }) => {
  const quantityIncrement = 1;
  const cartItemExist = existingCartItem({ prevCartItems, nextCartItem });

  // IF NEW ITEM DOES EXIST IN CART
  if (cartItemExist) {
    return prevCartItems.map(cartItem => 
      cartItem.documentID === nextCartItem.documentID
        ? {
          ...cartItem,
          quantity: cartItem.quantity + quantityIncrement
        } : cartItem
    )
  }

  
  // IF NEW ITEM DOESN'T ALREADY EXIST IN CART
  return [
    ...prevCartItems,
    {
      ...nextCartItem,
      quantity: quantityIncrement
    }
  ]
};