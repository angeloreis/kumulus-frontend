import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

import api from '../../services/api';

//import * as UserActions from '../../store/modules/user/actions';

import Container from '../../components/Container';
import { UserList, DeleteUser } from './styles';

class Main extends Component {
  state = {
    users: [],
  };

  async componentDidMount() {
    const response = await api.get(`/users`);

    this.setState({
      users: response.data,
    });
  }

  render() {
    const { users } = this.state;
    return (
      <Container>
        <h1>
          <FaUserCircle />
          Usuários
        </h1>
        <UserList>
          {users.map((user) => (
            <li key={String(user.id)}>
              <p>{user.name}</p>
              <div>
                <Link to={`/user/${String(user.id)}`}>Detalhes</Link>
                <DeleteUser>
                  <button>Deletar</button>
                </DeleteUser>
              </div>
            </li>
          ))}
        </UserList>
      </Container>
    );
  }
}

export default connect()(Main);
