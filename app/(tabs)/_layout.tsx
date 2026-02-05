import { CartContext } from '@/contexts/CartContext';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from 'expo-router';
import { useContext } from 'react';

export default function TabLayout(){
    let {items} = useContext(CartContext)

    return(
        <Tabs screenOptions={{headerShown: false}}>
            <Tabs.Screen name="index" options={{title: "Home", tabBarIcon: ()=> <MaterialIcons name='house' size={28} />}} />
            <Tabs.Screen name="orders" options={{title: "Orders", tabBarIcon: ()=> <MaterialIcons name='content-paste' size={28} />}} />
            <Tabs.Screen 
                name="cart" 
                options={{
                    title: "Cart", 
                    tabBarIcon: ()=> <MaterialIcons name='trolley' size={28} />,
                    tabBarBadge: items.length > 0 ? items.length : undefined
                }} 
            />
        </Tabs>
    )
};
