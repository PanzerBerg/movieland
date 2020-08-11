export interface SeasonsParams {
    params: {
        colors: {
            palette: string[],
            url: string
        },
        itemParam: {
            id: number,
            type: string
        }
    },
    seasons: Seasons[],
    name: string
}

export interface SeasonsProps {
    air_date: string,
    episode_count: number,
    id: number,
    name: string,
    overview: string,
    poster_path: string,
    season_number: number
}