export interface CarDetail{
    carId:number;
    carName:string;  
    carDescription:string;      
    brandName:string;
    colorName:string;
    modelYear:number;
    dailyPrice:number;
}

export interface Car{
    id:number;
    name:string;  
    brandId:number;
    colorId:number;
    modelYear:number;
    dailyPrice:number;
    description:string;      
}