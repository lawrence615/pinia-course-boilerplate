import { defineStore } from "pinia";

export const useAuth = defineStore("auth", {
    state:()=>{
        return {
            username:'mashLarry'
        }
    },
    actions:{
        visitTwitterProfile(){
            window.open(`https://twitter.com/${this.username}`, '_blank')
        }
    }
});
