
export type ApiInfo = {
  name: string,
  version: string,
  description?: string,
  keywords?: string[],
  author?: Object | Array,
}

export type HelloWord = {
  message: string,
  timestamp?: Date,
}


// {
//   username: string,
//   email: string,
//   password: string | number,
// }


export type UserLoginType = {
  email: string,
  password: string | number,
}


export type AuthJwtResponse = {
  accessToken: string,
  refreshToken: string,
}


export type RefreshWhitelistTokenType = {
  jti: string,
  refreshToken: string,
  userId: string
}


export type UserBase = {
  id: string,
  username: string,
  email: string,
  password: string,
  isAdmin?: boolean
}

export type NewUser = Omit<UserBase, 'isAdmin' | 'id'>

export type UserType = Omit<UserBase, 'password' | 'email'>



//----------------------------------------------------------------||
// Services Types & Interfaces                                    ||
//----------------------------------------------------------------||

// 1. Authorization Service
export interface AuthService {
  addRefreshTokenToWhitelist: (args: RefreshWhitelistTokenType) => unknown,
  findRefreshTokenById: (id: string) => unknown,
  deleteRefreshToken: (id: string) => unknown,
  revokeTokens: (userId: string) => unknown,
}

// 1. Users Service
export type UserService = {
  listUsers: () => unknown,
  findUserByEmail: (email: string) => UserBase,
  findUserById: (id: string | number) => UserBase,
  updateUser: (data: Omit<UserBase, 'password'>) => unknown,
  createUserByEmailAndPassword: (user: Omit<UserBase, 'id'>) => unknown,
}
