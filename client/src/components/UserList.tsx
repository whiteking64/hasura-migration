import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_USERS = gql`
  query GetUsers {
    User {
      id
      name
      email
    }
  }
`;

interface User {
  id: number;
  name: string;
  email: string;
}

const UserList: React.FC = () => {
  const { loading, error, data } = useQuery<{ User: User[] }>(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Users</h2>
      {data?.User.map(user => (
        <div key={user.id}>
          <p>{user.name}: {user.email}</p>
        </div>
      ))}
    </div>
  );
};

export default UserList;
