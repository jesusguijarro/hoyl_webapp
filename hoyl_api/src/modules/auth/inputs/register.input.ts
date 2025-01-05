// export class RegisterInput{
//     names: string;
//     lastNames: string;
//     mail: string;
//     password: string;

import { MaxLength } from "class-validator";
import { Field, InputType } from "type-graphql";

// }
@InputType({
  description: "Entradas para el registro de un usuario."
})
export class RegisterInput {
  @Field(() => String, {
    description: "Nombre(s) del usuario."
  })
  @MaxLength(20)
  names: string;

  @Field(() => String, {
    description: "Apellido(s) del usuario."
  })
  @MaxLength(20)
  lastNames: string;

  @Field(() => String, { description: "Correo electrónico del usuario." })
  email: string;
  
  password: string;
}
