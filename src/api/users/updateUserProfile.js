import Settings from "../../../settings/settings";
const settings =  new Settings();

async function updateUserProfile(data, id){
    const requestOptions = {
        method: "PUT",
        headers: "Content-Type",
        body: JSON.stringify(data),
        redirect: "follow",
    };
    try {
        const response = await fetch("http://" + settings.userBackend + "/signup/" + id, requestOptions);
        const result = response;
        
        if (result.ok) {
          console.log(result)
          return result;
        }
      } catch (error) {
        // RETURN ERROR
        console.log(error);
        return { error: true };
      } 
}
export default updateUserProfile;