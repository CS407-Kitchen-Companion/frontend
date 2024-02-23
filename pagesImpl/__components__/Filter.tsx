import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import { searchDataAction, selectFilter } from '@lib/store/searchData/searchData.slice'

export const Filter: React.FC = () => {
  const dispatch = useDispatch()
  const filter = useSelector(selectFilter)

  const handleClickCategory = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  useEffect(() => {
    dispatch(searchDataAction.requestFlowGetFilter())
  }, [dispatch])

  return (
    <FilterWrapper>
      <FilterTitle>Filter By</FilterTitle>
      {Object.entries(filter).map(([key, value]) => (
        <FilterCategory key={key}>
          <FilterContractionWrapper>
            <FilterCategoryTitle>{key}</FilterCategoryTitle>
            <FilterCategoryAddIcon>+</FilterCategoryAddIcon>
          </FilterContractionWrapper>
          <FilterExpansionWrapper></FilterExpansionWrapper>
        </FilterCategory>
      ))}
    </FilterWrapper>
  )
}

const FilterWrapper = styled.div`
  width: 270px;
  max-height: 100%;
  overflow: scroll;
  box-sizing: border-box;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  background-color: #fff;
  color: #343c6a;
  font-family: Inter;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`

const FilterTitle = styled.div`
  padding: 17px 0 13px 20px;
  font-size: 24px;
`

const FilterCategory = styled.div`
  display: flex;
  padding: 17px 17px 17px 34px;
  border: 1px solid #f5f7fa;
`

const FilterContractionWrapper = styled.div`
  display: flex;
  flex-flow: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`

const FilterCategoryTitle = styled.div`
  font-size: 15px;
`

const FilterCategoryAddIcon = styled.div`
  font-size: 24px;
`

const FilterExpansionWrapper = styled.div`
  display: flex;
  flex-flow: column;
  font-weight: 500;
`
