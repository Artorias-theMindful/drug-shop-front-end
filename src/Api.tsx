import axios from 'axios';

export type Shop = {
    id: number,
    name: string,
    latitude: number,
    longitude: number
}
export type Product = {
    id: number,
    name: string,
    image_url: string,
    price: number,
    shop_id: number
}
export type ProductCartProps = {
    product: Product,
    quantity: number
}
export type Order = {
    id: number,
    name: string,
    email: string,
    phone: string,
    address: string,
    order_data: Cart
}
export type OrderProps = {
    name: string,
    email: string,
    phone: string,
    address: string,
    order_data: Cart
}
export type Cart = {
    products: ProductCartProps[],
    total_price: number
}
export class Api {
    link: string
    constructor() {
        this.link = process.env.REACT_APP_SERVER_LINK as string
    }
    async getShops(): Promise<Shop[]> {
        const responce = await axios.get(`${this.link}/shops`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = responce.data
        return data.shops
    }
    async getShopsProducts(id: number): Promise<Product[]> {
        const responce = await axios.get(`${this.link}/shops/${id}/products`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = responce.data
        return data.products
    }
    async saveOrder(props: OrderProps) {
        await axios.post(`${this.link}/orders`, {
            address: props.address,
            email: props.email,
            phone: props.phone,
            name: props.name,
            order_data: props.order_data
        })
    }
}