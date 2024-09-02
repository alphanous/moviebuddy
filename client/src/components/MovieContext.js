import React,{createContext, useState} from 'react'
export const MovieContext = createContext();
export const MovieProvider = MovieContext.Provider;
export const MovieConsumer = MovieContext.Consumer;