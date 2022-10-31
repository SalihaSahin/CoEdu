

export interface Trainer{

    trainerId:number;
    trainerName:string;
    trainerSurname:string;
    trainerPhone:string;
    trainerEmail:string;
    trainerPasswordHash:string;
    trainerPasswordSalt:string;
    Status:Boolean;
    trainerDate:Date;
    trainerGender:string;
    trainerBranch:string;
    trainerSchool:string;
    trainerAbout:string;
    aboutLessInfo:string;
    addressId:number;
    trainerWage:number;
    formOfEduId:number;
    educationId:number;
    images:string[];
}