import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';
import { Product } from '../types';
import { useContext } from 'react';
import { CartContext } from '@/contexts/CartContext';

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const {addToCart} = useContext(CartContext);

  console.log("product in product card page", product)

  return (
    <Pressable
      style={styles.card}
      onPress={() => router.push(`/product/${product.id}`)}
    >
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>₦{product.price.toFixed(2)}</Text>

      <Pressable
        style={styles.button}
        onPress={() => addToCart(product)}
      >
        <Text style={styles.buttonText}>Add to Cart</Text>
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    marginVertical: 10,
    padding: 12,
    borderRadius: 8,
    elevation: 2,
  },
  image: {
    height: 150,
    borderRadius: 6,
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  price: {
    marginVertical: 6,
    fontSize: 14,
    color: '#444',
  },
  button: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 6,
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});
