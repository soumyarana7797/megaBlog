import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client= new Client()
    account;
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.account);
    }

    async createAccount({
        email,
        password,
        name
    }){
        try {
            const userAccount = await this.account.create(ID.unique(),email,password,name)
            if(userAccount) {
                //Call another method
                // return userAccount;
                this.login(email,password)
            } else {
                return userAccount
            }
        }catch(e) {
            throw e
        }
    }
    async login({email,password}) {
        try {
            const userLogin = await this.account.createEmailSession(email,password)
            return userLogin
        } catch(error) {
            throw error
        }
    }
    async getCurrentUser() {
        try {
            return await this.account.get()
        } catch(e) {
            console.log("getUser: ", e)
        }
        return null
    }
    async logout(){
        try {
            await this.account.deleteSessions()
        } catch(e){

        }
    }
}
const authService = new AuthService()

export default authService