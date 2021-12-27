import React, { useState, useEffect, FormEvent } from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';

import { FaHome, FaCheckSquare } from 'react-icons/fa';

import { useToast, Heading, Flex, Button, SimpleGrid, Icon } from '@chakra-ui/react';
import { userResponse } from '../../utils/types';
import { showToastStatus } from '../../components/Toasty';
import { Input } from '../../components/Form/Input'

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup'

import { api } from '../../services/api';
import { useForm } from 'react-hook-form';
import { Console } from 'console';

interface UserProps {
  user: userResponse;
}

export default function User({ user }: UserProps) {
  const toast = useToast()
  const [userData, setUserData] = useState<userResponse>({} as userResponse);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    username: Yup.string().required('userName is required'),
    email: Yup.string().required('Email required'),
  })

  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, reset, formState } = useForm(formOptions)
  const { errors } = formState

  function onSubmit(event) {
    async function saveUser() {
      const response = await api.put(`/users/${userData.id}`, { body: userData });
      setUserData(response.data);
      showToastStatus(response.status, toast);
    }
    saveUser();
    event.preventDefault();
  }

  const onChangeValueField = (event: FormEvent<HTMLInputElement>) => {
    const { currentTarget } = event;
    const { id: key, value } = currentTarget
    const newUserData = {...userData}
    newUserData[key] = value
    setUserData(newUserData)
    console.log('onChangeValueField',userData)
  }

  const onChangeValueFieldAddress = (event: FormEvent<HTMLInputElement>) => {
    const { currentTarget } = event;
    const { id: key, value } = currentTarget
    const newUserData = { ...userData }
    newUserData.address[key] = value;
    setUserData(newUserData)
    console.log('onChangeValueFieldAddress', userData)
  }

  useEffect(() => setUserData(user), [user]);


  return (
    <Flex direction='column'>
      <Heading mx='20' my='10' py='5' px='10' >
        Formulário de Edição do Usuário: {userData?.name}
      </Heading>
      <SimpleGrid bg='white' color='gray.900' mx='20' my='10' py='5' px='10' borderRadius={5}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input label='id' type="text" name="id" id="id" value={userData.id} onChange={onChangeValueField} />
          <Input label='Nome' type="text" name="name" id="name" value={userData.name} onChange={onChangeValueField} />
          <Input label='Usuário' type="text" name="username" id="username" value={userData.username} onChange={onChangeValueField} />

          <Input label='E-mail' type="email" name="email" id="email" value={userData.email} onChange={onChangeValueField} />
          <Input label='Telefone' type="text" name="phone" id="phone" value={userData.phone} onChange={onChangeValueField} />
          <Input label='Site' type="text" name="website" id="website" value={userData.website} onChange={onChangeValueField} />

          <Input label='Endereço' type="text" name="street" id="street" value={userData.address?.street || ''} onChange={onChangeValueFieldAddress} />
          <Input label='Complemento' type="text" name="suite" id="suite" value={userData.address?.suite || ''} onChange={onChangeValueFieldAddress} />
          <Input label='Cidade' type="text" name="city" id="city" value={userData.address?.city || ''} onChange={onChangeValueFieldAddress} />
          <Input label='Cep' type="text" name="zipcode" id="zipcode" value={userData.address?.zipcode || ''} onChange={onChangeValueFieldAddress} />

          <Flex justifyContent='space-between' alignContent='center' py='5' color='white'>
            <Button bg='red.400' leftIcon={<Icon as={FaHome} />} _hover={{ bg: 'red.600' }}>
              <Link href="/">
                <p>Voltar para Home</p>
              </Link>
            </Button>

            <Button bg='green.400' leftIcon={<Icon as={FaCheckSquare} />} _hover={{ bg: 'green.600' }} type='submit'>
              Salvar
            </Button>
          </Flex>
        </form>
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
