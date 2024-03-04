import { ListItem, Button } from "@mui/material"
import styles from './CartPage.module.scss'
import { Product, ProductCartProps } from "../../Api"
import { ChangeEvent, useState } from "react"

type CartContentItemProps = {
    products: ProductCartProps,
    changeQuantity: (quantity: number, index: number) => void,
    index: number
}

const CartContentItem = ({ products, changeQuantity, index }: CartContentItemProps) => {
    const [price, setPrice] = useState(products.product.price * products.quantity)
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        changeQuantity(parseInt(event.target.value), index);
        setPrice(products.product.price * products.quantity)
    }
    return (
        <ListItem>
            <div className={styles.cartContentItemContainer}>
                <img src={products.product.image_url} />
                <div className={styles.productInfo}>
                    <div>{products.product.name}</div>
                    <div className={styles.productPrice}>Price: {price}</div>
                    <input type="number" min="1" defaultValue={products.quantity} onChange={handleChange} />
                </div>
            </div >
        </ListItem>
    )
}

export default CartContentItem