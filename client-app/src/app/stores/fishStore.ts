import { observable } from 'mobx';
import { createContext } from 'react';

class FishStore{
    @observable title = 'Hello from mobx'
}

export default createContext(new FishStore())