type User = {
  id: number
  name: string
  email: string
  role: string
}

export type Env = {
  Variables: {
    user: User
  }
}
