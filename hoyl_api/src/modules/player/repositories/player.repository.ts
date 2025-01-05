import { Prisma, PrismaClient } from "@prisma/client";
import { Injectable } from "@tsed/di";

@Injectable()
export class PlayerRepository {
  constructor(private readonly prisma: PrismaClient) {}

  get(username: string) {
    return this.prisma.player.findUnique({
      where: {
        username
      }
    });
  }

  getAll() {
    return this.prisma.player.findMany();
  }

  create(input: Prisma.PlayerCreateInput) {
    console.log("create player called -------------------------------------------------------------");
    return this.prisma.player.create({
      data: input
    });
  }

  delete(id: number) {
    return this.prisma.player.delete({
      where: {
        id: Number(id)
      }
    });
  }

  answers(username: string) {
    return this.prisma.answer.findMany({
      where: {
        playerUsername: username
      },
      orderBy: {
        question: "asc"
      }
    });
  }
}
