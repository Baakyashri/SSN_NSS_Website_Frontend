import React from 'react';

const MembersTab = ({
  selectedAction,
  formData,
  handleChange,
  membersList,
  handleAddUser,
  handleUpdateUser,
  handleDeleteUser
}) => {
  switch (selectedAction) {
    case 'add':
      return (
        <form
          className="form-card"
          onSubmit={(e) => handleAddUser(e)}
        >
          <h3>Add Member</h3>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email || ""}
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password || ""}
            onChange={handleChange}
            required
          />
          <input
            name="role"
            type="text"
            placeholder="Role"
            value={formData.role || ""}
            onChange={handleChange}
            required
          />
          <button type="submit">Add</button>
        </form>
      );

    case 'delete':
      return (
        <form
          className="form-card"
          onSubmit={(e) => handleDeleteUser(e)}
        >
          <h3>Delete Member</h3>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email || ""}
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password || ""}
            onChange={handleChange}
            required
          />
          <button type="submit">Delete</button>
        </form>
      );

    case 'update':
      return (
        <form
          className="form-card"
          onSubmit={(e) => handleUpdateUser(e)}
        >
          <h3>Update Member</h3>
          <input
            name="existingEmail"
            type="email"
            placeholder="Existing Email"
            value={formData.existingEmail || ""}
            onChange={handleChange}
            required
          />
          <input
            name="existingPassword"
            type="password"
            placeholder="Existing Password"
            value={formData.existingPassword || ""}
            onChange={handleChange}
            required
          />
          <input
            name="existingRole"
            type="text"
            placeholder="Existing Role"
            value={formData.existingRole || ""}
            onChange={handleChange}
            required
          />
          <input
            name="newEmail"
            type="email"
            placeholder="New Email"
            value={formData.newEmail || ""}
            onChange={handleChange}
            required
          />
          <input
            name="newPassword"
            type="password"
            placeholder="New Password"
            value={formData.newPassword || ""}
            onChange={handleChange}
            required
          />
          <input
            name="newRole"
            type="text"
            placeholder="New Role"
            value={formData.newRole || ""}
            onChange={handleChange}
            required
          />
          <button type="submit">Update</button>
        </form>
      );

    case 'view':
      return (
        <div className="form-card">
          <h3>Members List</h3>
          <table>
            <thead>
              <tr>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {membersList.map((user, index) => (
                <tr key={index}>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    default:
      return <p className="placeholder-text">Select an action to proceed.</p>;
  }
};

export default MembersTab;
