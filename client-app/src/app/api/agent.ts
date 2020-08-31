//this file is where we will define all api calls
import axios, { AxiosResponse } from 'axios';
import { IFish } from '../models/fish';
import { history } from '../..';
import { toast } from 'react-toastify';

//every request will use this base url
axios.defaults.baseURL = "http://localhost:5000/api";

//an interceptor to intercept errors coming back from the server
axios.interceptors.response.use(undefined, error=>{
  //destructure our error so we don't have to type out error.response.whatever
  const {status, data, config} = error.response;
  //check if it's a not found error
  if(status === 404){
    history.push('/notfound');
  }
  //if all of these conditions are true, that probably means the user sent a get request with an id that isn't a guid
  //a get request like that will return a 400, not a 404, so we need to catch these errors too and also send them to the not found page
  if(status === 400 && config.method === 'get' && data.errors.hasOwnProperty('id')){
    history.push('/notfound');
  }
  if(status === 500) {
    //send a toast to the user
    toast.error('Server error - check the terminal for more info');
  }
})

//store our requests in this constant
const responseBody = (response: AxiosResponse) => response.data;

//add some delay to our app
//because our api calls wouldnt normally be instant like they are
//when app is all running on your own computer
const sleep = (ms: number) => (response: AxiosResponse) =>
  new Promise<AxiosResponse>(resolve => setTimeout(() => resolve(response), ms))

//some reusable requests we will be using, stored in an object
const requests = {
    get: (url:string) => axios.get(url).then(sleep(1000)).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(sleep(1000)).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(sleep(1000)).then(responseBody),
    del: (url: string) => axios.delete(url).then(sleep(1000)).then(responseBody)
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