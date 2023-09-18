
import { singleton, inject } from "tsyringe";
import { makeObservable, action, computed } from "mobx";
import { MessagesRepository } from "./message-repository";

@singleton()
export class MessagesPresenter {

  constructor(
    @inject(MessagesRepository) private messagesRepository: MessagesRepository
  ) {
    makeObservable(this, {
      userMessages: computed,
      networkErrors: computed,
      setNetworkErrors: action,
      setUserMessages: action,
    });
  }

  get networkErrors() {
    return this.messagesRepository.networkErrors;
  }

  get userMessages() {
    return this.messagesRepository.userMessages;
  }

  clearMessages = () => {
    this.messagesRepository.reset();
  };

  setNetworkErrors = (errors: string[]) => {
    this.messagesRepository.networkErrors = errors;
  }

  setUserMessages = (messages: string[]) => {
    this.messagesRepository.userMessages = messages;
  }
}