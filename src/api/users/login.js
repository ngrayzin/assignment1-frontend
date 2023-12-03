import Settings from "../../settings/settings";
const settings = new Settings();

async function login(data) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data),
    redirect: "follow",
  };
  try {
    const response = await fetch("http://" + settings.userBackend + "/login", requestOptions);
    if (response.ok) {
      const result = await response.json(); 
      return result;
    } else{
      return false;
    }
  } catch (error) {
    console.error('There was an error with the login:', error);
    return { error: true };
  } 
}

export default login;
