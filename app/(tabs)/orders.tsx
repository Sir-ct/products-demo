import BaseLayout from '@/components/BaseLayout';
import Header from '@/components/Header';
import { OrderContext } from '@/contexts/OrderContext';
import { Order } from '@/types';
import { useContext } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';


export default function Orders() {
    let {orders} = useContext(OrderContext)
    
    const MOCK_ORDERS: Order[] = orders || [];
    console.log("orders", MOCK_ORDERS.length)
    
    if (MOCK_ORDERS.length === 0) {
        return (
            <View style={styles.empty}>
                <Text style={styles.emptyText}>No orders yet 🛒</Text>
            </View>
        );
    }

    return (
        <BaseLayout>
            <Header title="Orders" />
            <FlatList
                data={MOCK_ORDERS}
                keyExtractor={item => item.id!}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                    <Text style={styles.id}>Order #{item.id}</Text>
                    <Text>Date: {item.createdAt}</Text>
                    <Text>Total: ₦{item.totalAmount.toFixed(2)}</Text>
                    <Text>Status: {item.status}</Text>
                    </View>
                )}
            />
        </BaseLayout>
    );
}

const styles = StyleSheet.create({
  list: {
    paddingVertical: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 1,
  },
  id: {
    fontWeight: '600',
    marginBottom: 6,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#777',
  },
});
