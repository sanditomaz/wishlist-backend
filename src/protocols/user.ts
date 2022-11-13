export type UserEntity = {
    id: number,
    name: string,
    image: string,
    email: string,
    password: string
}

export type User = Omit<UserEntity, "id">
export type UserLogin = Omit<UserEntity, "id" | "name" | "image" >