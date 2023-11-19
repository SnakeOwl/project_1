"use client"
import React from 'react';
import UserContextType from './UserContextType';

const ContextUser = React.createContext<{
    stateUser: UserContextType,
    dispatchUser: React.Dispatch<any>
}>({
    stateUser: {
        token: undefined,
        bkey: undefined
    },

    dispatchUser: ()=>{}
});

export default ContextUser;
