import { Alert, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useFetch } from "../../ui/hooks/UseFetch.hook";
import { User } from "./User.model";
import { API_CONFIG } from "../../api/api.config";

const { ENDPOINTS: { USERS } } = API_CONFIG;

export const UsersList = () => {
  const { data, loading, error } = useFetch({ url: USERS.LIST, page: 1, limit: 10 });

  if (loading) return <Alert severity="info">Loading...</Alert>;
  if (error) return <Alert severity="error">Error: {error}</Alert>;
  if (!data) return <Alert severity="warning">No data found.</Alert>;

  const users = data as User[];

  if (users.length === 0) return <Alert severity="warning">There are no users to display.</Alert>;

  return (
    <div style={{ display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'space-around', margin: '10px', gap: '10px' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
          </TableRow>
        </TableHead>
        
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user._id}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
