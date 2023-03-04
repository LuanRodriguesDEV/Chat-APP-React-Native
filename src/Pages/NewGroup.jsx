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
import NewUserGroup from "../Components/NewGroup/NewUserGroup";
import { useContext, useEffect, useState } from "react";
import UserGroupList from "../Components/NewGroup/UserGroupList";
import { Image } from "react-native";
import api from "../Services/Axios";
import { UserContext } from "../Context/UserContext";


const users = [{id: 1, name: "Matheus Olé", profile: 'https://cdn.discordapp.com/attachments/1057734919964606526/1080848701209198702/image.png'},{id: 2, name: "Thiago", profile: null},]



export default function NewGroup(){
    const navigate = useNavigation();
    const [participantes,setParticipantes] = useState([]);
    const {user} = useContext(UserContext)
    const [users,setUsers] = useState([]);
    
    const NewParticipante = (id) =>{
        const findParticipante = participantes.find(e => e.id === id);
        if(findParticipante === undefined){
            const findUser = users.find(e => e.id === id);
            const get = [...participantes];
            const constuct = {
                id: findUser.id,
                name: findUser.name,
                profile: findUser.profile
            }
            get.push(constuct);
            setParticipantes(get);
        }else{
            const findUser = participantes.filter(e => e.id !== id);
            setParticipantes(findUser);
        }
    }
    const RequestUsers = async () => {
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
    const RemoveParticipante = (id) =>{
        const findUser = participantes.filter(e => e.id !== id);
        setParticipantes(findUser);
    }
    return(
        <View style={{flex: 1,backgroundColor: '#27272a'}}>
            <View style={{width: '100%',padding: 10,backgroundColor: '#18181b',flexDirection: 'row',alignItems: 'center',elevation: 20,shadowColor: '#5FC4BE'}}>
                <TouchableOpacity onPress={() => navigate.goBack()}>
                    <FontAwesomeIcon color="#ccc" icon={Icons.faArrowLeft} size={25} style={{marginRight: 10}}/> 
                </TouchableOpacity>
                <Text style={{color: '#CCC',fontSize: 15,fontWeight: 'bold',marginLeft: 10,marginVertical: 10}}>Novo Grupo</Text>
            </View>
            <View style={{width: '100%',padding: 10,backgroundColor: '#3f3f46',flexDirection: 'row',alignItems: 'center'}}>
                <TouchableOpacity>
                    <View style={{width: 60,height: 60,backgroundColor: '#aaa',borderRadius: 50,alignItems: 'center',justifyContent: 'center',marginRight: 10}}>
                        <FontAwesomeIcon color="#ccc" icon={Icons.faCamera} size={25}/> 
                    </View>
                </TouchableOpacity>
                <View style={{flex:1,justifyContent: 'center'}}>  
                        <TextInput placeholder="Digite o nome do grupo..." placeholderTextColor="#CCC" colo="#FFF"/>
                        <View style={{backgroundColor: '#5FC4BE',height: 2}}/>
                </View>
            </View>
            <ScrollView>
                <View style={{flex: 1}}>
                {participantes.length > 0 ?
                    <View style={{width: '100%',padding: 10}}>
                        <Text style={{color: '#CCC',fontSize: 15,fontWeight: '500'}}>Participantes</Text>
                        <ScrollView horizontal={true}>
                            <View style={{flex: 1,flexDirection: 'row',alignItems: 'center'}}>
                                {participantes.map(e => <NewUserGroup key={e.id} name={e.name} profile={e.profile} OnPress={() => RemoveParticipante(e.id)}/>)}
                            </View>
                        </ScrollView>
                    </View>
                : null}
                    <Text style={{color: '#CCC',fontSize: 15,fontWeight: '500',marginLeft: 10,marginVertical: 10}}>Seguindo</Text>
                    {
                        users.map(e => <UserGroupList key={e.id} name={e.name} profile={e.profile} OnPress={() => NewParticipante(e.id)} Selected={participantes.find(x => x.id === e.id) ? true : false}/>)
                    }
                </View>
            </ScrollView>
            {participantes.length > 0 ? <View style={{position: 'absolute',bottom: 20,right: 20}}>
                    <TouchableOpacity>
                        <View style={{width: 65,height: 65,borderRadius: 50,backgroundColor: '#5FC4BE',justifyContent: 'center',alignItems: 'center'}}>
                        <FontAwesomeIcon color="#ccc" icon={Icons.faCheck} size={25}/> 
                        </View>
                    </TouchableOpacity>
               </View> : null}
            
        </View>
    )
}