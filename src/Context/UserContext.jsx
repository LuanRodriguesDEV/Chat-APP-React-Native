import { useNavigation } from "@react-navigation/native";
import { createContext, useState } from "react";
import api from "../Services/Axios";

export const UserContext = createContext({});

export default function UserProvicer({children}){
    const navigate = useNavigation();
    const [chat,setChat] = useState([]);
    const [user,setUser] = useState({})

    const SetLogin = (value) => {
        setUser(value);
        RequestChat(value.id)
        navigate.navigate("Home");
    }
    async function RequestChat(value){
        await api
        .get(`Chat/${value}`)
        .then(function (response) {      
            setChat(response.data)
            console.log(response.data)
           
        })
        .catch(function (error) {
            
           console.log(error);
        });
    }
    const AddNewChat = (value) => {
        console.log(value);
        const getChat = [...chat]
        getChat.push(value);
        setChat(getChat);
        navigate.navigate("PrivateChat",{ParamKey: value.id})
    }
    const NewMessage = (data) => {         
        const indexToUpdate = chat.findIndex(e => e.id === data.chatId)
        let newArray = [...chat];
            newArray[indexToUpdate].messages.push(data)
        setChat(newArray);    
    }

    return(
        <UserContext.Provider value={{chat,user,SetLogin,AddNewChat,NewMessage}}>
            {children}
        </UserContext.Provider>
    )

    
}