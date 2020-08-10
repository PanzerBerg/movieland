import Axios from 'axios'

const movieOptions = {
    now_playing: 'now_playing',
    top_rated: 'top_rated',
    upcoming: 'upcoming'
}

const seriesOptions = {
    top_rated: 'top_rated',
    popular: 'popular',
    latest: 'latest'
}

const url = 'https://api.themoviedb.org/3/'
const key = '?api_key=381ca3b4c0360f778decae3be0bfec69'

export const api = Axios.create({
    baseURL: url
})

export const serverApi = Axios.create({
    baseURL: 'http://192.168.0.105:3333'
})

export class Movies{
    static genres(language:string) {
        const url = `genre/movie/list${key}&language=${language}`
        return url
    }

    static upcomingMovies(language:string, page:number){
        const url = `movie/${movieOptions.upcoming}${key}&language=${language}&region=BR&page=${page}`
        return url
    }

    static nowPlayingMovies(language:string, page:number){
        const url = `movie/${movieOptions.now_playing}${key}&language=${language}&page=${page}`
        return url
    }

    static topRatedMovies(language:string, page:number) {
        const url = `movie/${movieOptions.top_rated}${key}&language=${language}&region=br&page=${page}`
        return url
    }

    static getById(language:string, id:number) {
        const url = `movie/${id}${key}&language=${language}`
        return url
    }

    static getCast(movieId: number) {
        const url = `movie/${movieId}/credits${key}`
        return url
    }
}

export class Series {
    static topRatedSeries(language:string, page:number) {
        const url = `tv/${seriesOptions.top_rated}${key}&language=${language}&page=${page}`
        return url
    }

    static getById(language:string, id:number) {
        const url = `tv/${id}${key}&language=${language}`
        return url
    }

    static getCast(serieId: number) {
        const url = `tv/${serieId}/credits${key}`
        return url
    }
}