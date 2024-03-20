import Head from 'next/head'
import dynamic from 'next/dynamic'
import { LoadingPage } from '@pagesImpl/__components__/LoadingPage'

const ProfileImplWithNoSSR = dynamic(() => import('@pagesImpl/profile/profileImpl'), {
  ssr: false,
  loading: () => (
    <>
      <LoadingPage />
    </>
  ),
})

export default function Main() {
  return (
    <>
      <Head>
        <title>{'Kitchen Companion'}</title>
        <meta property="og:type" content="product" />
      </Head>
      <ProfileImplWithNoSSR />
    </>
  )
}
