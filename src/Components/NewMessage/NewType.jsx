import { TouchableOpacity } from "react-native";
import { View,Text } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons';


export default function NewType({OnPress}){
    return(
        <TouchableOpacity onPress={OnPress}>
            <View style={{width: '100%',flexDirection: 'row',alignItems: 'center',padding: 10}}>
                <View style={{width: 60,height:60,backgroundColor: '#5FC4BE',borderRadius: 50,justifyContent: 'center',alignItems: 'center',marginRight: 10}}>
                    <FontAwesomeIcon color="#FFF" icon={Icons.faUserGroup} size={25}/> 
                </View>
                <Text style={{fontSize: 18,color: '#FFF',fontWeight: '500'}}>Novo Grupo</Text>
            </View>
        </TouchableOpacity>
        
    )
}