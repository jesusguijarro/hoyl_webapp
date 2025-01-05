import { IsEmail, MaxLength } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType({
  description: "Entradas para el registro de un usuario."
})
export class CreateUserInput {
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
  @MaxLength(50)
  @IsEmail(undefined, { message: "Verifica si el formato de tu correo es correcto." })
  email: string;

  @Field(() => String, { description: "Contraseña del usuario." })
  @MaxLength(20)
  password: string;
}
