import { Field, ID, Int, ObjectType } from "type-graphql";

@ObjectType({ description: "Answer model." })
export class Answer {
  @Field(() => ID, { description: "Id de la respuesta." })
  id: number;

  @Field(() => Int, { description: "Número de la pregunta." })
  question: number;

  @Field(() => Int, { description: "Respuesta a la pregunta." })
  answer: number;

  @Field(() => String, { description: "Username del jugador." })
  playerUsername: string;
}
