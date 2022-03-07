import {  IsNotEmpty } from "class-validator";

export class LeadfactoryDto{
    @IsNotEmpty()
    name:string;
}