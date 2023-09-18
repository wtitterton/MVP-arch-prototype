import 'reflect-metadata'
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {MobxRouter, RouterStore, startRouter} from 'mobx-router';
import { routes } from './config';
import { Navigation } from './components';
import { StoreProvider } from './core';

export class AppStore {
    title = 'Products';
    user = null
}

export class RootStore {
    public router: RouterStore<RootStore>;
    public app: AppStore;

    constructor() {
        this.router = new RouterStore<RootStore>(this);
        this.app = new AppStore();
    }
}

const store = new RootStore();

startRouter(routes, store);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <StoreProvider value={store}>
      <Navigation />
      <MobxRouter store={store}/>
    </StoreProvider>
  </React.StrictMode>,
)
