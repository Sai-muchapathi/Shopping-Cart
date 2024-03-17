import '../AdminComponent.css';

const AdminDashboard = ({ numUsers, numProducts, totalSales }) => {
    return (
        <div className="admin-dashboard">
            <div className="dashboard-box">
                <h2>Users</h2>
                <p>{numUsers}</p>
            </div>
            <div className="dashboard-box">
                <h2>Products</h2>
                <p>{numProducts}</p>
            </div>
            <div className="dashboard-box">
                <h2>Sales</h2>
                <p>{totalSales}</p>
            </div>
        </div>
    );
}

export default AdminDashboard;
