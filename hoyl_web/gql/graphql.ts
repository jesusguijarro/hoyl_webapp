import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type AnswerQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type AnswerQuery = { __typename?: 'Query', answer: { __typename?: 'Answer', id: string, question: number, answer: number, playerUsername: string } };

export type AnswersQueryVariables = Exact<{ [key: string]: never; }>;


export type AnswersQuery = { __typename?: 'Query', answers: Array<{ __typename?: 'Answer', id: string, question: number, answer: number, playerUsername: string }> };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', currentUser: { __typename?: 'User', id: string, names: string, lastNames: string, email: string } };

export type DeleteManyPlayerAndAnswersMutationVariables = Exact<{
  usernames: Array<Scalars['String']> | Scalars['String'];
}>;


export type DeleteManyPlayerAndAnswersMutation = { __typename?: 'Mutation', deleteManyPlayerAndAnswers: Array<{ __typename?: 'Player', appearance: Appearance, id: string, username: string, name: string, age: number }> };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'Auth', token: string, tokenType: string } };

export type PlayerQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type PlayerQuery = { __typename?: 'Query', player: { __typename?: 'Player', id: string, name: string, age: number, username: string, appearance: Appearance, answers: Array<{ __typename?: 'Answer', id: string, question: number, answer: number, playerUsername: string }> } };

export type PlayersQueryVariables = Exact<{ [key: string]: never; }>;


export type PlayersQuery = { __typename?: 'Query', players: Array<{ __typename?: 'Player', id: string, username: string, age: number, appearance: Appearance, answers: Array<{ __typename?: 'Answer', id: string, question: number, answer: number, playerUsername: string }> }> };

export type UserQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, names: string, lastNames: string, email: string } };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, names: string, lastNames: string, email: string }> };


export const Answer = gql`
    query Answer($id: ID!) {
  answer(id: $id) {
    id
    question
    answer
    playerUsername
  }
}
    `;
export const Answers = gql`
    query Answers {
  answers {
    id
    question
    answer
    playerUsername
  }
}
    `;
export const CurrentUser = gql`
    query CurrentUser {
  currentUser {
    id
    names
    lastNames
    email
  }
}
    `;
export const DeleteManyPlayerAndAnswers = gql`
    mutation DeleteManyPlayerAndAnswers($usernames: [String!]!) {
  deleteManyPlayerAndAnswers(usernames: $usernames) {
    appearance
    id
    username
    name
    age
  }
}
    `;
export const Login = gql`
    mutation Login($input: LoginInput!) {
  login(input: $input) {
    token
    tokenType
  }
}
    `;
export const Player = gql`
    query Player($username: String!) {
  player(username: $username) {
    id
    name
    age
    username
    appearance
    answers {
      id
      question
      answer
      playerUsername
    }
  }
}
    `;
export const Players = gql`
    query Players {
  players {
    id
    username
    age
    appearance
    answers {
      id
      question
      answer
      playerUsername
    }
  }
}
    `;
export const User = gql`
    query User($id: ID!) {
  user(id: $id) {
    id
    names
    lastNames
    email
  }
}
    `;
export const Users = gql`
    query Users {
  users {
    id
    names
    lastNames
    email
  }
}
    `;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

/** Answer model. */
export type Answer = {
  __typename?: 'Answer';
  /** Respuesta a la pregunta. */
  answer: Scalars['Int'];
  /** Id de la respuesta. */
  id: Scalars['ID'];
  /** Username del jugador. */
  playerUsername: Scalars['String'];
  /** Número de la pregunta. */
  question: Scalars['Int'];
};

/** Apariencia del jugador. */
export enum Appearance {
  Female = 'FEMALE',
  Male = 'MALE'
}

/** Resultado de autorización del usuario. */
export type Auth = {
  __typename?: 'Auth';
  /** Identificador del token. */
  token: Scalars['String'];
  /** Tipo de token. */
  tokenType: Scalars['String'];
};

/** Inputs para registrar una respuesta. */
export type CreateAnswerInput = {
  /** Respuesta de la pregunta. */
  answer: Scalars['Int'];
  /** Username del jugador. */
  playerUsername: Scalars['String'];
  /** Número de pregunta. */
  question: Scalars['Int'];
};

/** Inputs para registrar un jugador. */
export type CreatePlayerInput = {
  /** Edad del jugador. */
  age: Scalars['Int'];
  /** Apariencia del jugador. */
  appearance: Appearance;
  /** Nombre del jugador. */
  name: Scalars['String'];
  /** Username del jugador. */
  username: Scalars['String'];
};

/** Entradas para el registro de un usuario. */
export type CreateUserInput = {
  /** Correo electrónico del usuario. */
  email: Scalars['String'];
  /** Apellido(s) del usuario. */
  lastNames: Scalars['String'];
  /** Nombre(s) del usuario. */
  names: Scalars['String'];
  /** Contraseña del usuario. */
  password: Scalars['String'];
};

export type LoginInput = {
  /** Correo electrónico del usuario. */
  email: Scalars['String'];
  /** Contraseña del usuario. */
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Mutación para elminar uno o más jugadores, y sus respuestas relacionadas. */
  deleteManyPlayerAndAnswers: Array<Player>;
  /** Mutación para eliminar un usuario */
  deleteUser: User;
  /** Mutación para login. */
  login: Auth;
  /** Mutación para registrar un jugador. */
  registerPlayer: Player;
  /** Mutación para crear un nuevo usuario. */
  registerUser: User;
  /** Mutación para registrar una respuesta. */
  saveAnswer: Answer;
  /** Mutación para actualizar un usuario */
  updateUser: User;
};


export type MutationDeleteManyPlayerAndAnswersArgs = {
  usernames: Array<Scalars['String']>;
};


export type MutationDeleteUserArgs = {
  delete: Scalars['ID'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRegisterPlayerArgs = {
  create: CreatePlayerInput;
};


export type MutationRegisterUserArgs = {
  create: CreateUserInput;
};


export type MutationSaveAnswerArgs = {
  create: CreateAnswerInput;
};


export type MutationUpdateUserArgs = {
  update: UpdateUserInput;
};

/** Player model. */
export type Player = {
  __typename?: 'Player';
  /** Edad del jugador. */
  age: Scalars['Int'];
  answers: Array<Answer>;
  /** Apariencia del jugador. */
  appearance: Appearance;
  /** Id del jugador. */
  id: Scalars['ID'];
  /** Nombre del jugador. */
  name: Scalars['String'];
  /** Username del jugador. */
  username: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  /** Query para obtener una respuesta. */
  answer: Answer;
  /** Query para obtener todas las respuestas. */
  answers: Array<Answer>;
  /** Query para obtener el usuario actualmente loggeado. */
  currentUser: User;
  /** Query para obtener un jugador. */
  player: Player;
  /** Query para obtener todos los jugadores. */
  players: Array<Player>;
  /** Query para obtener un usuario. */
  user: User;
  /** Query para obtener todos los usuarios. */
  users: Array<User>;
};


export type QueryAnswerArgs = {
  id: Scalars['ID'];
};


export type QueryPlayerArgs = {
  username: Scalars['String'];
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};

/** Entradas para el registro de un usuario. */
export type UpdateUserInput = {
  /** Fecha de Nacimiento. */
  birthDate?: InputMaybe<Scalars['DateTime']>;
  /** Apellido(s) del usuario. */
  lastNames?: InputMaybe<Scalars['String']>;
  /** Nombre(s) del usuario. */
  names?: InputMaybe<Scalars['String']>;
};

/** Credenciales del usuario. */
export type User = {
  __typename?: 'User';
  /** Email del usuario. */
  email: Scalars['String'];
  /** Id del usuario. */
  id: Scalars['ID'];
  /** Apellidos del usuario. */
  lastNames: Scalars['String'];
  /** Nombre del usuario. */
  names: Scalars['String'];
};
