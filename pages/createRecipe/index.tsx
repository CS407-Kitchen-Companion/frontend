import Head from 'next/head'
import dynamic from 'next/dynamic'
import { LoadingPage } from '@pagesImpl/__components__/LoadingPage'
import { checkCookie } from '@lib/utils/cookieHelper'
import { navActions } from '@lib/store/nav/nav.slice'
import { useDispatch } from 'react-redux'

const CreateRecipeImplWithNoSSR = dynamic(() => import('@pagesImpl/main/createRecipeImpl'), {
  ssr: false,
  loading: () => (
    <>
      <LoadingPage />
    </>
  ),
})

export default function Main() {
  if(!checkCookie()){
    const dispatch = useDispatch()
    dispatch(navActions.push({url: '/login'}))
  }
  return (
    <>
      <Head>
        <title>{'Kitchen Companion'}</title>
        <meta property="og:type" content="product" />
      </Head>
      <CreateRecipeImplWithNoSSR />
    </>
  )
}