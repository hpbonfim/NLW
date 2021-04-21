import { GetStaticProps } from 'next'
import { format, parseISO } from 'date-fns'
import { API } from '../services/api'
import { ptBR } from 'date-fns/locale'
import { convertDurationToTimeString } from '../utils/tools'
import { HomeProps } from '../types/interfaces'
import HomePage from '../src/components/HomePage'

export default function Home({ latestEpisodes, allEpisodes }: HomeProps) {
  return (<HomePage latestEpisodes={latestEpisodes} allEpisodes={allEpisodes} />)
}

// SSR MODE
/*
export async function getServerSideProps() {
  const { data } = await API.get('episodes?_limit=12&_sort=published_at&_order=desc')
  
  return {
    props: {
      episodes: data
    }
  }
}
*/

// SSG MODE
export const getStaticProps: GetStaticProps = async () => {

  const { data } = await API.get('episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc'
    }
  })

  const episodes = data.map((episode) => {
    return {
      ...episode,
      publishedAt: format(parseISO(episode.published_at), 'd MMM yy', { locale: ptBR }),
      durationAsString: convertDurationToTimeString(Number(episode.file.duration)),
      url: episode.file.url
    }
  })

  const latestEpisodes = episodes.slice(0, 2)
  const allEpisodes = episodes.slice(2, episodes.length)

  return {
    props: {
      latestEpisodes: latestEpisodes,
      allEpisodes: allEpisodes
    },
    revalidate: 60 * 60 * 8
  }
}
