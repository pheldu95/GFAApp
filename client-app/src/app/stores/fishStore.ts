import { observable, action, computed, configure, runInAction } from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import { IFish } from '../models/fish';
import agent from '../api/agent';


configure({enforceActions: 'always'});
class FishStore{
    //will store our fish in an observable map. this way it will also update when we delete a fish
    @observable fishRegistry = new Map();
    //fish can be IFish or null
    @observable fish: IFish | null = null;
    //observable for the loading indicator
    @observable loadingInitial = false;
    @observable submitting = false;
    //taget button for our loading indicator
    @observable target = '';

    //use computed propety on data that we already have in our store
    @computed get fishCaughtByDate(){
        //we have to turn our registry into an array using Array.from(this.fishRegistry.values())
        //once its an array, we can sort it by date
        //this will sort our fish by date caught in ascending date order
        return this.groupFishCaughtByDate(Array.from(this.fishRegistry.values()))
    }

    groupFishCaughtByDate(fishCaught: IFish[]){
        const sortedFishCaught = fishCaught.sort(
            (a, b) => Date.parse(a.caughtDate) - Date.parse(b.caughtDate) 
        )
        //for each fish, it gives us a new array where the first item is the key and the second item is the fish
        //reduce method will run another 'callback function' on each element in the array of arrays
        return Object.entries(sortedFishCaught.reduce((fishCaught, fish)=>{
            const date = fish.caughtDate.split('T')[0]; //split the date so we just have the date, not the time
            //if the date is the same, then we use the spread operator to group the fish
            fishCaught[date] = fishCaught[date] ? [...fishCaught[date], fish] : [fish];
            return fishCaught;
            //must type the object. the key will be a string, the value will be IFish array
        }, {} as {[key: string]: IFish[]}));
    }

    //get our fish
    @action loadFishCaught = async () =>{
        //woudlnt be able to mutate state like this if we were using redux
        this.loadingInitial = true;
        try{
            const fishCaught = await agent.FishCaught.list();//import our agent.ts file so we can use all our axios requests we made in the FishCaught object
            //every state modification has to be in an action, since we enabled strict mode
            //so we use runInAction
            //and we can give it a name: 'loading fish caught'. to help when we use mobx dev tools
            runInAction('loading fish caught', () =>{
                //loop through and reformat date
                //then add the fish to the fishCaught observable array
                fishCaught.forEach(fish => {
                    fish.caughtDate = fish.caughtDate.split('.')[0];
                    //the fishRegistry needs a key and a value, so we pass it the id of the fish and the fish itself
                    this.fishRegistry.set(fish.id, fish);
                });
                this.loadingInitial = false;
            });
            console.log(this.groupFishCaughtByDate(fishCaught));
            
        }catch( error){
            runInAction('load fish caught error', () =>{
                this.loadingInitial = false;
            })
            console.log(error);
        }
    }

    //method for when the user clicks on view button, or refreshes the details page, or navigates directly to the page
    @action loadFish = async (id: string) => {
        let fish = this.getFish(id);
        //if there is a fish in the registry, then that becomes the selected fish
        if(fish){
            this.fish = fish;
        //if there isn't a fish in the registry, then we have to go get it
        }else{
            this.loadingInitial = true;
            try {
                fish = await agent.FishCaught.details(id);
                runInAction('getting individual fish', () => {
                    this.fish = fish;
                    this.loadingInitial = false;
                })
            } catch (error) {
                runInAction('get fish error', () => {
                    this.loadingInitial = false;
                })
                console.log(error);
            }
        }
    }

    //make fish null when we press create fish button so the form is empty 
    @action clearFish(){
        this.fish = null;
    }

    getFish = (id: string) => {
        return this.fishRegistry.get(id);
    }

    @action createFish = async (fish: IFish) => {
        this.submitting = true;
        try {
            await agent.FishCaught.create(fish);
            runInAction('creating activity', () => {
                this.fishRegistry.set(fish.id, fish);
                this.submitting = false;
            })
           
        } catch (error) {
            runInAction('create activity error', () => {
                this.submitting = false;
            })
            console.log(error);
        }
    }

    @action editFish = async (fish: IFish) => {
        this.submitting = true;
        try {
            await agent.FishCaught.update(fish);
            runInAction('editing fish', () => {
                this.fishRegistry.set(fish.id, fish);
                this.fish = fish;
                this.submitting = false;
            })
        } catch (error) {
            runInAction('error editing fish', () => {
                this.submitting = false;
            })
            console.log(error);
        }
    }

    //we will receive the event that has the unique name of the button pressed
    //that way we can toggle the loading icon just for that button
    @action deleteFish = async (id: string, event: SyntheticEvent<HTMLButtonElement>) => {
        this.submitting = true;
        this.target = event.currentTarget.name;
        try {
            await agent.FishCaught.delete(id);
            runInAction('deleting fish', () => {
                //use the delete method for mapped observable
                this.fishRegistry.delete(id);
                this.submitting = false;
                //back to empty string. so the loading indicator isn't on a button anymore
                this.target = '';
            })
            
        } catch (error) {
            runInAction('error deleting fish', () => {
                this.submitting = false;
                //back to empty string. so the loading indicator isn't on a button anymore
                this.target = '';
            })
            console.log(error);
            
        }
    }

   
}

export default createContext(new FishStore())