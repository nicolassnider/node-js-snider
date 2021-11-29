interface Authentication{
    apiHost?:string;
    login(email:string,password:string):boolean;
}

class AuthenticationClient implements Authentication{

    constructor(parameters) {
        
    }
    apiHost: string;

    login(email:"",password:""):boolean{
        return null;        
    }
}

class AuthenticationClientNoApiHost implements Authentication{

    constructor(parameters) {
        
    }
    
    login(email:"",password:""):boolean{
        return false;        
    }
}