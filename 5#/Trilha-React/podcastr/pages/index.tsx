import Header from '../src/components/Header'

export default function Home(props) {
  console.log(props);

  return (
    <div>

    </div>
  )
}

// SSR MODE
/*
export async function getServerSideProps() {
  const response = await fetch('http://localhost:3333/episodes')
  const data = await response.json()

  return {
    props: {
      episodes: data
    }
  }
}
*/

// SSG MODE
export async function getStaticProps() {
  const response = await fetch('http://localhost:3333/episodes')
  const data = await response.json()

  return {
    props: {
      episodes: data
    },
    revalidate: 60 * 60 * 8
  }
}
