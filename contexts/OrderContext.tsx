import { Order } from "@/types"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react"

type OrderContextType = {
    orders: Order[];
    addOrder: (order: Order) => void
}

export const OrderContext = createContext<OrderContextType>(null!);

export const OrderProvider: React.FC<{children: React.ReactNode}> = ({children})=>{
    const [orders, setOrders] = useState<Order[]>([])

    useEffect(() => {
        AsyncStorage.getItem('ORDER').then(data => {
            if (data) setOrders(JSON.parse(data));
        });
    }, []);

    useEffect(() => {
        AsyncStorage.setItem('ORDER', JSON.stringify(orders));
    }, [orders]);

    async function addOrder(order: Order){
        let newOrder: Order = {
            ...order,
            id: String(orders.length + 1),
            createdAt: new Date().toDateString(),
            status: 'completed'
        }
        setOrders(prev=> [...prev, newOrder])
    }

    return(
        <OrderContext.Provider value={{orders, addOrder}}>
            {children}
        </OrderContext.Provider>
    )
}