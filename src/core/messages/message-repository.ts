import { makeObservable, observable,  } from "mobx";
import { singleton } from "tsyringe";

@singleton()
export class MessagesRepository {
  networkErrors: string[] = [];
  userMessages: string[] = [];

  constructor() {
    makeObservable(this, {
      networkErrors: observable,
      userMessages: observable
    });
    this.reset();
  }

  reset = () => {
    this.networkErrors = [];
    this.userMessages = [];
  };
}