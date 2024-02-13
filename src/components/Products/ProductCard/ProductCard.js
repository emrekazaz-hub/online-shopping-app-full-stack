import { productsDb } from '../../Database/Database';

function fetchProducts() {
    return productsDb.map((product) => ({
        productId: product.productId,
        productName: product.productName,
        productImage: product.productImage,
        productPrice: product.productPrice,
        productDetails : product.productDetails,
    }));
}

export default fetchProducts;
