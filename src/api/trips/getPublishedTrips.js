import Settings from "../../settings/settings";
const settings =  new Settings();

async function getPublishedTrips(id){
    const requestOptions = {
        method: "GET",
        redirect: "follow",
    };
    try {
        const response = await fetch("http://" + settings.tripsBackend + "/publishTrip/" + id, requestOptions);
        
        if (response.ok) {
            const result = await response.json(); 
            return result;
          } else{
            return false;
          }
      } catch (error) {
        // RETURN ERROR
        console.log(error);
        return { error: true };
      } 
}
export default getPublishedTrips;