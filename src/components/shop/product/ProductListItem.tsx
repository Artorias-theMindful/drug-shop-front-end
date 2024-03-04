import { Box, Button, InputLabel, ListItem, Modal, TextField } from '@mui/material';
import cn from 'classnames'
import styles from '../ShopPage.module.scss';
import { Product, ProductCartProps, Shop } from '../../../Api';
import { ChangeEvent, useState } from 'react';

type ProductListItemProps = {
    product: Product,
    sendProductsToCart: (products: ProductCartProps) => void
}

const ProductListItem = ({ product, sendProductsToCart }: ProductListItemProps) => {
    const [open, setOpen] = useState(false);
    const [productNumber, setProductNumber] = useState(1)

    const handleOpen = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();
        setOpen(true);
    }
    const handleClose = () => setOpen(false);
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setProductNumber(parseInt(event.target.value));
    }

    const handleClick = () => {
        const productsToSend: ProductCartProps = {
            product: product,
            quantity: productNumber
        }
        sendProductsToCart(productsToSend)
        handleClose()
    }

    return (
        <div>
            <ListItem>
                <div className={styles.productListItemContainer}>
                    <img src={product.image_url} />
                    <div className={styles.productInfo}>
                        <div>{product.name}</div>
                        <div className={styles.productPrice}>Price: {product.price}</div>
                        <Button variant='contained' onClick={handleOpen}>
                            Add to cart
                        </Button>
                    </div>
                </div >
            </ListItem>
            <Modal open={open} onClose={handleClose}>
                <Box>
                    <div className={styles.modalContainer}>
                        <input type="number" value={productNumber} min="1"
                            onChange={handleChange} />
                        <Button variant="contained" onClick={handleClick}>
                            add to cart
                        </Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default ProductListItem;