import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next';
import Link from 'next/link';

import { FaHome, FaCheckSquare } from 'react-icons/fa';

import { useToast, FormControl, Heading, Flex, Button, SimpleGrid, Icon } from '@chakra-ui/react';
import { userResponse } from '../../utils/types';
import { showToastStatus } from '../../components/Toasty';
import { Input } from '../../components/Form/Input'

import { api } from '../../services/api';

interface UserProps {
  user: userResponse;
}

export default function User({ user }: UserProps) {
  const toast = useToast()
  const router = useRouter();
  

  const [userData, setUserData] = useState<userResponse>(user);

  function handleSubmit(data) {
    async function saveUser() {
      const response = await api.put(`/users/${user.id}`, { body: data });
      setUserData(response.data);
      showToastStatus(response.status, toast);
    }
    saveUser();
  }

    return (
      <Flex direction='column'>
        <Heading mx='20' my='10' py='5' px='10' >
          Formulário de Edição do Usuário: {user?.name}
        </Heading>
        <SimpleGrid bg='white' color='gray.900' mx='20' my='10' py='5' px='10' borderRadius={5}>
          <FormControl onSubmit={handleSubmit}>
            <Link href="/">
              <div>
                <FaHome color="#000" size={32} />
                <p>Voltar para Home</p>
              </div>
            </Link>


            <Input label='id' type="text" name="id" id="id" value={user?.id} />

            <Input label='Nome' type="text" name="name" id="name" value={user?.name} />

            <Input label='Usuário' type="text" name="username" id="username" value={user?.username} />


            <Input label='E-mail' type="email" name="email" id="email" value={user?.email} />

            <Input label='Telefone' type="text" name="phone" id="phone" value={user?.phone} />

            <Input label='Site' type="text" name="website" id="website" value={user?.website} />


            <Input label='Endereço' type="text" name="street" id="street" value={user?.address?.street || ''} />

            <Input label='Complemento' type="text" name="suite" id="suite" value={user?.address?.suite || ''} />

            <Input label='Cidade' type="text" name="city" id="city" value={user?.address?.city || ''} />

            <Input label='Cep' type="text" name="zipcode" id="zipcode" value={user?.address?.zipcode || ''} />

            <Flex justifyContent='space-between' alignContent='center' py='5' color='white'>
              <Button bg='red.400' leftIcon={<Icon as={FaHome} />} _hover={{ bg: 'red.600' }}>
                <Link href="/">
                  <p>Voltar para Home</p>
                </Link>
              </Button>

              <Button bg='green.400' leftIcon={<Icon as={FaCheckSquare} />} _hover={{ bg: 'green.600' }}>
                Salvar
              </Button>
            </Flex>
          </FormControl>
        </SimpleGrid>
      </Flex>
    )
  
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const { id } = params;
  const response = await api.get(`/users/${id}`);
  const user = response.data
  return { 
      props: { user }
  }
}
