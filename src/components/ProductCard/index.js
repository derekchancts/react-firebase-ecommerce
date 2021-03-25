import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { fetchProductStart, setProduct } from '../../redux/Products/products.actions'; 
import { addProduct } from '../../redux/Cart/cart.actions'
import Button from '../forms/Button';
import './styles.scss';
import { handleAddToCart } from '../../redux/Cart/cart.utils';


const mapState = ({ productsData }) => ({
  product: productsData.product
}) 


const ProductCard = () => {
  const dispatch = useDispatch();
  const { productID } = useParams();
  const history = useHistory();

  const { product } = useSelector(mapState);
  const { productName, productThumbnail, productPrice, productDesc, documentID } = product;
  // const { product: { productName, productThumbnail, productPrice, documentID }} = useSelector(mapState);

  useEffect(() => {
    dispatch(fetchProductStart(productID))
    // console.log(`productID: ${productID}`)
    // console.log(`documentID: ${documentID}`)
  }, [])


  if (!product) {
    return (
      <div className="product">
        No serach result
      </div>
    );
  }


  const configAddToCartBtn = {
    type:'button'
  }


  const handleAddToCart = product => {
    if (!product) return;
    dispatch(addProduct(product));
    history.push('/cart');
  }


  return (
   <div className="productCard">
     <div className="hero">
        <img src={productThumbnail} />
     </div>
     <div className="productDetails">
       <ul>
         <li>
          <h1>{productName}</h1>
         </li>
         <li>
           <span>
            ${productPrice}
           </span>
         </li>
         <li>
           <div className="addToCart">
             <Button {...configAddToCartBtn} onClick={() => handleAddToCart(product)}>
                Add to cart
             </Button>
           </div>
         </li>
         <li>
           <span 
            dangerouslySetInnerHTML={{ __html: productDesc }} 
           />
         </li>
       </ul>
     </div>
   </div>
  );
}
 
export default ProductCard;