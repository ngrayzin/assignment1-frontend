import Settings from "../../settings/settings";
const settings =  new Settings();

async function updateUserProfile(data, id, userID){
    const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
        redirect: "follow",
    };
    try {
        const response = await fetch("http://" + settings.tripsBackend + "/trips/" + id + "/" + userID, requestOptions);
        return response;
      } catch (error) {
        // RETURN ERROR
        console.log(error);
        return { error: true };
      } 
}
export default updateUserProfile;