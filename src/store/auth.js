import { defineStore } from "pinia";

export const useAuth = defineStore("auth", {
    state:()=>{
        return {
            // username:'wyze'
        }
    },
    getters:{
        username:() => 'wyze2'
    }
});
