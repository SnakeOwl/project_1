"use client"
import React from 'react';
import UserContextType from './UserContextType';

const ContextUser = React.createContext<{
    stateUser: UserContextType,
    dispatchUser: React.Dispatch<any>
}>({

    //todo: рассмотреть варианты хранения токенов в серверном хранилище. По факту в магазине у вас просто спиздят корзину, но в соц сети может быть ещё тот гемор.
    // сделать это можно с помощью внешних либ (пример:
    // https://articles.wesionary.team/securing-sensitive-data-in-a-next-js-application-d7d5cce67f23
    stateUser: {
        token: undefined, 
        bkey: undefined, // basket key
        user: undefined
    },

    dispatchUser: ()=>{}
});

export default ContextUser;
