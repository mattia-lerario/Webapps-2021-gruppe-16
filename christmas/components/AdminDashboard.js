//create a dashboard that views all users and their opened slots

const AdminDashboard = (props) => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>All Users</h2>
      <UserList users={props.users} />
    </div>
  )
}
