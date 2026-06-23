import React from 'react';

const ActionButtons = ({ selectedAction, handleActionClick }) => {
  return (
    <div className="button-group">
      {['add', 'update', 'delete', 'view'].map((action) => (
        <button
          key={action}
          onClick={() => handleActionClick(action)}
          className={selectedAction === action ? 'selected' : ''}
        >
          {action.charAt(0).toUpperCase() + action.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default ActionButtons;
