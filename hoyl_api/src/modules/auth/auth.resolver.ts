import { Forbidden } from "@tsed/exceptions";
import { ResolverService } from "@tsed/typegraphql";
import { sign } from "jsonwebtoken";
import { Arg, Mutation } from "type-graphql";
import { LoginInput } from "./inputs/login.input";
import { Auth } from "./models/auth.model";
import { AuthRepository } from "./repositories/auth.repository";

@ResolverService()
export class AuthResolver {
  constructor(private authRepository: AuthRepository) {}

  @Mutation(() => Auth, { description: "Mutación para login." })
  async login(@Arg("input", () => LoginInput) input: LoginInput): Promise<Auth> {
    console.log("entré a login del auth resolver");
    const user = await this.authRepository.login(input.email, input.password);
    if (user) {
      console.log("entré al if ----------------------");

      const { password, ...input } = user;
      const token = sign(input, process.env.SECRET ?? "ben");
      return {
        token,
        tokenType: "bearer"
      };
    }
    throw new Forbidden("Datos de acceso incorrectos.");
  }
}
