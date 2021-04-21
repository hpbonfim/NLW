import styles from './styles.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import { EpisodeProps } from '../../../types/interfaces'

export default function EpisodeDetail({ episode }: EpisodeProps) {
    return (
        <div className={styles.episode}>
            <div className={styles.thumbnailContainer}>
                <Link href='/'>
                    <button type='button'>
                        <img src='/arrow-left.svg' alt='voltar' />
                    </button>
                </Link>
                <Image
                    width={700}
                    height={160}
                    src={episode.thumbnail}
                    objectFit='cover'
                />
                <button type='button'>
                    <img src='/play.svg' alt='Tocar episódio' />
                </button>
            </div>

            <header>
                <h1>{episode.title}</h1>
                <span>{episode.members}</span>
                <span>{episode.publishedAt}</span>
                <span>{episode.durationAsString}</span>
            </header>

            <div
                className={styles.description}
                dangerouslySetInnerHTML={{ __html: episode.description }}
            />
        </div>
    )
}