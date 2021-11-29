const checkCredentials = (email:string, password:string):string =>{
    return "Login ok";
}

const login = (data: {
  email: string;
  password: string|null;
  loginType: string;
}): string => {
  const { email, password, loginType } = data;

  switch (loginType) {
    case "password":
      return checkCredentials(email, password!);
    case "facebook":
      return "login ok";
    case "google":
      return "login ok";
    default:
      return "invalid login";
  }
};

class User{
    name!: string;
    lastName!:string;
    age!:number;

    private constructor(){}

    static fromJson(data:{name:string,lastName:string,age:number}):User{
        const user = new User();
        user.name = data.name;
        user.lastName = data.lastName;
        user.age = data.age;
        return user;
    }
}

User.fromJson({name:"",lastName:"", age:27 })
