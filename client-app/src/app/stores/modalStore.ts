import { action, observable } from "mobx";
import { RootStore } from "./rootStore";

//store for our modals t
export default class ModalStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  //we want to eother have the modal open or not, so boolean
  //idk what shallow does. makes it so our modal works though
  @observable.shallow modal = {
    open: false,
    body: null,
  };

  //action to open the modal
  @action openModal = (content: any) => {
    this.modal.open = true;
    this.modal.body = content;
  };

  @action closeModal = () => {
    this.modal.open = false;
    this.modal.body = null;
  };
}