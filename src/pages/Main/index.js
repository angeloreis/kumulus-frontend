import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

import api from '../../services/api';

import Container from '../../components/Container';
import { UserList, DeleteUser } from './styles';

export default function Main() {
  const [users, setUsers] = useState([]);
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

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get(`/users`);

      setStatus(response.status);

      setUsers(response.data);
    }

    loadUsers();
    showToastStatus(status);
  }, [status, users]);

  // function handleDeleteUser(id) {
  //   async function deleteUser() {
  //     const response = await api.get(`/users`);
  //     setStatus(response.status);
  //   }
  //   showToastStatus(status);
  // }

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
