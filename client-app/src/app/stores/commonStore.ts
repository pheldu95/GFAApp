import { action, observable, reaction } from "mobx";
//will hold stuff that doesn't have to do with users or the fish

import { RootStore } from "./rootStore";

export default class CommonStore{
    rootStore: RootStore;
    constructor(rootStore: RootStore)
    {
        this.rootStore = rootStore;

        //add a reaction. we can do something if something else changes. pretty much what reactions are
        //whenever we set the token, this reaction will run
        reaction(
            //specify what we want to react to. in this case, it's this.token
            () => this.token,
            token => {
                if(token){
                  //save the token in the browsers local storage
                    window.localStorage.setItem("jwt", token);
                }else{
                    window.localStorage.removeItem('jwt');
                }
            }
        )
    }

    //observalbe for the token
    @observable token: string | null = window.localStorage.getItem('jwt');
    @observable appLoaded = false;


    @action setToken = (token: string | null) => {
        this.token = token;
    }

    //when the application initializes, we will make appLoaded true
    @action setAppLoaded = () =>{
        this.appLoaded = true;
    }
}