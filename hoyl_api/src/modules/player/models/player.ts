import { Field, ID, Int, ObjectType } from "type-graphql";
import { Appearance } from "./appearance.enum";

@ObjectType({ description: "Player model." })
export class Player {
  @Field(() => ID, { description: "Id del jugador." })
  id: number;

  @Field(() => String, { description: "Nombre del jugador." })
  name: string;

  @Field(() => Int, { description: "Edad del jugador." })
  age: number;

  @Field(() => String, { description: "Username del jugador." })
  username: string;

  @Field(() => Appearance, { description: "Apariencia del jugador." })
  appearance: Appearance;
}
