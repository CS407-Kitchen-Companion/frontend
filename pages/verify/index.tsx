import Head from 'next/head'
import dynamic from 'next/dynamic'
import { LoadingPage } from '@pagesImpl/__components__/LoadingPage'
import { useRouter, } from 'next/router';
import { useSearchParams } from 'next/navigation'

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
  
  const params  = useSearchParams();

  const parameters = new URLSearchParams(params);
  
  const token = parameters.get('token');
  const uid = parameters.get('uid');
  console.log('token:' + token + 'uid:' + uid)
  return (
    <>
      <Head>
        <title>{'Kitchen Companion'}</title>
        <meta property="og:type" content="product" />
      </Head>
      {token && uid ? (
      <VerifyImpl uid = {uid} token={token} />
      ) : (
        <h1>Invalid Verify Link</h1>
      )}
    </>
  )
}
