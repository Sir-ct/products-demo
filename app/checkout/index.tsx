import { View, Button, TextInput, Alert, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useContext, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { CartContext } from '@/contexts/CartContext';
import BaseLayout from '@/components/BaseLayout';
import { Text } from 'react-native';
import { CartItem, Order } from '@/types';
import { OrderContext } from '@/contexts/OrderContext';
import Header from '@/components/Header';

export default function Checkout() {
  const params = useLocalSearchParams()
  const { clearCart } = useContext(CartContext);
  const { addOrder } = useContext(OrderContext)
  const [address, setAddress] = useState('');

  const checkoutItems = JSON.parse(params?.items as string)
  const total = params.total || "0"

  const submit = () => {
    if (!address) {
      Alert.alert('Validation Error', 'Address is required');
      return;
    }
    let order: Order = {
        items: checkoutItems,
        totalAmount: parseInt(total as string),
        shippingAddress: address
    }
    addOrder(order)
    clearCart();
    router.replace('/checkout/success');
  };

  return (
    <BaseLayout>
        <Header title="Checkout" />
        <ScrollView contentContainerStyle={[styles.container]}>

            <View style={[styles.section]}>
                <Text style={styles.sectionTitle}>Order Details</Text>

                {checkoutItems?.map((item: CartItem) => (
                    <View key={item.id} style={styles.orderRow}>
                        <Text style={styles.orderItem}>
                        {item.title} × {item.quantity}
                        </Text>
                        <Text style={styles.orderPrice}>
                        ₦{(item.price * item.quantity).toFixed(2)}
                        </Text>
                    </View>
                ))}

                <View style={styles.divider} />

                <View style={styles.orderRow}>
                    <Text style={styles.totalLabel}>Total</Text>
                    <Text style={styles.totalAmount}>
                        ₦{total}
                    </Text>
                </View>
            </View>

            <View style={[styles.section]}>
                <Text style={[styles.sectionTitle, {marginTop: 20}]}>Shipping Information</Text>
                <TextInput placeholder="Shipping Address" onChangeText={setAddress} style={[styles.inputStyle]} />
                <Button title="Place Order" onPress={submit} />
            </View>
        </ScrollView>
    </BaseLayout>
  );
}

const styles = StyleSheet.create({
    inputStyle : {
        borderRadius: 10,
        borderWidth: 2,
        marginVertical: 10
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 16,
    },
    container: {
        padding: 20,
        height: Dimensions.get('window').height,
        backgroundColor: '#fff',
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 12,
    },
    orderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
    },
    orderItem: {
        flex: 1,
        marginRight: 10,
    },
    orderPrice: {
        fontWeight: '500',
    },
        divider: {
        height: 1,
        backgroundColor: '#eee',
        marginVertical: 10,
    },
    totalLabel: {
        fontSize: 16,
        fontWeight: '700',
    },
    totalAmount: {
        fontSize: 16,
        fontWeight: '700',
    },
})
