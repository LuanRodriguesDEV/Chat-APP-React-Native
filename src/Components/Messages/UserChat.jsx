import { TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { Image } from "react-native";
import { View } from "react-native";
import { AvatarNull } from "../../Global";

export default function UserChat({name,message,online,profile,OnPress}){
    return(
        <TouchableOpacity onPress={OnPress}>
            <View style={{width: '100%',flexDirection: 'row',alignItems: 'center',padding: 10}}>
                <View style={{width: 65,height: 65,justifyContent: 'center',alignItems: 'center' , backgroundColor: online ? '#5FC4BE' : 'transparent',marginRight: 10,borderRadius: 50}}>
                    <Image style={{width: 60,height: 60,borderRadius: 50}} source={{uri: profile !== null ? profile : AvatarNull}}/>
                </View>
                
                <View style={{flex: 1}}>
                <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'space-between'}}>
                        <Text style={{color: '#FFF',fontSize: 16,fontWeight: '500',marginVertical: 4}}>{name}</Text>
                        <Text style={{color: '#ccc',fontSize: 12}}>{message.createdAt.substr(11,5)}</Text>
                    </View>
                    <Text numberOfLines={1} style={{color: '#ccc',fontSize: 13,fontWeight: '500'}}>{message.message}</Text>
                </View>
            </View>
        </TouchableOpacity>       
    )
}