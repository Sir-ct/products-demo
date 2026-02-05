// app/(tabs)/index.tsx
import { FlatList, TextInput, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { fetchProducts } from '@/api/products';
import Loader from '@/components/Loader';
import ErrorState from '@/components/ErrorState';
import ProductCard from '@/components/ProductCard';
import BaseLayout from '@/components/BaseLayout';
import Header from '@/components/Header';

export default function Home() {
  const { data, isLoading, error } = useQuery({queryKey: ['products'], queryFn: fetchProducts});
  const [search, setSearch] = useState('');

  if (isLoading) return <Loader />;
  if (error) return <ErrorState />;

  const filtered = data!.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <BaseLayout>
      <Header title="Products" />
      <View style={{paddingBottom: 150}}>
        <TextInput 
          placeholder="Search products" 
          onChangeText={setSearch} 
          style={{
            borderWidth: 1,
            borderRadius: 10
          }}
        />
        {
          filtered
          &&
          <FlatList
            data={filtered}
            renderItem={({ item }) => <ProductCard product={item} />}
            keyExtractor={item => item.id}
          />
        }
      </View>
    </BaseLayout>
  );
}
