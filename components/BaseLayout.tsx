import { SafeAreaView } from "react-native-safe-area-context";

export default function BaseLayout({children}: any){
    return(
        <SafeAreaView style={{padding: 10}}>
            {children}
        </SafeAreaView>
    )
}