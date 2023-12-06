import Settings from "../../settings/settings";
const settings =  new Settings();

async function updateUserProfile(data, id){
    const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
        redirect: "follow",
    };
    try {
        const response = await fetch("http://" + settings.userBackend + "/userProfile/" + id, requestOptions);
        const result = response;
        console.log(result);
        
        if (result.ok) {
          return result;
        }
      } catch (error) {
        // RETURN ERROR
        console.log(error);
        return { error: true };
      } 
}
export default updateUserProfile;