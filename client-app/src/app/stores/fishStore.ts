import { observable, action, computed, configure, runInAction } from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import { IFish } from '../models/fish';
import agent from '../api/agent';


configure({enforceActions: 'always'});
class FishStore{
    //will store our fish in an observable map. this way it will also update when we delete a fish
    @observable fishRegistry = new Map();
    @observable fishCaught: IFish[] = [];
    //selectedFish can be IFish or undefined
    @observable selectedFish: IFish | undefined;
    //observable for the loading indicator
    @observable loadingInitial = false;
    @observable editMode = false;
    @observable submitting = true;
    //taget button for our loading indicator
    @observable target = '';

    //use computed propety on data that we already have in our store
    @computed get fishCaughtByDate(){
        //we have to turn our registry into an array using Array.from(this.fishRegistry.values())
        //once its an array, we can sort it by date
        //this will sort our fish by date caught in ascending date order
        return Array.from(this.fishRegistry.values()).sort((a, b) => Date.parse(a.caughtDate) - Date.parse(b.caughtDate));
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
            })
            
        }catch( error){
            runInAction('load fish caught error', () =>{
                this.loadingInitial = false;
            })
            console.log(error);
        }
    }

    @action createFish = async (fish: IFish) => {
        this.submitting = true;
        try {
            await agent.FishCaught.create(fish);
            runInAction('creating activity', () => {
                this.fishRegistry.set(fish.id, fish);
                this.editMode = false;
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
                this.selectedFish = fish;
                this.editMode = false;
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

    @action openCreateForm = () => {
        this.editMode = true;
        this.selectedFish = undefined;
    }

    @action openEditForm = (id: string) =>{
        this.selectedFish = this.fishRegistry.get(id);
        this.editMode = true;
    }

    //a method for the cancel button. so we can cancel the fish select
    @action cancelSelectedFish = () => {
        this.selectedFish = undefined;
    }

    //method for the cancel button on the form. will cancel the create fish or edit fish
    //so we can close the form
    @action cancelFormOpen = () =>{
        this.editMode = false;
    }

    @action selectFish = (id: string) =>{
        //use the key to get the fish. in the fishRegistry, the keys are all ids
        this.selectedFish = this.fishRegistry.get(id);
        this.editMode = false;
    }
}

export default createContext(new FishStore())