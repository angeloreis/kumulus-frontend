import React, { useEffect, useState } from 'react'
import { GetStaticProps } from 'next';

import { Button, Divider, Flex, Heading, Icon, Link, List, ListItem, Text, useToast } from '@chakra-ui/react'
import { FaTrash } from 'react-icons/fa'
import { userResponse } from '../utils/types';
import { api } from '../services/api';
import { showToastStatus } from '../components/Toasty';

interface HomeProps {
  users: userResponse[]
}

export default function Home({ users }: HomeProps) {
  const toast = useToast();
  const [usersData, setUsersData] = useState<userResponse[]>([] as userResponse[]);

  useEffect(() => setUsersData(users),[users])

  async function handleDeleteUser(id) {
    const response = await api.delete(`/users/${id}`);
    const { status } = response
    const newUsers = [ ...usersData ]
    const index = newUsers.map(item => item.id).indexOf(id)
    if (index > -1) {
      newUsers.splice(index, 1)
    }
    setUsersData(newUsers);
    showToastStatus(status, toast);
  }

  return (
    <Flex direction='column' h='100vh'>
      <title>Lista de usuários</title>
      <Flex
    direction='column'
    bg='white'
    mx='auto'
    py='10'
    px='10'
    mt='10'
    mb='5'
    borderRadius={5}
    maxW={1120}
    width='100%'
    color='gray.800'>
      
      <Heading>Lista de Usuários</Heading>
      <List>
        {usersData?.map((user) => (
          <ListItem key={String(user.id)} justifyContent='space-between' pt='2'>
            <Flex alignItems='center' alignContent='space-between' justify='space-between'>
              <Text fontSize='2xl'>{user.name}</Text>
              <div>
                <Link href={`/form/${String(user.id)}`} pr='5'>Detalhes</Link>
                <Button
                 bg='red.400'
                 color='white'
                 _hover={{
                   cursor: 'pointer',
                   bg: 'red.600',
                   color: 'white'
                   }}
                   rightIcon={<Icon as={FaTrash}/>} onClick={()=> handleDeleteUser(user.id)}>
                  Deletar
                </Button>
              </div>
            </Flex>            
            <Divider py='2'/>
          </ListItem>
        ))}
      </List>
    </Flex>
    </Flex>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await api.get(`/users`);
  const { data } = response;
  const users = data;    
  return {
    props: { users }
  }
}