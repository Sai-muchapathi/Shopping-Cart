import { useProductContext } from "../App";

export default function Users() {
    const { state } = useProductContext();
    const { users } = state || {}; // Ensure state is not undefined

    return (
        <div className="user-table-container">
            <h2>User Details</h2>
            <table className="user-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Email</th>
                    <th>Username</th>
                    <th>Password</th>
                </tr>
                </thead>
                <tbody>
                {users && users.map(user => ( // Check if users is not undefined
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.email}</td>
                        <td>{user.username}</td>
                        <td>{user.password}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
