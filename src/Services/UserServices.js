import api from "./Axios";

export const RequestLogin = async (email,password) => {
    await api
        .get(`User/${email}/${password}`)
        .then(function (response) {      
            return (response.data)
        })
        .catch(function (error) {
           return null; 
           console.log(error);
        });
}