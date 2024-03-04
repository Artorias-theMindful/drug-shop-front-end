import { Grid, List } from "@mui/material"
import ProductListItem from "./ProductListItem"
import { useEffect, useState } from "react"
import { Api, Product, ProductCartProps } from "../../../Api"

const api = new Api()
type ProductListProps = {
    shopId: number,
    sendProductsToCart: (products: ProductCartProps) => void
}

const ProductList = ({ shopId, sendProductsToCart }: ProductListProps) => {
    const [products, setProducts] = useState([] as Product[]);

    useEffect(() => {
        const asyncSetProducts = async () => {
            const productsAsync = await api.getShopsProducts(shopId);
            setProducts(productsAsync);
        };

        asyncSetProducts();
    }, [shopId]);

    return (
        <List>
            <Grid container spacing={2}>
                {products.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6}>
                        <ProductListItem product={product} sendProductsToCart={sendProductsToCart} />
                    </Grid>
                ))}
            </Grid>
        </List>
    );
};


export default ProductList