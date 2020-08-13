//this file is where we will define all api calls
import axios, { AxiosResponse } from 'axios';
import { IFish } from '../models/fish';

//every request will use this base url
axios.defaults.baseURL = "http://localhost:5000/api";

//store our requests in this constant
const responseBody = (response: AxiosResponse) => response.data;

//some reusable requests we will be using, stored in an object
const requests = {
    get: (url:string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    del: (url: string) => axios.delete(url).then(responseBody)
}

//store all the ways we will use our requests for the fishcaught table in here
const FishCaught = {
  //we will be returning a promise of IFish array
  list: (): Promise<IFish[]> => requests.get("/fishCaught"),
  details: (id: string) => requests.get(`/fishCaught/${id}`),
  create: (fish: IFish) => requests.post("/fishCaught", fish),
  update: (fish: IFish) => requests.put(`/fishCaught/${fish.id}`, fish),
  delete: (id: string) => requests.del(`/fishCaught/${id}`),
};

//export our FishCaught object so we can use the requests in our components
export default {
    FishCaught
}