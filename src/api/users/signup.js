import Settings from "../../../settings/settings";
const settings =  new Settings();

async function signup(data){
    const requestOptions = {
        method: "POST",
        headers: "Content-Type",
        body: JSON.stringify(data),
        redirect: "follow",
    };
    try {
        const response = await fetch("http://" + settings.userBackend + "/signup", requestOptions);
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
export default signup;