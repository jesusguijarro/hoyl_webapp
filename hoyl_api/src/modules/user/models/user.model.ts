import { User as UserClass } from "@prisma/client";
import { Field, ID, ObjectType } from "type-graphql";
@ObjectType({
  description: "Credenciales del usuario."
})
export class User implements UserClass {
  @Field(() => ID, { description: "Id del usuario." })
  id: number;

  @Field(() => String, {
    description: "Nombre del usuario."
  })
  names: string;

  @Field(() => String, {
    description: "Apellidos del usuario."
  })
  lastNames: string;

  @Field(() => String, { description: "Email del usuario." })
  email: string;

  password: string;
}
