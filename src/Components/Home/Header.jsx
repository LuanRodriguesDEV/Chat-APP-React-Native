import { useContext } from "react";
import { Text,TouchableOpacity,Image,View } from "react-native";
import { UserContext } from "../../Context/UserContext";
import { AvatarNull } from "../../Global";

export default function Header(){
    const {user} = useContext(UserContext);
    return(
        <View style={{width: '100%',flexDirection: 'row',alignItems: 'center',justifyContent: 'space-between',padding: 10}}>
            <View style={{flexDirection: 'row',alignItems: 'center'}}>
                <Image style={{ width: 40,height: 40}} source={{uri: 'https://cdn.discordapp.com/attachments/1057734919964606526/1080829853714092122/image-removebg-preview_1_cropped.png'}}/>
                <Text style={{marginLeft: 10,fontSize: 18,fontWeight: '500',color: '#5FC4BE'}}>TalkMe</Text>
            </View>
            <View>
                <TouchableOpacity>
                    <Image style={{ width: 40,height: 40,borderRadius: 50}} source={{uri: user.profile !== null ? user.profile : AvatarNull}}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}