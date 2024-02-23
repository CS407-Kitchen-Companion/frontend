import Head from 'next/head'
import dynamic from 'next/dynamic'
import { LoadingPage } from '@pagesImpl/__components__/LoadingPage'

const ViewPostImplWithNoSSR = dynamic(() => import('@pagesImpl/viewpost/viewpostImpl'), {
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
      <ViewPostImplWithNoSSR />
    </>
  )
}
