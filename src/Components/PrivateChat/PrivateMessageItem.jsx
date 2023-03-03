import { Text } from "react-native"
import { View } from "react-native"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons';
import { Dimensions } from "react-native";



export default function PrivateMessageItem({Id,Item}){
    const {width} = Dimensions.get('window');
    
    if(Item.userId !== Id){
        return(
            <View style={{backgroundColor: '#3d414c',padding: 10,marginVertical: 10,maxWidth: width * 0.8,borderTopLeftRadius: 8,borderTopRightRadius: 8,borderBottomRightRadius: 8,marginLeft: 20,elevation: 20}}>
                <Text style={{fontSize: 16,color: '#fff'}}>{Item.message}</Text>
                <Text style={{fontSize: 11,color:'#ccc',textAlign: 'right'}}>{Item.createdAt.substr(11,5)}</Text>
            </View>
        )
    }else{
        return(
            <View style={{backgroundColor: '#fff',padding: 10,marginVertical: 10,maxWidth: width * 0.8,borderTopLeftRadius: 8,borderTopRightRadius: 8,borderBottomLeftRadius: 8,marginLeft: width * 0.2 - 20,elevation: 20}}>
                <Text style={{fontSize: 16,color: '#000'}}>{Item.message}</Text>
                <View style={{flexDirection: 'row-reverse',alignItems: 'center'}}>
                    <FontAwesomeIcon color='#1e293b' icon={Icons.faCheck} size={10}/>
                    <Text style={{fontSize: 11,color:'#ccc',textAlign: 'right',marginRight: 5}}>{Item.createdAt.substr(11,5)}</Text>
                </View> 
            </View>           
        )
    }
}