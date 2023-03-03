import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Messages from "../Pages/Messages";
import Reels from "../Pages/Reels";

const Tab = createMaterialTopTabNavigator();

export default function HomeTabs() {
  return (
    <Tab.Navigator screenOptions={{
        tabBarStyle:{backgroundColor: '#18181b'},
        tabBarActiveTintColor: '#5FC4BE',
        tabBarLabelStyle: {textTransform: 'none',fontSize: 16,fontWeight: '500'},
        tabBarIndicatorStyle: {backgroundColor: '#5FC4BE',height: 4}
        
        
        
    }}>
      <Tab.Screen name="Messages" component={Messages} />
      <Tab.Screen name="Reels" component={Reels} />
      <Tab.Screen name="Feed" component={Reels} />
    </Tab.Navigator>
  );
}