import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

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
  const [status, setStatus] = useState([]);

  function showToastStatus(code) {
    switch (code) {
      case '200':
        toast.done(`<p>Status: ${code}</p>Requisição realizada com sucesso!`);
        return;
      case '404':
        toast.error('Falha na requisição! Tenta mais tarde!');
        return;
      default:
        break;
    }
  }

  const params = useLocation();

  const id = params.pathname.substr(6, 7);
  const pathurl = `/users/${id}`;

  useEffect(() => {
    async function loadUser() {
      const response = await api.get(pathurl);
      setUser(response.data);
      setStatus(response.status);
    }
    loadUser();
    showToastStatus(status);
  }, [status, user]);

  function handleSubmit(data) {
    async function saveUser() {
      const response = await api.put(pathurl, { body: data });
      setUser(response.data);
      setStatus(response.status);
    }
    saveUser();
    showToastStatus(status);
  }

  return (
    <Container>
      <Form initialData={user} onSubmit={handleSubmit}>
        <HeaderUser>
          <h1>Formulário de Edição do Usuário: {user.name}</h1>

          <Link to="/">
            <div>
              <FaHome color="#000" size={32} />
              <p>Voltar para Home</p>
            </div>
          </Link>
        </HeaderUser>

        <UserForm>
          <label>Id:</label>
          <Input type="text" name="id" id="id" readOnly />
          <label>Nome Completo:</label>
          <Input type="text" name="name" id="name" />
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
