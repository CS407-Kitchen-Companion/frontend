import Head from 'next/head'
import dynamic from 'next/dynamic'
import { LoadingPage } from '@pagesImpl/__components__/LoadingPage'
import { useRouter } from 'next/router';


const VerifyImpl = dynamic(() => import('@pagesImpl/verify/verifyImpl'), {
  ssr: false,
  loading: () => (
    <>
      <LoadingPage />
    </>
  ),
})

export default function Main() {
  const router = useRouter();
  const { blob } = router.query;

  return (
    <>
      <Head>
        <title>{'Kitchen Companion'}</title>
        <meta property="og:type" content="product" />
      </Head>
      
    </>
  )
}
