import styled from '@emotion/styled'
import { SelectAllRounded } from '@mui/icons-material';
import React, { useState, useEffect, useRef } from 'react'

//container for buttons in lower right corner (sub blue)
export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  font-family: 'Inter';
`;

//secondary
export const SubButton = styled.button`
  display: inline-block; 
  padding: 10px 20px;
  border-radius: 25px;
  font-family: Inter;
  font-size: inherit;
  font-style: inherit;
  font-weight: inherit;
  line-height: inherit;
  font-weight: 600;
  color: #343C6A; /* Text color */

  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: background-color 0.1s ease;

  &:hover {
    background-color: #e4e9f2; /* Background color on hover */
  }
  &:active {
    background-color: #d3dce9; /* Background color when clicked */
  }
`;

//primary button
export const BlueButton = styled.button`
  display: inline-block; 
  padding: 10px 20px;
  border-radius: 25px;
  font-family: Inter;
  font-size: inherit;
  font-style: inherit;
  font-weight: inherit;
  line-height: inherit;
  font-weight: 600;
  color: #fff; /* Text color */

  background-color: #1814f3;
  border: none;
  cursor: pointer;
  transition: background-color 0.1s ease;

  &:hover {
    background-color: #0f0ce2; /* Background color on hover */
  }
  &:active {
    background-color: #0c09b1; /* Background color when clicked */
  }
`;

