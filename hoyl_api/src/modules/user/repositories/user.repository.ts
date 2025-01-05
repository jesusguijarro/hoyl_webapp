import { Prisma, PrismaClient } from "@prisma/client";
import { Injectable } from "@tsed/di";
import bcrypt from "bcryptjs";

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaClient) {}
  //get, getAll, create, upadate y delete
  getUser(id: number) {
    //Esta es la manera correcta
    return this.prisma.user.findUnique({
      where: {
        id: Number(id)
      }
    });
  }

  getAll() {
    return this.prisma.user.findMany();
  }

  async createUser(input: Prisma.UserCreateInput) {
    const salt = await bcrypt.genSalt(8);
    return this.prisma.user.create({
      data: {
        ...input,
        password: await bcrypt.hash(input.password, salt)
      }
    });
  }

  deleteUser(id: number) {
    return this.prisma.user.delete({
      where: {
        id: Number(id)
      }
    });
  }

  updateUser(id: number, input: Prisma.UserUpdateInput) {
    return this.prisma.user.update({
      where: {
        id: Number(id)
      },
      data: input
    });
  }
}
