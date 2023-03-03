import { useEffect, useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import * as Icons from '@fortawesome/free-regular-svg-icons';

export default function TextInputCustom({placeholder,placeholderTextColor,color,value,onChangeText,editable,icon,isPassword}){
    const [focus,setFocus] = useState(false);
    const [shownPassword,setShownPassword] = useState(false);
    
    const colorShadow = focus ? "#5FC4BE" : "#18181b"
    const backgroundColor = focus ? "#18181b" : "#3f3f46"
    const iconColor = focus ? "#5FC4BE" : "#ccc"
    useEffect(() => {
        if(isPassword){
            setShownPassword(false);
        }
    },[])
    function OnFocus(){
        setFocus(true)
    }
    function OnBlur(){
        setFocus(false)
    }
    function PasswordPress(){
        setShownPassword(!shownPassword)
    }
    return(
        <View style={{flexDirection: 'row',alignItems: 'center', backgroundColor: backgroundColor,padding: 10,borderRadius: 20,elevation: 15,shadowColor: colorShadow,marginTop: 20}}>
            
            <FontAwesomeIcon color={iconColor} icon={icon} size={17} style={{marginRight: 10}}/>
            <View style={{flex: 1}}>
                <TextInput secureTextEntry={shownPassword} editable={editable} value={value} onChangeText={onChangeText} onFocus={() => OnFocus()} onBlur={() => OnBlur()} placeholder={placeholder} placeholderTextColor={placeholderTextColor} color={color}/>
            </View>
            {isPassword ? <TouchableOpacity onPress={() => PasswordPress()}>
                {!shownPassword ? <FontAwesomeIcon color={iconColor} icon={Icons.faEyeSlash} size={17} style={{marginLeft: 10}}/> : <FontAwesomeIcon color={iconColor} icon={Icons.faEye} size={20} style={{marginLeft: 10}}/>}
                
            </TouchableOpacity> : null}
            
        </View>
    )
}