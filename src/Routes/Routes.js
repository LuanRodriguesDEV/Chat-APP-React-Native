import { createStackNavigator } from "@react-navigation/stack"
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import NewGroup from "../Pages/NewGroup";
import NewMessage from "../Pages/NewMessage";
import PrivateChat from "../Pages/PrivateChat";


const Tab = createStackNavigator();



export default function Routes () {
    return(
        <Tab.Navigator screenOptions={{headerShown: false}}>
            <Tab.Screen name="Login" component={Login}/>
            <Tab.Screen name="Home" component={Home}/>
            <Tab.Screen name="NewMessage" component={NewMessage}/>
            <Tab.Screen name="NewGroup" component={NewGroup}/>
            <Tab.Screen name="PrivateChat" component={PrivateChat}/>
           
        </Tab.Navigator>    
    )
}