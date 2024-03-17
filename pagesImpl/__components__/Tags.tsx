import styled from '@emotion/styled'
import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'

//tags for filtering
export const Tags: React.FC<{ items: string[] }> = ({ items }) => {
  return (
    <>
      <TagDiv>
        {items.map((items, index) => (
          <DivTemp>
            <p key={index}>{items}</p>
          </DivTemp>
        ))}
      </TagDiv>
    </>
  )
}

const TagDiv = styled.div`
  display: flex;
  margin: 1em 0 1em 0;
`
const DivTemp = styled.div`
  display: flex;
  padding: 0 2.5em;
  text-align: center;
  border-radius: 50px;
  margin: 0 1em 0 0;
  background: #dcfaf8;
  font-weight: 600;
  font-size: 12px;
`