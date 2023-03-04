import { createContext, useContext, useEffect, useState } from "react";
import * as signalR from '@microsoft/signalr'
import { UserContext } from "./UserContext";

export const SignalRContext = createContext({});

export default function SignalRProvider({children}){
    const {user,chat,NewMessage} = useContext(UserContext);
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
    const ChangeConnectionID = (data) => {
        connection.invoke("ChangeConnectionID", data);
    }
    return(
        <SignalRContext.Provider value={{ChangeConnectionID}}>
            {children}
        </SignalRContext.Provider>
    )
}