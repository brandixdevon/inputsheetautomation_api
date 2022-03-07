import {  IsNotEmpty } from "class-validator";

export class MerchandiserDto{
    @IsNotEmpty()
    name:string;
}