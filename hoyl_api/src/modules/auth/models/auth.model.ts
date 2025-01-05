import { Field, ObjectType } from "type-graphql";

@ObjectType({ description: "Resultado de autorización del usuario." })
export class Auth {
  @Field(() => String, {
    description: "Identificador del token."
  })
  token: string;

  @Field(() => String, { description: "Tipo de token." })
  tokenType: string;
}
