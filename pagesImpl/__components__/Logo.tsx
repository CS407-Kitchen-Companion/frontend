import styled from '@emotion/styled'
import Link from 'next/link'

export const Logo: React.FC = () => {
  return (
    <LogoWrapper>
      <Link href="/" passHref>
        Kitchen
        <br />
        Companion
      </Link>
    </LogoWrapper>
  )
}

const LogoWrapper = styled.div`
  color: #343c6a;
  font-family: 'Public Sans';
  font-size: 32px;
  font-style: normal;
  font-weight: 900;
  line-height: normal;

  a {
    text-decoration: none;
    color: inherit;
    cursor: auto;
  }

  a:hover,
  a:focus {
    text-decoration: none;
    color: inherit;
    cursor: auto;
  }
`
