import { observable, action } from 'mobx';
import { createContext } from 'react';
import { IFish } from '../models/fish';
import agent from '../api/agent';

class FishStore{
    @observable fishCaught: IFish[] = [];
    //observable for the loading indicator
    @observable loadingInitial = false;

    //get our fish
    @action loadFishCaught = () =>{
        //woudlnt be able to mutate state like this if we were using redux
        this.loadingInitial = true;
        //import our agent.ts file so we can use all our axios requests we made in the FishCaught object
        agent.FishCaught.list()
        .then((fishCaught) => {
            //loop through and reformat date
            //then add the fish to the fishCaught observable array
            fishCaught.forEach(fish => {
                fish.caughtDate = fish.caughtDate.split('.')[0];
                this.fishCaught.push(fish);
            })
        }).finally(() => this.loadingInitial = false);
    }
}

export default createContext(new FishStore())