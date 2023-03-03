import { Image } from "react-native";
import { View } from "react-native";

export default function Reels(){
    return(
        <View style={{flex: 1,backgroundColor: '#27272a',justifyContent: 'center',alignItems: 'center'}}>
            <Image style={{width: 200,height:200}} source={{uri: 'https://cdn.discordapp.com/attachments/1057734919964606526/1080921949305311272/5110208.png'}}/>
        </View>
    )
}