import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useContext } from 'react';
import { CartContext } from '@/contexts/CartContext';

type Props = {
  item: any;
};

export default function CartItem({ item }: Props) {
  const { updateQty, removeFromCart } = useContext(CartContext);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{item.title}</Text>
        <Text>₦{item.price.toFixed(2)}</Text>
      </View>

      <View style={styles.controls}>
        <Pressable
          style={styles.qtyButton}
          onPress={() => updateQty(item.id, Math.max(1, item.quantity - 1))}
        >
          <Text>-</Text>
        </Pressable>

        <Text style={styles.qty}>{item.quantity}</Text>

        <Pressable
          style={styles.qtyButton}
          onPress={() => updateQty(item.id, item.quantity + 1)}
        >
          <Text>+</Text>
        </Pressable>
      </View>

      <Pressable onPress={() => removeFromCart(item.id)}>
        <Text style={styles.remove}>Remove</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    marginVertical: 6,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 1,
  },
  title: {
    fontWeight: '600',
    marginBottom: 4,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  qtyButton: {
    padding: 6,
    borderWidth: 1,
    borderRadius: 4,
    marginHorizontal: 6,
  },
  qty: {
    fontSize: 16,
    fontWeight: '500',
  },
  remove: {
    color: 'red',
    marginTop: 8,
  },
});
