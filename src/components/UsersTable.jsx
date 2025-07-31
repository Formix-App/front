// src/components/UserTable/UserTable.jsx
import React from 'react';
import { UserCircle } from 'lucide-react';

function UsersTable({ users }) {
  return (
    <div className="homePageUserList">
      <h2 className="userListTitle">Our Users</h2>
      <div className="userTableContainer">
        <table className="userTable">
          <thead>
            <tr className="userTableHeaderRow">
              <th className="userTableHeaderCell">Profile</th>
              <th className="userTableHeaderCell">First Name</th>
              <th className="userTableHeaderCell">Last Name</th>
              <th className="userTableHeaderCell">Father's Name</th>
              <th className="userTableHeaderCell">Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="userTableRow">
                <td className="userTableCell userProfileCell">
                  {user.img ? (
                    <img src={user.img} alt={`${user.firstName} ${user.lastName}`} className="userProfileImage" />
                  ) : (
                    <UserCircle size={40} className="userProfilePlaceholderIcon" />
                  )}
                </td>
                <td className="userTableCell">{user.firstName}</td>
                <td className="userTableCell">{user.lastName}</td>
                <td className="userTableCell">{user.fatherName}</td>
                <td className="userTableCell">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UsersTable;