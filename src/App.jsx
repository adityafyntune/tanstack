import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import NewQuery from './NewQuery';

function App() {
  const queryClient = useQueryClient();

  // FETCH USERS
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axios.get('https://jsonplaceholder.typicode.com/users');
      return res.data;
    },
  });

  // ADD USER MUTATION
  const addUserMutation = useMutation({
    mutationFn: async (newUser) => {
      const res = await axios.post('https://jsonplaceholder.typicode.com/users', newUser);
      return res.data;
    },
    onSuccess: (data) => {
      console.log('User added:', data);
      // Optionally refetch the users query
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error) => {
      console.error('Error adding user:', error.message);
    },
  });

  // UI States
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>David</h1>
      <ul>
        {data.map((user) => (
          <li key={user.id}>{user.name} - {user.email}</li>
        ))}
      </ul>

      {/* Add User Button (fake) */}
      <button
        onClick={() =>
          addUserMutation.mutate({
            name: 'New User',
            email: 'newuser@example.com',
          })
        }
        disabled={addUserMutation.isLoading}
      >
        {addUserMutation.isLoading ? 'Adding...' : 'Add User ok'}
      </button>

      {addUserMutation.isError && <p style={{ color: 'red' }}>Error: {addUserMutation.error.message}</p>}
      {addUserMutation.isSuccess && <p style={{ color: 'green' }}>User added successfully!</p>}

      <NewQuery />
    </div>
  );
}

export default App;
