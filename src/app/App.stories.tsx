import React from 'react';
import App from './App';
import {BrowserRouterDecorator, ReduxStoreProviderDecorator} from '../stories/ReduxStoreProviderDecorator';

export default {
    title: 'App Stories ',
    component: App,
    decorators: [ReduxStoreProviderDecorator,BrowserRouterDecorator]
}

export const AppBaseExample = () =>{
    return<App demo={true}/>
}