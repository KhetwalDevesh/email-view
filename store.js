import { json } from 'react-router-dom';
import {create} from 'zustand';
import {persist} from 'zustand/middleware'


export const useEmailStore = create(
    persist(
    (set,get)=>({
    emailListStore:[],
    addEmailToStore:({newEmail})=>{
        const emailsInStore = get().emailListStore;
        // console.log(JSON.stringify(emailsInStore,null,2));
        // console.log(JSON.stringify(newEmail,null,2));
        const updatedEmailList = [...emailsInStore,newEmail];
        set({
            emailListStore:updatedEmailList
        })
    }
}),{
    name:'email-storage'
}))

