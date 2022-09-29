
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

export type NewUserRegisterForm = {
  username: string,
  email: string,
  password: string | number,
}


export type UserLoginType = {
  email: string,
  password: string | number,
}


export type AuthJwtResponse = {
  accessToken: string,
  refreshToken: string,
}


export type AuthService = {
  addRefreshTokenToWhitelist: (args: RefreshWhitelistTokenType) => unknown,
  findRefreshTokenById: (id: string) => unknown,
  deleteRefreshToken: (id: string) => unknown,
  revokeTokens: (userId: string) => unknown,
}

export type RefreshWhitelistTokenType = {
  jti: string,
  refreshToken: string,
  userId: string
}


export type UserType = {
  id: string,
  username: string,
  isAdmin: boolean,
}
