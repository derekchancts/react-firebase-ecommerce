
export const existingCartItem = ({ prevCartItems, nextCartItem }) => {
  return prevCartItems.find(
    cartItem => cartItem.documentID === nextCartItem.documentID
  )
}



export const handleAddToCart = ({ prevCartItems, nextCartItem }) => {
  // const quantityIncrement = 1;
  const cartItemExist = existingCartItem({ prevCartItems, nextCartItem });

  // IF NEW ITEM DOES EXIST IN CART
  if (cartItemExist) {
    return prevCartItems.map(cartItem => 
      cartItem.documentID === nextCartItem.documentID
        ? {
          ...cartItem,
          quantity: cartItem.quantity + 1
        } : cartItem
    )
  }

  // IF NEW ITEM DOESN'T ALREADY EXIST IN CART
  return [
    ...prevCartItems,
    {
      ...nextCartItem,
      quantity: 1
    }
  ]
};



export const handleRemoveCartItem = ({ prevCartItems, cartItemToRemove }) => {

  // Will only return the items (a new array) which do not match the cartitem that we want to remove
  return prevCartItems.filter(cartItem => cartItem.documentID !== cartItemToRemove.documentID)
}




export const handleReduceCartItem = ({ prevCartItems, cartItemToReduce }) => {
  
  // FIND THE ITEM
  // const cartItemExist = existingCartItem({ prevCartItems, cartItemToReduce });
  const cartItemExist = prevCartItems.find(cartItem => cartItem.documentID === cartItemToReduce.documentID);

  // CHECK THE QUANTITY OF THE ITEM FOUND IS EQUAL TO 1
  if (cartItemExist.quantity === 1) {
    return prevCartItems.filter(cartItem => cartItem.documentID !== cartItemToReduce.documentID)
  }

  // IF THE QUANTITY HAS MORE THAN 1
  return prevCartItems.map(cartItem => 
    cartItem.documentID === cartItemToReduce.documentID 
    ? ({
      ...cartItem,
      quantity: cartItem.quantity - 1
    }) : (cartItem) 
  )

} 
