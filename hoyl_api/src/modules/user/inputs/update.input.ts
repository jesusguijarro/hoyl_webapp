import { MaxLength } from "class-validator";
import { Field, InputType } from "type-graphql";

// }
@InputType({
  description: "Entradas para el registro de un usuario."
})
export class UpdateUserInput {
  @Field((type) => String, {
    description: "Nombre(s) del usuario.",
    nullable: true
  })
  @MaxLength(20)
  names?: string;

  @Field((type) => String, {
    description: "Apellido(s) del usuario.",
    nullable: true
  })
  @MaxLength(20)
  lastNames?: string;

  @Field((type) => Date, { description: "Fecha de Nacimiento.", nullable: true })
  birthDate?: Date;
}
