import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

import api from '../../services/api';

import Container from '../../components/Container';
import { UserList, DeleteUser } from './styles';

export default function Main() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get(`/users`);

      setUsers(response.data);
    }

    loadUsers();
  });

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
