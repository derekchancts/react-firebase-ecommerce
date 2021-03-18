import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { fetchProductsStart } from '../../redux/Products/products.actions'; 
import Product from './Product';
import FormSelect from '../forms/FormSelect';
import './styles.scss';

 

const mapState = ({ productsData }) => ({
  products: productsData.products
})


const ProductResults = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { filterType } = useParams();
  const { products } = useSelector(mapState);


  useEffect(() => {
    dispatch(fetchProductsStart({ filterType }));
  },[filterType])


  
  const handleFilter = (e) => {
    const nextFilter = e.target.value;
    // console.log(nextFilter)
    history.push(`/search/${nextFilter}`);
  };


  
  if (!Array.isArray(products)) return null;

  if (products.length < 1) {
    return (
      <div className="products">
        No serach results
      </div>
    );
  }


  const configFilters = {
    defaultValue: filterType,
    options: [{
      name: 'Show all',
      value: ''
    }, {
      name: 'Mens',
      value: 'mens'
    }, {
      name: 'Womens',
      value: 'womens'
    }],
    handleChange: handleFilter
  };


  return ( 
    <div className="products">

      <h1>
        Browse Products
      </h1>


      <FormSelect {...configFilters} />


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
              <Product {...configProduct} pos={pos} key={pos}/>
            );
          })
        }
      </div>

    </div>
   );
}
 
export default ProductResults;