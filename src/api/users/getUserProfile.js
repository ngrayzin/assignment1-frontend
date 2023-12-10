import Settings from "../../settings/settings";
const settings =  new Settings();

async function getUserProfile(id){
    const requestOptions = {
        method: "GET",
        redirect: "follow",
    };
    try {
        const response = await fetch("http://" + settings.userBackend + "/userProfile/" + id, requestOptions);
        const result = await response.json();
        
        if (result) {
          return result;
        }
      } catch (error) {
        // RETURN ERROR
        console.log(error);
        return { error: true };
      } 
}
export default getUserProfile;