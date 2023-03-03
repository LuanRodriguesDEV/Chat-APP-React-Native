import { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { UserContext } from "../Context/UserContext";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons';
import * as IconsRegular from '@fortawesome/free-regular-svg-icons';
import { TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native";
import { AvatarNull } from "../Global";
import { TextInput } from "react-native";
import groupBy from "lodash.groupby";
import {format} from 'date-fns'
import { ptBR } from "date-fns/locale";
import { SectionList } from "react-native";
import PrivateMessageItem from "../Components/PrivateChat/PrivateMessageItem";
import api from "../Services/Axios";

export default function PrivateChat({route}){
    const [listMsg,setListMsg] = useState([]);
    const navigate = useNavigation();
    const {chat,user,NewMessage} = useContext(UserContext);
    const params = route.params.ParamKey;
    const chatInfo = chat.find(e => e.id === params);
    console.log(`${chatInfo} + ${params}`)

    const [msg,setMsg] = useState("");

    useEffect(()=> {
        const privateChat = chat.find(item => item.id === params);
        const groupedList = Object.values(
            groupBy(privateChat.messages.reverse(),function (n){
                return n.createdAt.substr(0,10);
            }),
        );
        var data = [];
        groupedList.map(d => {
            let section = {
                title: format(new Date(d[0].createdAt),'PPP',{locale: ptBR}),
                data: [...d],
            };
            data.push(section);
        })
        setListMsg(data);
        
    },[chat])
    
    async function SendMessage(){
        console.log("Chegou")
        setMsg("");
        const newMessages = {
            userId: user.id,
            chatId: params,
            status: 0,
            message: msg
        }
        await api
        .post(`Messages`,newMessages)
        .then(function (response) {
            NewMessage(response.data)
        })
        .catch(function (error) {
            console.log(error);
        });
        
    }

    return(
        <View style={{flex: 1,backgroundColor: '#27272a'}}>
            <View style={{width: '100%',padding: 10,backgroundColor: '#18181b',flexDirection: 'row',alignItems: 'center',elevation: 20}}>
                <TouchableOpacity onPress={() => navigate.goBack()}>
                    <FontAwesomeIcon color="#ccc" icon={Icons.faArrowLeft} size={25} style={{marginRight: 10}}/> 
                </TouchableOpacity>
                <View style={{flex: 1}}>
                    <TouchableOpacity>
                        <View style={{flexDirection: 'row',alignItems: 'center'}}>
                            <View style={{width: 45,height: 45, justifyContent: 'center',alignItems: 'center',marginRight: 10,backgroundColor: chatInfo.online ? '#5FC4BE': 'transparent',borderRadius: 50}}>
                                <Image style={{width: 40,height:40,borderRadius: 50}} source={{uri: chatInfo.profile !== null ? chatInfo.profile : AvatarNull}}/>
                            </View>
                            <Text style={{fontSize: 18,color: '#FFF',fontWeight: '500'}}>{chatInfo.name}</Text>
                        </View>
                        
                    </TouchableOpacity>
                    
                </View>
            </View>
            <View style={{flex: 1}}>
                <SectionList
                    sections={listMsg}
                    keyExtractor={item => String(item.id)}
                    stickySectionHeadersEnabled={true}
                    inverted
                    renderItem={({item}) => <PrivateMessageItem Item={item} Id={user.id}/>}
                    renderSectionFooter = {({section: {title}}) => (
                        <View style={{alignSelf: 'center',backgroundColor: '#fff',marginTop: 12,paddingVertical: 3,paddingHorizontal: 12,borderRadius:5,elevation: 20}}>
                            <Text style={{color: '#3d414c',textAlign: 'center',fontSize: 13}}>{title}</Text>
                        </View>
                    
                    )}
                />
            </View>
            <View style={{width: '100%',padding: 10,flexDirection: 'row',alignItems: 'center'}}>
                <View style={{flex: 1,backgroundColor: '#18181b',flexDirection: 'row',alignItems: 'center',padding: 10,borderRadius: 50}}>
                    <View style={{flex: 1}}>
                        <TextInput value={msg} placeholder="Mensagem" placeholderTextColor="#AAA" onChangeText={text => setMsg(text)}/>
                    </View>
                    {/* <TouchableOpacity >
                        <FontAwesomeIcon color="#ccc" icon={Icons.faFileImage} size={25} style={{marginLeft: 10}}/> 
                    </TouchableOpacity> */}
                </View>
                <TouchableOpacity onPress={() => SendMessage()}>
                    <View style={{width: 45,height: 45,borderRadius: 50,backgroundColor: '#5FC4BE',marginLeft: 10,alignItems: 'center',justifyContent: 'center'}}>
                        <FontAwesomeIcon color="#ccc" icon={IconsRegular.faPaperPlane} size={25} /> 
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}