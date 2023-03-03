import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { AvatarNull } from "../../Global";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons';

export default function UserGroupList({name,profile,OnPress,Selected}){
    return(
        <TouchableOpacity onPress={OnPress}>
            <View style={{width: '100%',padding: 10,flexDirection: 'row',alignItems: 'center'}}>
                <Image style={{width: 50,height: 50,borderRadius: 50,marginRight: 10}} source={{uri: profile !== null ? profile : AvatarNull}}/>
                <View style={{flex: 1 ,flexDirection: 'row',alignItems: 'center',justifyContent: 'space-between'}}>
                    <Text style={{color: Selected ? '#5FC4BE' : '#FFF',fontSize: 16,fontWeight: '500'}}>{name}</Text>
                    {Selected ? <FontAwesomeIcon color="#5FC4BE" icon={Icons.faCheck} size={25}/> : null}
                </View>
                
            </View>
        </TouchableOpacity>
        
    )
}