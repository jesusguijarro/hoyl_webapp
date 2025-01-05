import { registerEnumType } from "type-graphql";

export enum Appearance {
  MALE = "MALE",
  FEMALE = "FEMALE"
}

registerEnumType(Appearance, {
  name: "Appearance",
  description: "Apariencia del jugador."
});
