import Button from '../../forms/Button';


const Product = ({ productName, productThumbnail, productPrice, pos }) => {

  if (!productThumbnail || !productName || 
    typeof productPrice === 'undefined') return null; 
    // price can be 0 / zero and it will validate to a false. So, use 'undefined' instead.


  const configAddToCartBtn = {
    type: 'button'
  };


  return ( 
    <div className="product" key={pos}>
      <div className="thumb">
        <img src={productThumbnail} alt={productName} />
      </div>

      <div className="details">
        <ul>
          <li>
            <span className="name">
              {productName}
            </span>
          </li>
          <li>
            $<span className="price">
              {productPrice}
            </span>
          </li>
          <li>
            <div className="addToCart">
              <Button {...configAddToCartBtn}>
                Add to Cart
              </Button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
 
export default Product;