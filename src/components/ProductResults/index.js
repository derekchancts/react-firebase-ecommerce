import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsStart } from '../../redux/Products/products.actions'; 
import Product from './Product';
import './styles.scss';



const mapState = ({ productsData }) => ({
  products: productsData.products
})


const ProductResults = () => {
  const dispatch = useDispatch();
  const { products } = useSelector(mapState);


  useEffect(() => {
    dispatch(fetchProductsStart());
  },[])

  
  if (!Array.isArray(products)) return null;

  if (products.length < 1) {
    return (
      <div className="products">
        No serach results
      </div>
    );
  }


  return ( 
    <div className="products">

      <h1>
        Browse Products
      </h1>

      <div className="productResults">
        {
          products.map((product, pos) => {
            const { productName, productThumbnail, productPrice } = product;
            if (!productThumbnail || !productName || 
                typeof productPrice === 'undefined') return null; 
                // price can be 0 / zero and it will validate to a false. So, use 'undefined' instead.

                const configProduct = {
                  productName, 
                  productThumbnail,
                  productPrice
                };

            return (
              // <div key={pos}>
              //   {productName}
              //   {productPrice}
              // </div>
              <Product {...configProduct} pos={pos} />
            );
          })
        }
      </div>

    </div>
   );
}
 
export default ProductResults;