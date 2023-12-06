import Settings from "../../settings/settings";
const settings =  new Settings();

async function getUserProfile(id){
    const requestOptions = {
        method: "DELETE",
        redirect: "follow",
    };
    try {
        const response = await fetch("http://" + settings.userBackend + "/userProfile/" + id, requestOptions);
        
        if (response) {
          console.log(response)
          return response;
        }
      } catch (error) {
        // RETURN ERROR
        console.log(error);
        return { error: true };
      } 
}
export default getUserProfile;