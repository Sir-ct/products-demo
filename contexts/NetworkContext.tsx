import { createContext, useEffect, useState } from "react";
import * as Network from 'expo-network';
import { Dimensions, Text, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

interface NetworkContextInterface {
    isConnected: boolean | undefined;
}

const NetworkContext = createContext<NetworkContextInterface>(null!)

export function NetworkProvider({children}: any){
    const networkState = Network.useNetworkState()

    let [isConnected, setIsConnected] = useState<boolean | undefined>(undefined)

    useEffect(()=>{
        setIsConnected(networkState.isConnected)
    }, [networkState])

    return(
        <NetworkContext.Provider value={{isConnected}}>
            {children}
            {
                !networkState.isConnected
                &&
                <View style={{
                    flexDirection: 'row',
                    padding: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 10,
                    position: 'absolute',
                    bottom: 0,
                    backgroundColor: "#000",
                    width: Dimensions.get('window').width
                }}>
                    <MaterialIcons name="wifi-off" color={"yellow"} size={28} />
                    <Text style={{color: 'yellow'}}>Connection error</Text>
                </View>
            }
        </NetworkContext.Provider>
    )
}