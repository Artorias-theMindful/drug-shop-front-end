import { Grid } from '@mui/material';
import UserInfoInputs from './UserInfoInputs';
import CartContent from './CartContent';
import styles from './CartPage.module.scss'
import { Cart } from '../../Api';

type CartPageProps = {
    changeAddress: (text: string) => void,
    changeEmail: (text: string) => void,
    changePhone: (text: string) => void,
    changeName: (text: string) => void,
    changeQuantity: (quantity: number, index: number) => void,
    handleSubmission: (name: string, email: string, phone: string, address: string) => void,
    address: string,
    email: string,
    phone: string,
    name: string,
    cart: Cart
}
const CartPage = ({ changeAddress, changeEmail, changeName, changePhone, changeQuantity, handleSubmission,
    address, phone, name, email, cart }: CartPageProps) => {
    return (
        <div className={styles.cartPageContainer}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <UserInfoInputs
                        changeAddress={changeAddress} changeEmail={changeEmail} changeName={changeName} changePhone={changePhone}
                        name={name} email={email} address={address} phone={phone} handleSubmission={handleSubmission} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <CartContent cart={cart} changeQuantity={changeQuantity} />
                </Grid>
            </Grid>
        </div>
    );
};

export default CartPage;