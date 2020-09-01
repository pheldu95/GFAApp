//interface is not a class, it is used solely for type checking
export interface IFish{
    id: string;
    fisherId: number;
    guideId: number;
    organizationId: number;
    fishTypeId: number;
    length: number;
    weight: number;
    exceptionalCatch: boolean;
    unusualCatch: boolean;
    latitude: number;
    longitude: number;
    skyTypeId: number;
    windTypeId: number;
    waterTypeId: number;
    moonPhase: string;
    moonIlluminationPercent: number;
    airTemperature: number;
    waterTemperature: number;
    caughtDate: Date;
    lastModifiedDate: Date;
}

//new interface specifically for our form properties
//adding Parital makes it so all the fields/properties are optional
export interface IFishFormValues extends Partial<IFish> {
    caughtTime?: Date;
}

//a class that we can use for the starting values for the fish form
//so when we create a new instance of the FishFormValues class, it will be initialized with these values
export class FishFormValues implements IFishFormValues {
    //the ? means optional
    id?: string = undefined;
    fisherId?: number = 0;
    guideId?: number = 0;
    organizationId?: number = 0;
    fishTypeId?: number = 0;
    length?: number = 0;
    weight?: number = 0;
    exceptionalCatch?: boolean = false;
    unusualCatch?: boolean = false;
    latitude?: number = 0;
    longitude?: number = 0;
    skyTypeId?: number = 0;
    windTypeId?: number = 0;
    waterTypeId?: number = 0;
    moonPhase?: string = '';
    moonIlluminationPercent?: number = 0;
    airTemperature?: number = 0;
    waterTemperature?: number = 0;
    caughtDate?: Date = undefined;
    caughtTime?: Date = undefined;
    lastModifiedDate?: Date = undefined;

    //constructor to make an instance of the class
    constructor(init?: IFishFormValues){
        //if we have init and init.caughtDate, then we split the caughtDate into date and time
        //so those can be displayed in their seperate inputs
        if(init && init.caughtDate){
            init.caughtTime = init.caughtDate
        }
        //here we assign the values from init into our FIshFormValues class
        Object.assign(this, init);
    }
}