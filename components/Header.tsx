import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Header({title}: any){
    return(
        <View style={{paddingVertical: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            {
                router.canGoBack()
                &&
                <TouchableOpacity onPress={router.back}>
                    <MaterialIcons name='arrow-back' size={30} />
                </TouchableOpacity>
            }

            <Text style={{fontSize: 18, fontWeight: '600'}}>{title}</Text>
        </View>
    )
}