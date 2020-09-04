import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import { FaHome, FaCheckSquare } from 'react-icons/fa';

import Container from '../../components/Container';
import api from '../../services/api';
import Input from '../../components/Form/Input';
import { HeaderUser, FooterUser, SubmitButton, UserForm } from './styles';

class User extends Component {
  state = {
    user: [],
  };

  async componenteDidMount() {
    const { params } = this.props.match;

    const response = await api.get(`/users/${params.id}`);

    this.setState({
      user: response,
    });
  }

  render() {
    const { user } = this.state;

    return (
      <Container>
        <Form initialData={user}>
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
            <h2>Localização:</h2>
            <label>Endereço:</label>
            <Input type="text" name="street" id="street" />
            <label>Complemento:</label>
            <Input type="text" name="suite" id="suite" />
            <label>Cidade:</label>
            <Input type="text" name="city" id="city" />
            <label>Cep:</label>
            <Input type="text" name="zipcode" id="zipcode" />
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
}

export default User;
