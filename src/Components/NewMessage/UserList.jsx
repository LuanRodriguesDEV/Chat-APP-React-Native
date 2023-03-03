import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { AvatarNull } from "../../Global";

export default function UserList({name,profile,OnPress}){
    return(
        <TouchableOpacity onPress={OnPress}>
            <View style={{width: '100%',padding: 10,flexDirection: 'row',alignItems: 'center'}}>
                <Image style={{width: 50,height: 50,borderRadius: 50,marginRight: 10}} source={{uri: profile !== null ? profile : AvatarNull}}/>
                <Text style={{color: '#FFF',fontSize: 16,fontWeight: '500'}}>{name}</Text>
            </View>
        </TouchableOpacity>
        
    )
}