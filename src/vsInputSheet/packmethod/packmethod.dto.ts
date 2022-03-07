import {  IsNotEmpty } from "class-validator";

export class PackmethodDto{
    @IsNotEmpty()
    name:string;

    @IsNotEmpty()
    buyer:string;
}