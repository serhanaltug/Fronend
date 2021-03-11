import { Product } from "./product";
import { responseModel } from "./responseModel";

export interface productResponseModel extends responseModel{
    data:Product[];
}