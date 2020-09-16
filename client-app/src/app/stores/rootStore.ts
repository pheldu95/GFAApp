import { configure } from 'mobx';
import { createContext } from 'react';
//this file will let our stores access thing from other stores
import FishStore from './fishStore'
import UserStore from './userStore';

configure({ enforceActions: 'always' });

export class RootStore{
    fishStore: FishStore;
    userStore: UserStore;

    constructor(){
        this.fishStore = new FishStore(this);
        this.userStore = new UserStore(this);
    }

}

//in our context, we will now have a fishStore and userStore accessible inside the RootStore
//can add RootStore to our fishStore and userStore
export const RootStoreContext = createContext(new RootStore);