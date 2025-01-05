import { IsInt, IsNotEmpty, IsString } from "class-validator";
import { Field, InputType, Int } from "type-graphql";
import { Appearance } from "../models/appearance.enum";

@InputType({ description: "Inputs para registrar un jugador." })
export class CreatePlayerInput {
  @Field(() => String, { description: "Nombre del jugador." })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field(() => Int, { description: "Edad del jugador." })
  @IsInt()
  age: number;

  @Field(() => String, { description: "Username del jugador." })
  @IsString()
  @IsNotEmpty()
  username: string;

  @Field(() => Appearance, { description: "Apariencia del jugador." })
  appearance: Appearance;
}
