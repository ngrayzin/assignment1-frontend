class Settings {
    constructor() {}

    userBackend = "localhost:5000/api/v1";

    tripsBackend = "localhost:5001/api/v1";

    user = sessionStorage.getItem("user");
}

export default Settings;