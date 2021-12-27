
  
import React from 'react'

import { Main } from './Main'

import { Flex } from '@chakra-ui/react'

export default function Home() {
  return (
    <Flex direction='column' h='100vh'>
      <Main />
    </Flex>
  )
}