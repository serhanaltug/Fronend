import { Rental } from "./rental";
import { responseModel } from "./responseModel";

export interface rentalResponseModel extends responseModel{
    data:Rental[];
}
