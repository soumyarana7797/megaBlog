import conf from "../conf/conf";
import { Client, Account, ID,Databases, Storage, Query } from "appwrite";

export class Service{
    client = new Client()
    databases
    bucket
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.databases);
        this.bucket = new Storage(this.Storage)

    }
    async createPost({title,slug,content, featuredimage,status,userId}){
        return await this.databases.createDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug,
            {
                title,
                content,
                featuredimage,
                status,
                userId
            }
        )
    }

    async updatePost(slug,{title,slug,content, featuredimage,status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredimage,
                    status,
                    userId
                }
            )
        } catch(e){
            throw e
        }

    }
    async deletePost(slug){
        try {
             await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true
        } catch(e){
            return false
        }

    }
    async getPost(slug){
        try {
             return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            // return true
        } catch(e){
            return false
        }

    }
    async getPosts(queries= [Query.equal("status", "active")]){
        try {
             return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
            // return true
        } catch(e){
            return false
        }

    }
    //File upload
    async uploadFile(file){
        try{
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )

        } catch(e) {
            return false

        }
    }
    async deleteFile(fileId){
        try{
            return await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )

        } catch(e) {
            return false

        }
    }
    async deleteFile(fileId){
        try{
            return await this.bucket.getFilePreview(
                conf.appwriteBucketId,
                fileId
            )

        } catch(e) {
            return false

        }
    }
}
const service = new Service()
export default service
