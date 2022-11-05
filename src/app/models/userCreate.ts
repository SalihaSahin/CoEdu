export interface UserCreate{
    userId:number;
    userName:string;
    userSurname:string;
    userEmail: string; 
    userPassword:string;
    images:string[];
}