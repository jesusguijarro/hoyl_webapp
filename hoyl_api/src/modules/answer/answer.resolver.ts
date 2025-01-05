import { ResolverService } from "@tsed/typegraphql";
import { Arg, ID, Mutation, Query } from "type-graphql";
import { CreateAnswerInput } from "./inputs/answer.input";
import { Answer } from "./models/answer.model";
import { AnswerRepository } from "./repositories/answer.repository";

@ResolverService(Answer)
export class AnswerResolver {
  constructor(readonly answerRepository: AnswerRepository) {}

  @Query(() => Answer, { description: "Query para obtener una respuesta." })
  answer(@Arg("id", () => ID) id: number) {
    return this.answerRepository.get(id);
  }

  @Query(() => [Answer], { description: "Query para obtener todas las respuestas." })
  answers() {
    return this.answerRepository.getAll();
  }

  @Mutation(() => Answer, { description: "Mutación para registrar una respuesta." })
  saveAnswer(@Arg("create", () => CreateAnswerInput) create: CreateAnswerInput) {
    return this.answerRepository.create({
      question: create.question,
      answer: create.answer,
      player: {
        connect: {
          //id: Number(create.playerUsername) // Use the player relation and connect by id
          username: create.playerUsername
        }
      }
    });
  }
}
