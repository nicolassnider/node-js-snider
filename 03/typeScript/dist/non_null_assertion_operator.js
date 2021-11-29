const checkCredentials = (email, password) => {
    return "Login ok";
};
const login = (data) => {
    const { email, password, loginType } = data;
    switch (loginType) {
        case "password":
            return checkCredentials(email, password);
        case "facebook":
            return "login ok";
        case "google":
            return "login ok";
        default:
            return "invalid login";
    }
};
class User {
    constructor() { }
    static fromJson(data) {
        const user = new User();
        user.name = data.name;
        user.lastName = data.lastName;
        user.age = data.age;
        return user;
    }
}
User.fromJson({ name: "", lastName: "", age: 27 });
