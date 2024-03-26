import styled from '@emotion/styled'
import React, { useState, useEffect } from 'react';
import { PageImplView } from '@pagesImpl/__components__/PageImplView';

import bgimage from "../../public/fruitToast.avif";

import { useDispatch, useSelector } from 'react-redux'

import { verifyDataAction, selectStatus } from '@lib/store/verify/verify.slice'

interface PostIdImplProps { //make sure postId is a string
    uid: string | null;
    token: string | null;
  }

const  VerifyImpl: React.FC<PostIdImplProps> = ({ uid, token }) =>  {
  return (
    <PageImplView>
      <LoginBackgroundWrapper>
        <LoginLeftImage/>
        <LoginRightWrapper>
          <Buf></Buf>
          <LoginFormWrapper>
            <h1>Kitchen Companion</h1>
            
            <VerifyStatus token = {token} uid= {uid}></VerifyStatus>
            
          </LoginFormWrapper>
        </LoginRightWrapper>
      </LoginBackgroundWrapper>
    </PageImplView>
  )
}
export default VerifyImpl

const VerifyStatus: React.FC<PostIdImplProps> = (blob) => {
  const [id, setId] = useState(blob.uid ? blob.uid : '');
  const [token, setToken] = useState(blob.token ? blob.token : '');
  const status = useSelector(selectStatus)
  const [statusMsg, setStatus] = useState('')
  const dispatch = useDispatch();

  

  useEffect(() => {
    
    if(id === '' || token === ''){
        //console.log(id + token)
    } else {
        dispatch(verifyDataAction.setId({id}))
        dispatch(verifyDataAction.setToken({token}))
        dispatch(verifyDataAction.requestFlowVerifyEmail())
        setStatus(status)
    }   
  }
  )

  return (
    <div>
    <div>
    <p>{status}</p>

    </div>
    
   
    </div>
  );
};

const LoginLeftImage = () => {
  
  return(
    <div style={{
      backgroundImage: `url(${bgimage.src})`,
      backgroundSize: 'cover',
      width: '55%',
      height: '100%',
      float: 'left'
    }}>
    </div>
  );
}

const LoginBackgroundWrapper = styled.div`
  width: 100vw;
  height: 100vh;
`

const LoginRightWrapper = styled.div`
  background: #f5f7fa;
  background-size: auto;
  margin-left: 55%;
  height: 80vh;
`
const Buf = styled.div`
  background: #f5f7fa;
  background-size: auto;
  height: 20vh;
`
const LoginFormWrapper = styled.div`
  background: #f5f7fa;
  background-size: auto;
  height: 100vh;
  text-align: center;
`
