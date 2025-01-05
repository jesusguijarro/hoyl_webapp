//import { email, string } from "@tsed/schema/lib/types/utils/from";
import { Forbidden } from "@tsed/exceptions";
import { ResolverService } from "@tsed/typegraphql";
import { Arg, Ctx, ID, Mutation, Query } from "type-graphql";
import { UpdateUserInput } from "./inputs/update.input";
import { CreateUserInput } from "./inputs/user.input";
import { ToDoContext } from "./models/context.model";
import { User } from "./models/user.model";
import { UserRepository } from "./repositories/user.repository";

@ResolverService(User)
export class UserResolver {
  constructor(private readonly userRepository: UserRepository) {}

  //@Authorized()
  @Query(() => User, { description: "Query para obtener un usuario." })
  user(@Arg("id", () => ID) id: number) {
    return this.userRepository.getUser(id);
  }

  //@Authorized()
  @Query(() => [User], { description: "Query para obtener todos los usuarios." })
  users() {
    return this.userRepository.getAll();
  }

  //@Authorized()
  @Query(() => User, { description: "Query para obtener el usuario actualmente loggeado." })
  currentUser(@Ctx() context: ToDoContext) {
    if (context.user) {
      return this.userRepository.getUser(context.user?.id);
    }
    throw new Forbidden("Usuario no encontrado.");
  }

  @Mutation(() => User, {
    description: "Mutación para crear un nuevo usuario."
  })
  registerUser(@Arg("create", () => CreateUserInput) create: CreateUserInput) {
    return this.userRepository.createUser({
      ...create
    });
  }

  //@Authorized()
  @Mutation(() => User, { description: "Mutación para eliminar un usuario" })
  deleteUser(@Arg("delete", () => ID) id: number) {
    return this.userRepository.deleteUser(id);
  }

  //@Authorized()
  @Mutation(() => User, { description: "Mutación para actualizar un usuario" })
  updateUser(@Arg("update", () => UpdateUserInput) update: UpdateUserInput, @Ctx() context: ToDoContext) {
    if (context.user) {
      return this.userRepository.updateUser(context.user?.id, update);
    }
    throw new Forbidden("Usuario no encontrado.");
  }
}
