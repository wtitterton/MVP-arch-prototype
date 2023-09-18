import { observer } from "mobx-react";
import { MessagesPresenter } from "./messages-presenter";
import { container } from "tsyringe";


// make messages disappear after 5 seconds or click on them to cancel
export const Messages = observer(() => {
  const messagesPresenter = container.resolve(MessagesPresenter);
  return (
    <>
      {messagesPresenter.networkErrors &&
        messagesPresenter.networkErrors.map((item: string, i: number) => {
          return (
            <div style={{background: 'red'}} key={i}>
              {" - "}
              {item}
            </div>
          );
        })}

         {messagesPresenter.userMessages &&
        messagesPresenter.userMessages.map((item: string, i: number) => {
          return (
            <div style={{background: 'green'}} key={i}>
              {" - "}
              {item}
            </div>
          );
        })}
    </>
  );
});