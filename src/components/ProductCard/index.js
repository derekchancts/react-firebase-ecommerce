import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { fetchProductStart, setProduct } from '../../redux/Products/products.actions'; 
import Button from '../forms/Button';
import './styles.scss';


const mapState = ({ productsData }) => ({
  product: productsData.product
}) 


const ProductCard = () => {
  const dispatch = useDispatch();
  const { productID } = useParams();

  const { product } = useSelector(mapState);
  const { productName, productThumbnail, productPrice, productDesc, documentID } = product;
  // const { product: { productName, productThumbnail, productPrice, documentID }} = useSelector(mapState);

  useEffect(() => {
    dispatch(fetchProductStart(productID))
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
             <Button {...configAddToCartBtn}>
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