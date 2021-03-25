// import Button from "../../forms/Button";
// import { Link } from "react-router-dom";

// const Product = ({
//   productName,
//   productThumbnail,
//   productPrice,
//   documentID,
//   pos,
// }) => {
//   if (
//     !documentID ||
//     !productThumbnail ||
//     !productName ||
//     typeof productPrice === "undefined"
//   )
//     return null;
//   // price can be 0 / zero and it will validate to a false. So, use 'undefined' instead.

//   const configAddToCartBtn = {
//     type: "button",
//   };

//   return (
//     <div className="product" key={pos}>
//       <div className="thumb">
//         <Link to={`/product/${documentID}`}>
//           <img src={productThumbnail} alt={productName} />
//         </Link>
//       </div>

//       <div className="details">
//         <ul>
//           <li>
//             <span className="name">
//               <Link to={`/product/${documentID}`}>{productName}</Link>
//             </span>
//           </li>
//           <li>
//             $<span className="price">{productPrice}</span>
//           </li>
//           <li>
//             <div className="addToCart">
//               <Button {...configAddToCartBtn}>Add to Cart</Button>
//             </div>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Product;




import Button from "../../forms/Button";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { addProduct } from '../../../redux/Cart/cart.actions'


const Product = (product) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { productName,
    productThumbnail,
    productPrice,
    documentID,
    pos,} = product;

  if (
    !documentID ||
    !productThumbnail ||
    !productName ||
    typeof productPrice === "undefined"
  )
    return null;
  // price can be 0 / zero and it will validate to a false. So, use 'undefined' instead.

  const configAddToCartBtn = {
    type: "button",
  };


  const handleAddToCart = (product) => {
    if (!product) return;
    dispatch(addProduct(product));
    history.push('/cart');
  };


  return (
    <div className="product" key={pos}>
      <div className="thumb">
        <Link to={`/product/${documentID}`}>
          <img src={productThumbnail} alt={productName} />
        </Link>
      </div>

      <div className="details">
        <ul>
          <li>
            <span className="name">
              <Link to={`/product/${documentID}`}>{productName}</Link>
            </span>
          </li>
          <li>
            $<span className="price">{productPrice}</span>
          </li>
          <li>
            <div className="addToCart">
              <Button {...configAddToCartBtn} onClick={() => handleAddToCart(product)} >
                Add to Cart
              </Button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Product;

