import React, { useState, useEffect } from 'react';

import { FaTrash } from 'react-icons/fa';

import { useToast, Link, Button, Divider, Flex, Heading, List, ListItem, Text, Icon } from '@chakra-ui/react';
import { userResponse } from '../../utils/types';
import { showToastStatus } from '../../components/Toasty';
import { api } from '../../services/api';

export function Main() {
  const toast = useToast();
  const [users, setUsers] = useState<userResponse[]>([] as userResponse[]);

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get(`/users`);
      const { data } = response;
      setUsers(data);
      showToastStatus(response.status, toast)
    }

    loadUsers();    
  }, []);

   async function handleDeleteUser(id) {
     const response = await api.delete(`/users/${id}`);
     const { status } = response
     const newUsers = [ ...users ]
     const index = newUsers.map(item => item.id).indexOf(id)
     if (index > -1) {
       newUsers.splice(index, 1)
     }
     setUsers(newUsers);
     showToastStatus(status, toast);
   }

  return (
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
      
      <Heading >Lista de Usuários</Heading>
      <List >
        {users.map((user) => (
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
  );
}
