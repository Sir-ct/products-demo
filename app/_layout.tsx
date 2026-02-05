import { CartProvider } from "@/contexts/CartContext";
import { OrderProvider } from "@/contexts/OrderContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";

const queryClient = new QueryClient()

export default function RootLayout() {
  return (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <OrderProvider>
        <Stack screenOptions={{headerShown: false}} />
      </OrderProvider>
    </CartProvider>
  </QueryClientProvider>
   
  )
}
