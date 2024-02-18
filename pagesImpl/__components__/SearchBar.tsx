import React, { useState } from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { useDispatch, useSelector } from 'react-redux'
import { searchDataAction, selectIsKeywordNotEmpty, selectRelatedRecipes } from '@lib/store/searchData/searchData.slice'
import { MagnifyingGlassIcon } from '@pagesImpl/__components__/MagnifyingGlassIcon'
import { FoodIcon } from '@pagesImpl/__components__/FoodIcon'

export const SearchBar: React.FC = () => {
  const dispatch = useDispatch()
  const isKeywordNotEmpty = useSelector(selectIsKeywordNotEmpty)
  // const relatedRecipes = useSelector(selectRelatedRecipes)
  const relatedRecipes = ['recipe 1', 'recipe 2', 'recipe 3', 'recipe 4']

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = event.target.value
    dispatch(searchDataAction.setKeyword({ keyword }))
    dispatch(searchDataAction.beginFlowRelatedRecepies())
    console.log('Input value:', event.target.value)
  }

  const handleInputSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch(searchDataAction.beginFlowSubmitSearch())
    console.log('submit')
  }

  const handleRecipeClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    const keyword = event.currentTarget.textContent ?? ''
    dispatch(searchDataAction.setKeyword({ keyword }))
    dispatch(searchDataAction.beginFlowSubmitSearch())
    console.log('click recipe')
  }
  return (
    <SearchbarWrapper>
      <SearchForm onSubmit={handleInputSubmit}>
        <MagnifyingGlassIconWrapper>
          <MagnifyingGlassIcon />
        </MagnifyingGlassIconWrapper>
        <Searchbar placeholder={'Find a recipe, get cooking!'} onChange={handleInputChange} />
        <RelatedRecipes isKeywordNotEmpty={isKeywordNotEmpty}>
          {relatedRecipes.map((item, i) => (
            <RelatedRecipe isFirst={i == 0} onClick={handleRecipeClick}>
              <FoodIconWrapper isFirst={i == 0}>
                <FoodIcon />
              </FoodIconWrapper>
              {item}
            </RelatedRecipe>
          ))}
        </RelatedRecipes>
      </SearchForm>
    </SearchbarWrapper>
  )
}

const SearchbarWrapper = styled.div``

const SearchForm = styled.form`
  display: flex;
  position: relative;
`

const Searchbar = styled.input`
  box-sizing: border-box;
  padding: 20px 67px;
  min-width: 550px;
  border-radius: 100px;
  border: none;
  background: #f5f7fa;
  color: #718ebf;
  font-family: Inter;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  ::placeholder {
    color: inherit;
    font-family: inherit;
    font-size: inherit;
    font-style: inherit;
    font-weight: inherit;
    line-height: inherit;
  }
`

const MagnifyingGlassIconWrapper = styled.div`
  position: absolute;
  top: calc(50% - 10px);
  left: 30px;
`

const RelatedRecipes = styled.div<{ isKeywordNotEmpty: boolean }>`
  ${({ isKeywordNotEmpty }) => css`
    ${isKeywordNotEmpty
      ? css`
          visibility: visible;
          opacity: 1;
        `
      : css`
          visibility: hidden;
          opacity: 0;
        `}
    position: absolute;
    top: 100%;
    right: 0px;
    box-sizing: border-box;
    width: 100%;
    display: flex;
    flex-flow: column;
    flex-shrink: 0;
    border-radius: 25px;
    border: 3px solid #fff;
    background: #f5f7fa;
    transition:
      visibility 0s,
      opacity 0.5s ease;
  `}
`

const RelatedRecipe = styled.div<{ isFirst: boolean }>`
  ${({ isFirst }) => css`
    position: relative;
    padding: ${isFirst ? '10px' : 0} 20px 10px 42px;
    display: flex;
    flex-flow: row;
    font-family: Inter;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  `}
`

const FoodIconWrapper = styled.div<{ isFirst: boolean }>`
  ${({ isFirst }) => css`
    position: absolute;
    top: calc(50% - ${isFirst ? 9 : 14}px);
    width: 18px;
    height: 18px;
    left: 14px;
  `}
`
