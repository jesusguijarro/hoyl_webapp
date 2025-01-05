import { IsEmail, MaxLength } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class LoginInput {
  @Field(() => String, { description: "Correo electrónico del usuario." })
  @MaxLength(50)
  @IsEmail(undefined, { message: "Verifica si el formato de correo es correcto." })
  email: string;

  @Field(() => String, { description: "Contraseña del usuario." })
  @MaxLength(20)
  password: string;
}
