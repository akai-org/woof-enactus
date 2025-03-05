import "reflect-metadata";
import { IsString, IsNotEmpty, Length } from "class-validator";

export default class CreatePartnerDto {
  @IsString({
    message: "Field `name` must be a string",
  })
  @Length(2, 64, {
    message: "Filed `name` must have lenght from 2 to 64 characters",
  })
  @IsNotEmpty({
    message: "Field `name` must not be empty",
  })
  name: string;
}
