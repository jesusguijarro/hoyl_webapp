import { Player, Prisma, PrismaClient } from "@prisma/client";
import { Injectable } from "@tsed/di";
import { AnswerRepository } from "src/repositories";

@Injectable()
export class PlayerRepository {
  constructor(private readonly prisma: PrismaClient, readonly answerRepository: AnswerRepository) {}

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

  // deleteMany(usernames: string[]) {
  //   for (let x = 0; x < usernames.length; x++) {
  //     this.answerRepository.deletePlayerAnswers(usernames[x]);
  //   }
  //   return this.prisma.player.deleteMany({
  //     where: {
  //       username: {
  //         in: usernames
  //       }
  //     }
  //   });
  // }

  async deleteManyPlayerAndAnswers(usernames: string[]): Promise<Player[]> {
    console.log("usernames", usernames);

    return this.prisma.$transaction(async (prisma) => {
      const playersToDelete = await prisma.player.findMany({
        where: {
          username: {
            in: usernames
          }
        }
      });

      await prisma.answer.deleteMany({
        where: {
          playerUsername: {
            in: usernames
          }
        }
      });

      await prisma.player.deleteMany({
        where: {
          username: {
            in: usernames
          }
        }
      });

      return playersToDelete;
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
