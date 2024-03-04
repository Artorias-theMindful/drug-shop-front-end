import { ListItemButton } from '@mui/material';
import cn from 'classnames'
import styles from '../ShopPage.module.scss';
import { Shop } from '../../../Api';

type ShopListItemProps = {
    onClick: () => void,
    isSelected: boolean,
    shop: Shop
}

function ShopListItem({ onClick, isSelected, shop }: ShopListItemProps) {

    return (
        <div className={cn(styles.shopListItemContainer,
            isSelected && styles.shopListSelectedItemContainer)}>
            <ListItemButton onClick={onClick}>
                {shop.name}
            </ListItemButton>
        </div>
    );
};

export default ShopListItem;