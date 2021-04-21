import { HomeProps } from '../../../types/interfaces'
import styles from './styles.module.scss'
import Image from 'next/image'
import Link from 'next/link'

export default function HomePage({ latestEpisodes, allEpisodes }: HomeProps) {
    return (
        <div className={styles.homepage}>
            <section className={styles.latestEpisodes}>
                <h2>Últimos lançamentos</h2>
                <ul>
                    {latestEpisodes.map((episode) => {
                        return (
                            <li key={episode.id}>
                                <Image
                                    width={192}
                                    height={192}
                                    src={episode.thumbnail}
                                    alt={episode.title}
                                    objectFit='cover'
                                />
                                <div className={styles.episodeDetails}>
                                    <Link href={`/episodes/${episode.id}`}>
                                        <a>{episode.title}</a>
                                    </Link>
                                    <p>{episode.members}</p>
                                    <span>{episode.publishedAt}</span>
                                    <span>{episode.durationAsString}</span>
                                </div>
                                <button type='button'>
                                    <img src='/play-green.svg' alt='Tocar episódio' />
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </section>
            <section className={styles.allEpisodes}>
                <h2>Todos episódios</h2>
                <table cellSpacing='0'>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Podcast</th>
                            <th>Integrantes</th>
                            <th>Data</th>
                            <th>Duração</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {allEpisodes.map((episode) => {
                            return (
                                <tr key={episode.id}>
                                    <td style={{ width: 72 }}>
                                        <Image
                                            width={120}
                                            height={120}
                                            src={episode.thumbnail}
                                            alt={episode.title}
                                            objectFit='cover'
                                        />
                                    </td>
                                    <td>
                                        <Link href={`/episodes/${episode.id}`}>
                                            <a>{episode.title}</a>
                                        </Link>
                                    </td>
                                    <td>{episode.members}</td>
                                    <td style={{ width: 110 }}>{episode.publishedAt}</td>
                                    <td>{episode.durationAsString}</td>
                                    <td>
                                        <button type='button'>
                                            <img src='/play-green.svg' alt='Tocar episódio' />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </section>
        </div>
    )
}