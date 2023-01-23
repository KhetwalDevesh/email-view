import { json } from 'react-router-dom';
import {create} from 'zustand';
import {persist,createJSONStorage} from 'zustand/middleware'


export const useEmailStore = create(
    persist(
    (set,get)=>({
    emailListStore:[],
   addEmails: ({emails}) =>
    {
        console.log(emails);
        set({emailListStore:emails })
    },
    markIsReadTrue:({email})=>{
        set(
            get().emailListStore.map((currentEmail)=>{
                if(email.id===currentEmail.id){
                    const newEmail = {
                        date : email.date,
                        from : email.from,
                        id : email.id,
                        short_description : email.short_description,
                        subject : email.subject,
                        is_favorite:email.is_favorite,
                        is_read:true,
                      }
                      return newEmail;
                // console.log(email);
                }
                return currentEmail;
            })
        )
    },
    markIsFavoriteTrue:({email})=>{
        set(
            get().emailListStore.map((currentEmail)=>{
                if(email.id===currentEmail.id){
                    const newEmail = {
                        date : email.date,
                        from : email.from,
                        id : email.id,
                        short_description : email.short_description,
                        subject : email.subject,
                        is_favorite:true,
                        is_read:email.is_read,
                      }
                      return newEmail;
                // console.log(email);
                }
                return currentEmail;
            })
        )
    },
}),{
    name:'email-storage',
    storage: createJSONStorage(() => sessionStorage), 
}))

