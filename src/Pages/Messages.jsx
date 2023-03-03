import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { ScrollView } from "react-native";
import { Image } from "react-native";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import UserChat from "../Components/Messages/UserChat";
import { UserContext } from "../Context/UserContext";

export default function Messages(){
    const navigate = useNavigation();
    const {chat} = useContext(UserContext);

    const NavigateToNewMessage = () =>{
        navigate.navigate("NewMessage");
    }
    return(
        <View style={{flex: 1 , backgroundColor: '#27272a',position: 'relative'}}>
            <ScrollView>
                {chat.filter(e=> (e.messages.length > 0)).map(e => <UserChat key={e.id} name={e.name} message={e.messages[e.messages.length -1]} online={e.online} profile={e.profile} OnPress={() => navigate.navigate("PrivateChat",{ParamKey: e.id})}/>)}
            </ScrollView>
            
               <View style={{position: 'absolute',bottom: 20,right: 20}}>
                    <TouchableOpacity onPress={() => NavigateToNewMessage()}>
                        <View style={{width: 65,height: 65,borderRadius: 50,backgroundColor: '#5FC4BE',justifyContent: 'center',alignItems: 'center'}}>
                            <Image style={{width: 25,height:25}} source={{uri: 'https://cdn.discordapp.com/attachments/1057734919964606526/1080858884702490654/img_510194.png'}}/>
                        </View>
                    </TouchableOpacity>
               </View>
            
        </View>
    )
}