import { createContext } from "react";
import * as Network from 'expo-network';
import { Text, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

interface NetworkContextInterface {
    isConnected: boolean;
}

const NetworkContext = createContext<NetworkContextInterface>(null!)

export function NetworkProvider({children}: any){
    const networkState = Network.useNetworkState()


    return(
        <NetworkContext.Provider value={{isConnected: networkState.isConnected!}}>
            {children}
            {
                // !networkState.isConnected
                // &&
                <View>
                    <MaterialIcons name="wifi-off" />
                    <Text>Connection error</Text>
                </View>
            }
        </NetworkContext.Provider>
    )
}