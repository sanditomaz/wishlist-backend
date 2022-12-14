export type MovieEntity = {
    id: number,
    name: string,
    image: string,
    platform: string,
    genreId: number,  
}

export type Genre = {
    id?: number,
    genre: string
}

export type WishlistEntity = {
    id: number,
    userId: number,
    movieId: number,
    watched: boolean
}

export type Query = {
    id: string
}

export type QueryMovie = {
    movie: string
}

export type QueryUser = {
    userId: number
}

export type Movie = Omit<MovieEntity, "id">
export type Wishlist = Omit<WishlistEntity, "id">