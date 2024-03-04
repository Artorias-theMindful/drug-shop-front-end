import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ShopPage from './components/shop/ShopPage';
import CartPage from './components/cart/CartPage';
import Header from './components/Header';
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Api, Cart, OrderProps, ProductCartProps } from './Api';
import Modal from '@mui/material/Modal';
import { Box, Snackbar } from '@mui/material';
import styles from './App.module.scss'

const App = () => {

  const api = new Api()

  const [cartContent, setCartContent] = useState<Cart | null>(null)
  const [email, setEmail] = useState<string>("")
  const [address, setAddress] = useState<string>("")
  const [phone, setPhone] = useState<string>("")
  const [name, setName] = useState<string>("")

  const [openModal, setOpenModal] = useState(false)
  const handleCloseModal = () => setOpenModal(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  }

  const [openSnackBar, setOpenSnackBar] = useState(false)
  const handleCloseSnackBar = () => setOpenSnackBar(false);
  const handleOpenSnackBar = () => {
    setOpenSnackBar(true);
  }

  const calculateTotalPrice = (cart: Cart) => {
    let total_price = 0
    for (let i = 0; i < cart.products.length; i++) {
      total_price += (cart.products[i].quantity * cart.products[i].product.price)
    }
    return total_price
  }

  const handleAddingToCart = (products: ProductCartProps) => {
    if (cartContent == null) {
      setCartContent({
        products: [products],
        total_price: products.quantity * products.product.price
      })
    }
    else if (cartContent.products.find(product => product.product.id == products.product.id)) {
      const tempCart = cartContent as Cart
      const productIndex = cartContent.products.findIndex(product => product.product.id == products.product.id)
      tempCart.products[productIndex].quantity += products.quantity
      tempCart.total_price = calculateTotalPrice(tempCart)
      setCartContent(tempCart)
    }
    else {
      const tempCart = cartContent as Cart
      tempCart.products.push(products)
      tempCart.total_price = calculateTotalPrice(tempCart)
      setCartContent(tempCart)
    }
  }

  const handleChangingCart = (quantity: number, index: number) => {
    const tempCart = cartContent as Cart
    tempCart.products[index].quantity = quantity
    setCartContent(tempCart)
  }

  const handleSubmission = async (name: string, email: string, phone: string, address: string) => {
    if (cartContent == null) {
      handleOpenModal()
      return
    }
    const orderPrors: OrderProps = {
      address: address,
      phone: phone,
      email: email,
      name: name,
      order_data: cartContent as Cart
    }
    await api.saveOrder(orderPrors)
    setCartContent(null)
    handleOpenSnackBar()
  }

  return (
    <div>
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path='*' element={<Navigate to={'/shop'} />}></Route>
            <Route path="/shop" element={<ShopPage sendProductsToCart={(products: ProductCartProps) => handleAddingToCart(products)} />} />
            <Route path="/cart" element={<CartPage
              changeAddress={(text) => setAddress(text)}
              changeEmail={(text) => setEmail(text)}
              changeName={(text) => setName(text)}
              changePhone={(text) => setPhone(text)}
              changeQuantity={(quantity, index) => handleChangingCart(quantity, index)}
              name={name} email={email} address={address} phone={phone} cart={cartContent as Cart}
              handleSubmission={(name, email, phone, address) => handleSubmission(name, email, phone, address)} />} />
          </Routes>
        </div>
      </Router>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box>
          <div className={styles.modalContainer}>
            You have to choose at least 1 product
          </div>
        </Box>
      </Modal>
      <Snackbar
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={handleCloseSnackBar}
        message="Successful order submission"
      />
    </div>
  );
};

export default App;