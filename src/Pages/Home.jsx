import { View } from "react-native";
import Header from "../Components/Home/Header";
import HomeTabs from "../Routes/RoutesTopMaterial";

export default function Home(){
    return(
        <View style={{flex: 1,backgroundColor: '#18181b'}}>
            <Header/>
            <HomeTabs/>
        </View>
    )
}