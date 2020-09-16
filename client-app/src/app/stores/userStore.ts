import { computed, observable, action } from "mobx";
import agent from "../api/agent";
import { IUser, IUserFormValues } from "../models/user";

export default class UserStore{
    //observable to store our user. default is null
    @observable user: IUser | null = null;

    //see if there is a user stored
    @computed get isLoggedIn() {return !!this.user}

    //action for logging in our user
    @action login = async (values: IUserFormValues) =>{
        try{
            //get the user from loging in 
            const user = await agent.User.login(values);
            //assigne the user to our user observable
            this.user = user;
        }catch(error){
            console.log(error);
            
        }
    }
}