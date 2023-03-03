import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { View } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons';
import { TextInput } from "react-native";
import { ScrollView } from "react-native";
import NewType from "../Components/NewMessage/NewType";
import { Text } from "react-native";
import UserList from "../Components/NewMessage/UserList";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";
import api from "../Services/Axios";




export default function NewMessage(){
    const navigate = useNavigation();
    const {chat,user,AddNewChat} = useContext(UserContext);
    const [users,setUsers] = useState([]);

    const CreateNewChat = (value) => {
        const find = chat.find(e => e.userId === value);
        if(find !== undefined){
            navigate.navigate("PrivateChat",{ParamKey: find.id})
        }else{
            const Chat = {
                typeChat: 1,
                chatPeoples:[
                    {userId: value},
                    {userId: user.id}
                ] 
            }
            PostNewChat(Chat)

            //TooDoo Requisição back end
        }
    }
    async function PostNewChat(value){
        await api
        .post(`Chat/${user.id}`,value)
        .then(function (response) {
            AddNewChat(response.data);
        })
        .catch(function (error) {
           console.log(error);
        });
    }
    async function RequestUsers(){
        await api
        .get(`User`)
        .then(function (response) {
            
            const filter = response.data.filter(e => e.id !== user.id);      
            setUsers(filter)
           
        })
        .catch(function (error) {
            
           console.log(error);
        });
    }
    useEffect(() =>{
        RequestUsers();
    },[])
    return(
        <View style={{flex: 1,backgroundColor: '#27272a'}}>
            <View style={{width: '100%',padding: 20,backgroundColor: '#18181b',flexDirection: 'row',alignItems: 'center',elevation: 20}}>
                <TouchableOpacity onPress={() => navigate.goBack()}>
                    <FontAwesomeIcon color="#ccc" icon={Icons.faArrowLeft} size={25} style={{marginRight: 10}}/> 
                </TouchableOpacity>
                <View style={{flex: 1}}>
                    <TextInput placeholder="Digite O Nome" placeholderTextColor="#ccc" color="#FFF" style={{fontSize: 16}}/>
                </View>   
            </View>
            <ScrollView>
                <View style={{flex: 1}}>
                    <NewType OnPress={() => navigate.navigate("NewGroup")}/>
                    <Text style={{color: '#CCC',fontSize: 15,fontWeight: '500',marginLeft: 10,marginVertical: 10}}>Seguindo</Text>
                    {
                        users.map(e => <UserList key={e.id} name={e.name} profile={e.profile} OnPress={() => CreateNewChat(e.id)}/>)
                    }
                </View>
            </ScrollView>
        </View>
    )
}