import {  IsNotEmpty } from "class-validator";

export class M3buyerdivisionDto{
    @IsNotEmpty()
    name:string;
}