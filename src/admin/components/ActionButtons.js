import React from 'react';

const ActionButtons = ({
  activeTab,
  selectedAction,
  handleActionClick
}) => {

  let actions = ['add', 'update', 'delete', 'view'];

  if (activeTab === 'attendance') {
    actions = ['view'];
  }

  if (activeTab === 'registrations') {
    actions = ['add', 'view'];
  }

  return (
    <div className="button-group">
      {actions.map((action) => (
        <button
          key={action}
          onClick={() => handleActionClick(action)}
          className={
            selectedAction === action
              ? 'selected'
              : ''
          }
        >
          {action.charAt(0).toUpperCase() +
            action.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default ActionButtons;