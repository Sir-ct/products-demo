// app/(tabs)/cart.tsx
import { View, Text, Button } from 'react-native';
import { useContext } from 'react';
import { router } from 'expo-router';
import CartItem from '@/components/CartItem';
import { CartContext } from '@/contexts/CartContext';
import BaseLayout from '@/components/BaseLayout';
import { Order } from '@/types';
import Header from '@/components/Header';

export default function Cart() {
  const { items } = useContext(CartContext);

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <BaseLayout>
        <Header title="Cart" />
        <View>
            {items?.map(item => (
                <CartItem key={item.id} item={item} />
            ))}
            <Text style={{paddingVertical: 10}}>Total: ₦{total.toFixed(2)}</Text>
            <Button 
                title="Checkout" 
                disabled={items.length == 0}
                onPress={() => {
                    let stringifiedItems = JSON.stringify(items)
                    router.push({
                        pathname: '/checkout',
                        params: {
                            items: stringifiedItems,
                            total: total.toFixed(2)
                        }
                    })
                }}
            />
        </View>
    </BaseLayout>
  );
}
