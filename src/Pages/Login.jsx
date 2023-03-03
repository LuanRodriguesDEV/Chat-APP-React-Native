import { Image, Switch, Text, TextInput, TouchableOpacity, View } from "react-native";
import TextInputCustom from "../Components/Login/TextInputCustom";
import * as Icons from '@fortawesome/free-solid-svg-icons';
import { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../Context/UserContext";
import api from "../Services/Axios";


export default function Login() {
    const {SetLogin} = useContext(UserContext);
    const navigate = useNavigation();
    const [isEnabled,setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    async function SendLogin(){
        await api
        .get(`User/${email}/${password}`)
        .then(function (response) {      
            SetLogin(response.data)
           
        })
        .catch(function (error) {
            
           console.log(error);
        });
    }
    
    return(
        <View style={{flex: 1,backgroundColor: '#18181b'}}>
            <View style={{width: '100%',height: 300}}>
                <Image style={{flex: 1}} source={{uri: 'https://cdn.discordapp.com/attachments/1057734919964606526/1080215828504531054/image-removebg-preview_1.png'}}/>
            </View>
            <View style={{flex: 1,backgroundColor: '#27272a',borderTopLeftRadius: 30,borderTopRightRadius: 30,padding: 20}}>
                <Text style={{fontSize: 25,color: '#ccc',fontWeight: '800'}}>Login</Text>
                <TextInputCustom placeholder="Email" placeholderTextColor="#ccc" color="#FFF" editable={true} icon={Icons.faUser} onChangeText={text => setEmail(text)}/>
                <TextInputCustom placeholder="Password" placeholderTextColor="#ccc" color="#FFF" editable={true} icon={Icons.faKey} isPassword={true} onChangeText={text => setPassword(text)}/>
                <View style={{flexDirection: 'row-reverse',alignItems: 'center',justifyContent: 'space-between',  marginTop: 20,}}>
                    <TouchableOpacity onPress={() => SendLogin()}>
                        <View style={{backgroundColor: '#3f3f46',borderRadius: 20,paddingHorizontal: 20,paddingVertical: 10,elevation: 5}}>
                            <Text style={{color: '#ccc',fontSize: 15,fontWeight: '500'}}>Sign In</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{flexDirection: 'row',alignItems: 'center'}}>
                        <Switch value={isEnabled} onValueChange={toggleSwitch}/> 
                        <Text style={{fontSize: 14,color: '#ccc',marginLeft: 10}}>Manter Conectado?</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}