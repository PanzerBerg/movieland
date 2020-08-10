export interface Params {
    colors: {
        palette: string[],
        url: string
    },
    itemParam: {
        id: number,
        type: string
    }
}

export interface MovieData {
    adult: boolean,
    backdrop_path: string,
    budget: number,
    genres: [{
        id: number,
        name: string
    }],
    id: number,
    imdb_id: number,
    original_language: string,
    original_title: string,
    overview: string,
    poster_path: string,
    production_companies: [{
        id: number,
        logo_path: string,
        name: string,
        origin_country: string
    }],
    release_date: string,
    revenue: number,
    runtime: number,
    spoken_languages: [{
        name: string
    }],
    status: string,
    title: string,
    vote_average: number,
    vote_count: number
}

export interface SerieData {
    backdrop_path: string,
    created_by: [{
        id: number,
        name: string,
        profile_path: string
    }],
    episode_run_time: number[],
    first_air_date: string,
    genres: [{
        id: number,
        name: string
    }],
    id: number,
    in_production: boolean,
    languages: string[],
    last_air_date: string,
    last_episode_to_air: {
        episode_number: number,
        name: string,
        season_number: number
    },
    name: string,
    next_episode_to_air: string,
    networks: [{
        name: string,
        logo_path: string,
    }],
    number_of_episodes: number,
    number_of_seasons: number,
    origin_country: string[],
    original_language: string,
    original_name: string,
    overview: string,
    poster_path: string,
    production_companies: [{
        id: number,
        logo_path: null,
        name: string,
        origin_country: string
    }],
    seasons: [{
        air_date: string,
        episode_count: number,
        id: number,
        name: string,
        overview: string,
        poster_path: string,
        season_number: number
    }],
    status: string,
    vote_average: number,
    vote_count: number
}

export interface Cast {
    character: string,
    id: number,
    name: string,
    profile_path: string
}

export interface Crew {
    id: number,
    job: string,
    name: string,
    profile_path: string
}
