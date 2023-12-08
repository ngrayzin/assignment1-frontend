import Settings from "../../settings/settings";
const settings =  new Settings();

async function publishTrip(data){
    const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
        redirect: "follow",
    };
    try {
        const response = await fetch("http://" + settings.tripsBackend + "/publishTrip", requestOptions);
        return response;
      } catch (error) {
        // RETURN ERROR
        console.log(error);
        return { error: true };
      } 
}
export default publishTrip;