import { configure } from 'mobx';
import { createContext } from 'react';
import CommonStore from './commonStore';
//this file will let our stores access thing from other stores
import FishStore from './fishStore'
import ModalStore from './modalStore';
import UserStore from './userStore';

configure({ enforceActions: 'always' });

export class RootStore{
    fishStore: FishStore;
    userStore: UserStore;
    commonStore: CommonStore;
    modalStore: ModalStore;

    constructor(){
        this.fishStore = new FishStore(this);
        this.userStore = new UserStore(this);
        this.commonStore = new CommonStore(this);
        this.modalStore = new ModalStore(this);
    }

}

//in our context, we will now have a fishStore and userStore accessible inside the RootStore
//can add RootStore to our fishStore and userStore
export const RootStoreContext = createContext(new RootStore);