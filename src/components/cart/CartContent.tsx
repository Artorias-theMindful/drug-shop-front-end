import { List, Grid } from '@mui/material'
import { Cart } from '../../Api'
import styles from './CartPage.module.scss'
import CartContentItem from './CartContentItem'

type CartContentProps = {
    cart: Cart | null,
    changeQuantity: (quantity: number, index: number) => void
}
const CartContent = ({ cart, changeQuantity }: CartContentProps) => {
    return (
        <div className={styles.cartContentContainer}>
            <List>
                <Grid container spacing={2}>
                    {cart?.products.map((product, index) => (
                        <Grid item key={product.product.id} xs={12} sm={6}>
                            <CartContentItem products={product} changeQuantity={changeQuantity} index={index} />
                        </Grid>
                    ))}
                </Grid>
            </List>
        </div>
    )
}

export default CartContent