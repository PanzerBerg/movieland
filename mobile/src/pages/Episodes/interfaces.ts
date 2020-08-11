export interface SeasonParams {
    id: number,
    seasonNumber: number,
    type: string
}

export interface EpisodesProps {
    air_date: string,
    episode_number: number,
    id: number,
    name: string,
    overview: string,
    still_path: string,
    vote_average: number,
}

export interface Colors {
    palette: string[],
    url: string
}