import React from 'react';
import { Tooltip } from 'antd';
import { useNavigate } from 'react-router-dom';
import './NavBar.scss';
import { PlusCircleOutlined } from '@ant-design/icons';

function NavBar() {
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <Tooltip title="Добавить заметку">
        <PlusCircleOutlined
          onClick={() => navigate('/add-note')}
          className="navbar_add-button"
        />
      </Tooltip>
    </div>
  );
}

export default NavBar;
