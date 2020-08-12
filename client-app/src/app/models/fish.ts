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
    caughtDate: string;
    lastModifiedDate: string;
}