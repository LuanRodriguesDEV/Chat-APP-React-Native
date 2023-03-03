import { Text } from "react-native";
import { Image, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AvatarNull } from "../../Global";

export default function NewUserGroup({name,profile,OnPress}){
    return(
        <TouchableOpacity onPress={OnPress}>
            <View style={{padding: 10,alignItems: 'center'}}>
                <View>
                    <Image style={{width: 50,height: 50,borderRadius: 50}} source={{uri: profile !== null ? profile : AvatarNull}}/>
                    <View style={{width: 20,height:20,borderRadius: 50,backgroundColor: '#AAA',marginTop: -15,marginLeft: 35,alignItems: 'center',justifyContent: 'center'}}>
                        <Text style={{fontSize: 12, fontWeight: '500'}}>X</Text>
                    </View>
                </View>
                <Text style={{color: '#fff',fontSize: 16,fontWeight: '500'}}>{name}</Text>
            </View>
        </TouchableOpacity>
    )
}