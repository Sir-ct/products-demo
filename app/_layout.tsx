import { CartProvider } from "@/contexts/CartContext";
import { NetworkProvider } from "@/contexts/NetworkContext";
import { OrderProvider } from "@/contexts/OrderContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";

const queryClient = new QueryClient()

export default function RootLayout() {
  return (
    <NetworkProvider>
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <OrderProvider>
            <Stack screenOptions={{headerShown: false}} />
          </OrderProvider>
        </CartProvider>
      </QueryClientProvider>
    </NetworkProvider>
   
  )
}
