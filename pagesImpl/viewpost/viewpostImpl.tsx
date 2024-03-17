import styled from '@emotion/styled'
import { useSelector } from 'react-redux'
import { selectSearchedResults } from '@lib/store/searchData/searchData.slice'
import { Filter } from '@pagesImpl/__components__/Filter'
import { Header } from '@pagesImpl/__components__/Header'
import { PageImplView } from '@pagesImpl/__components__/PageImplView'
import { useRouter } from 'next/router'
import Custom404 from '@pages/404'; // Import your custom 404 page


//all viewing posts of recipes are routed to /viewpost/[postID]
//implementation for each page 
export default function viewpostImpl() {
  const router = useRouter()
  
  return (
    <>
    <Custom404/>
    </>
  )
}
