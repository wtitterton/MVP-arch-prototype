import { makeObservable, observable,  } from "mobx";
import { singleton } from "tsyringe";


/**
 * 
 * Message may end up looking something like the below. Could then add remove message functionality.
 * {
 *  id: string,
 *  type: 'error' | 'success',
 *  message: string
 * }
 */
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