export interface HomeProps {
    latestEpisodes: EpisodeType[],
    allEpisodes: EpisodeType[]
}

export interface EpisodeProps {
    episode: EpisodeType
}

export type EpisodeType = {
    id: string
    title: string
    members: string
    published_at: string
    thumbnail: string
    description: string
    publishedAt: string
    durationAsString: string
    file: {
        url: string
        type: string
        duration: number
    }
    duration: number
    url: string
}
