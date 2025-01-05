import { Prisma, PrismaClient } from "@prisma/client";
import { Injectable } from "@tsed/di";

@Injectable()
export class AnswerRepository {
  constructor(private readonly prisma: PrismaClient) {}

  get(id: number) {
    return this.prisma.answer.findUnique({
      where: {
        id: Number(id)
      }
    });
  }

  getAll() {
    return this.prisma.answer.findMany();
  }

  create(input: Prisma.AnswerCreateInput) {
    console.log("create answer called -------------------------------------------------------------");
    return this.prisma.answer.create({
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

  // playerAnswers(username: string) {
  //   return this.prisma.answer.findMany({
  //     where: {
  //       playerUsername: Number(username)
  //     },
  //     orderBy: {
  //       question: "asc"
  //     }
  //   });
  // }
}
