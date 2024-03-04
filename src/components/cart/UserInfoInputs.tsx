import { Button, TextField } from "@mui/material"
import styles from "./CartPage.module.scss"

type UserInfoInputsProps = {
    changeAddress: (text: string) => void,
    changeEmail: (text: string) => void,
    changePhone: (text: string) => void,
    changeName: (text: string) => void,
    address: string,
    email: string,
    phone: string,
    name: string,
    handleSubmission: (name: string, email: string, phone: string, address: string) => void
}
const UserInfoInputs = (
    { changeAddress, changeEmail, changeName, changePhone, handleSubmission,
        address, phone, name, email }
        : UserInfoInputsProps) => {

    return (
        <div className={styles.userInfoInputs}>
            <TextField id="outlined-basic" label="Name" variant="outlined"
                value={name} onChange={(e) => changeName(e.target.value)} />
            <TextField id="outlined-basic" label="Email" variant="outlined"
                value={email} onChange={(e) => changeEmail(e.target.value)} />
            <TextField id="outlined-basic" label="Phone" variant="outlined"
                value={phone} onChange={(e) => changePhone(e.target.value)} />
            <TextField id="outlined-basic" label="Address" variant="outlined"
                value={address} onChange={(e) => changeAddress(e.target.value)} />
            <Button variant="contained" onClick={() => handleSubmission(name, email, phone, address)}>
                submit
            </Button>
        </div>
    )
}

export default UserInfoInputs