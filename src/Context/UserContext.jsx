import { useNavigation } from "@react-navigation/native";
import { createContext, useEffect, useState } from "react";
import api from "../Services/Axios";
import * as signalR from '@microsoft/signalr'


export const UserContext = createContext({});

export default function UserProvicer({children}){
    const navigate = useNavigation();
    const [chat,setChat] = useState([]);
    const [user,setUser] = useState({})
    const [connection,setConnection] = useState(null)

    useEffect(() =>{
        const  newConnection = new signalR.HubConnectionBuilder()
        .withUrl("http://192.168.18.99:5295/Chathub", {
            skipNegotiation: true,
            transport: signalR.HttpTransportType.WebSockets
          })
          .withAutomaticReconnect()
          .withHubProtocol(new signalR.JsonHubProtocol())
          .configureLogging(signalR.LogLevel.Information)
          .build();
        newConnection.on("receivemessage", (data) => {
            const dataJson = JSON.stringify(data);
            console.log(chat)
            NewMessage(dataJson)
        });
        newConnection.start().then(() => {
            setConnection(newConnection);
          });
    }, []);

    const ChangeConnectionID = (id) => {
        connection.invoke("ChangeConnectionID", id);
    }

    const SetLogin = (value) => {
        setUser(value);
        RequestChat(value.id)
        ChangeConnectionID(value.id)
        navigate.navigate("Home");
    }
    const RequestChat = async (value) => {
        await api
        .get(`Chat/${value}`)
        .then(function (response) {      
            setChat(response.data)
        })
        .catch(function (error) {      
           console.log(error);
        });
    }
    const AddNewChat = (value) => {
        const getChat = [...chat]
        getChat.push(value);
        setChat(getChat);
        navigate.navigate("PrivateChat",{ParamKey: value.id})
    }
    const NewMessage  = (data) => {
        const indexToUpdate = chat.findIndex(e => e.id === data.chatId)
        console.log(indexToUpdate)
        if(indexToUpdate !== -1){
        let newArray = [...chat];
            newArray[indexToUpdate].messages.push(data)
        setChat(newArray);    
        }
    }
    return(
        <UserContext.Provider value={{chat,user,SetLogin,AddNewChat,NewMessage}}>
            {children}
        </UserContext.Provider>
    )

    
}