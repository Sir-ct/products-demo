import { View, Text, Image, StyleSheet, ScrollView, Pressable, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { CartContext } from '@/contexts/CartContext';
import { fetchProductById } from '@/api/products';
import Loader from '@/components/Loader';
import ErrorState from '@/components/ErrorState';
import BaseLayout from '@/components/BaseLayout';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Header from '@/components/Header';

export default function ProductDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { addToCart } = useContext(CartContext);

  const {
    data: product,
    isLoading,
    isError,
    refetch,
  } = useQuery({queryKey: ['product', id], queryFn: () => fetchProductById(id!)});

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !product) {
    return (
      <ErrorState
        message="Unable to load product details."
        onRetry={refetch}
      />
    );
  }

  return (
    <BaseLayout>
        <Header title="Details" />
        <ScrollView contentContainerStyle={styles.container}>
        <Image source={{ uri: product.image }} style={styles.image} />

        <View style={styles.content}>
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.price}>₦{product.price.toFixed(2)}</Text>

            <Text style={styles.category}>{product.category}</Text>

            <Text style={styles.description}>
            {product.description}
            </Text>

            <Pressable
            style={styles.button}
            onPress={() => addToCart(product)}
            >
            <Text style={styles.buttonText}>Add to Cart</Text>
            </Pressable>
        </View>
        </ScrollView>
    </BaseLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 24,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 320,
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
  },
  category: {
    fontSize: 14,
    color: '#777',
    marginBottom: 12,
    textTransform: 'capitalize',
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: '#444',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 14,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
});
