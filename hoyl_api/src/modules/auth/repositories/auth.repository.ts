import { PrismaClient } from "@prisma/client";
import { Injectable } from "@tsed/di";
import bcrypt from "bcryptjs";

@Injectable()
export class AuthRepository {
  constructor(private prisma: PrismaClient) {}

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: {
        email
      }
    });
    if (await bcrypt.compare(password, user.password)) {
      return user;
    }
  }
}
