import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import { Scope } from '@unform/core';
import { FaHome, FaCheckSquare } from 'react-icons/fa';

import Container from '../../components/Container';
import api from '../../services/api';
import Input from '../../components/Form/Input';
import { HeaderUser, FooterUser, SubmitButton, UserForm } from './styles';

export default function User() {
  const [user, setUser] = useState([]);

  const params = useLocation();

  const id = params.pathname.substr(6, 7);

  useEffect(() => {
    async function loadUser() {
      const response = await api.get(`/users/${id}`);
      setUser(response.data);
    }
    loadUser();
  }, []);

  function handleSubmit(data) {
    async function saveUser() {
      const response = await api.put(`/users/${id}`, { body: data });

      console.log(response);

      setUser(response.data);
    }
    saveUser();
  }

  return (
    <Container>
      <Form initialData={user} onSubmit={handleSubmit}>
        <HeaderUser>
          <h1>Formulário de Edição do Usuário</h1>

          <Link to="/">
            <div>
              <FaHome color="#000" size={32} />
              <p>Voltar para Home</p>
            </div>
          </Link>
        </HeaderUser>

        <UserForm>
          <label>Login:</label>
          <Input type="text" name="username" id="username" />
          <label>E-mail:</label>
          <Input type="email" name="email" id="email" />
          <label>Telefone:</label>
          <Input type="text" name="phone" id="phone" />
          <label>Site:</label>
          <Input type="text" name="website" id="website" />

          <hr />
          <Scope path="address">
            <h2>Localização:</h2>
            <label>Endereço:</label>
            <Input type="text" name="street" id="street" />
            <label>Complemento:</label>
            <Input type="text" name="suite" id="suite" />
            <label>Cidade:</label>
            <Input type="text" name="city" id="city" />
            <label>Cep:</label>
            <Input type="text" name="zipcode" id="zipcode" />
          </Scope>
          <hr />

          <FooterUser>
            <SubmitButton>
              <FaCheckSquare color="#fff" size="14" /> Salvar
            </SubmitButton>
            <Link to="/">
              <div>
                <FaHome color="#000" size={32} />
                <p>Voltar para Home</p>
              </div>
            </Link>
          </FooterUser>
        </UserForm>
      </Form>
    </Container>
  );
}
