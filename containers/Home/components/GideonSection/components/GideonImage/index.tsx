import React from 'react'
import styled from 'styled-components'
import Thunder from './components/Thunder'
import Oval from './components/Oval'
import Triangle from './components/Triangle'
import { motion } from 'framer-motion'
const Image = styled.img`
  max-width: 100vw;
`
const Container = styled.div`
  position: relative;
  width: max-content;
  margin: 0 auto;
`

const Wrapper = styled(motion.div)`
  position: absolute;
`
export const GideonImage: React.FC = () => {
  return (
    <Container>
      <Image src="images/gideon-preview.png" />
      <IconWrapper bottom={0} left="50%">
        <Thunder color="#7CD55E" />
      </IconWrapper>
      <IconWrapper top={'10%'} left="54%" size="2em">
        <Oval color="#00C1FF" />
      </IconWrapper>
      <IconWrapper top={'40%'} left="82.5%" size="1.8em">
        <Oval color="#00C1FF" />
      </IconWrapper>
      <IconWrapper bottom={0} left="90%">
        <Triangle color="#FF7278" />
      </IconWrapper>
      <IconWrapper bottom={'10%'} left="17.5%" size="1.2em">
        <Oval color="#FF7278" />
      </IconWrapper>
      <IconWrapper top={'5%'} left="5%" size="3.5em">
        <Oval color="#FF7278" />
      </IconWrapper>
    </Container>
  )
}

type Position = {
  left?: number | string
  right?: number | string
  bottom?: number | string
  top?: number | string
  size?: string
}
const IconWrapper: React.FC<Position> = ({ children, size = '4em', ...position }) => (
  <Wrapper
    initial={{ ...position, fontSize: size }}
    animate={{ rotate: [0, -30, 30, 0] }}
    transition={{
      type: 'spring',
      duration: 1,
      stiffness: 2000,
      delay: 1
    }}
  >
    {children}
  </Wrapper>
)
