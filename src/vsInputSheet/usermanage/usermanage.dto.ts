import {  IsNotEmpty } from "class-validator";

export class UsermanageDto{
    @IsNotEmpty()
    name:string;
}