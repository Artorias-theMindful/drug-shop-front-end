import { useEffect, useState } from 'react';
import { List } from '@mui/material';
import ShopListItem from './ShopListItem';
import { Api, Shop } from '../../../Api';
import styles from '../ShopPage.module.scss';

const api = new Api()

type ShopListProps = {
    onClick: (id: number) => void,
    selectedShop: number
}
const ShopList = ({ onClick, selectedShop }: ShopListProps) => {
    const [shops, setShops] = useState([] as Shop[])
    useEffect(() => {
        const asyncSetShops = async () => {
            const asyncShops = await api.getShops()
            setShops(asyncShops)
        }
        asyncSetShops()
    }, []);

    return (
        <List className={styles.shopListContainer}>
            {shops.map((shop) => (
                <ShopListItem shop={shop} key={shop.id} isSelected={shop.id === selectedShop} onClick={() => onClick(shop.id)} />
            ))}
        </List>
    );
};

export default ShopList;