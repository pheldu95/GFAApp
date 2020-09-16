import { computed, observable, action, runInAction } from "mobx";
import { history } from "../..";
import agent from "../api/agent";
import { IUser, IUserFormValues } from "../models/user";
import { RootStore } from "./rootStore";

export default class UserStore{

    //make the rootStore accessible from within the userStore
    //now we have all the properties and methods from fishStore accessible in userStore
    //in case we need them
    rootStore: RootStore;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
    }
    
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
            runInAction(() => {
                this.user = user;
            })
            //save the token in the browser. using our commonStore
            this.rootStore.commonStore.setToken(user.token);
            history.push('/fishCaught')
            
        }catch(error){
            throw error;
            
        }
    }

    @action getUser = async () => {
        try{
            //current gets our current user, based on the token
            const user = await agent.User.current();
            runInAction(() => {
                this.user = user;
            })
        }catch (error) {
            console.log(error);
            
        }
    }

    //when the user logs out, all we have to do is set the token to null
    @action logout = () => {
        this.rootStore.commonStore.setToken(null);
        this.user = null;
        //send them back to the home page
        history.push('/');
    }
}