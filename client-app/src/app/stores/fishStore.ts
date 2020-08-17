import { observable, action, computed } from 'mobx';
import { createContext } from 'react';
import { IFish } from '../models/fish';
import agent from '../api/agent';

class FishStore{
    @observable fishCaught: IFish[] = [];
    //selectedFish can be IFish or undefined
    @observable selectedFish: IFish | undefined;
    //observable for the loading indicator
    @observable loadingInitial = false;
    @observable editMode = false;
    @observable submitting = true;

    //use computed propety on data that we already have in our store
    @computed get fishCaughtByDate(){
        //this will sort our fish by date caught in ascending date order
        return this.fishCaught.sort((a, b) => Date.parse(a.caughtDate) - Date.parse(b.caughtDate))
    }

    //get our fish
    @action loadFishCaught = async () =>{
        //woudlnt be able to mutate state like this if we were using redux
        this.loadingInitial = true;
        try{
            const fishCaught = await agent.FishCaught.list();//import our agent.ts file so we can use all our axios requests we made in the FishCaught object
            //loop through and reformat date
            //then add the fish to the fishCaught observable array
            fishCaught.forEach(fish => {
                fish.caughtDate = fish.caughtDate.split('.')[0];
                this.fishCaught.push(fish);
            });
            this.loadingInitial = false;
        }catch( error){
            console.log(error);
            this.loadingInitial=false;
        }
    }

    @action createFish = async (fish: IFish) => {
        this.submitting = true;
        try {
            await agent.FishCaught.create(fish);
            this.fishCaught.push(fish);
            this.editMode = false;
            this.submitting = false;
        } catch (error) {
            this.submitting = false;
            console.log(error);
        }
    }

    @action openCreateForm = () => {
        this.editMode = true;
        this.selectedFish = undefined;
    }

    @action selectFish = (id: string) =>{
        this.selectedFish = this.fishCaught.find(f => f.id === id);
        this.editMode = false;
    }
}

export default createContext(new FishStore())