import { useState } from 'react';
import styles from './ShopPage.module.scss'
import ShopList from './shop_list/ShopList';
import ProductList from './product/ProductList';
import { ProductCartProps } from '../../Api';

type ShopPageProps = {
    sendProductsToCart: (products: ProductCartProps) => void
}
const ShopPage = ({ sendProductsToCart }: ShopPageProps) => {
    const [selectedShop, setSelectedShop] = useState(0)
    return (
        <div className={styles.shopPageContainer}>
            <ShopList onClick={setSelectedShop} selectedShop={selectedShop} />
            <ProductList shopId={selectedShop} sendProductsToCart={sendProductsToCart} />
        </div>
    );
};

export default ShopPage;