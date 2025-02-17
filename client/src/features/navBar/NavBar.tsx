import React from 'react';
import { Tooltip } from 'antd';
import { useNavigate } from 'react-router-dom';
import './NavBar.scss';
import { HomeOutlined, PlusCircleOutlined } from '@ant-design/icons';

function NavBar() {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <Tooltip title="К Категориям">
        <HomeOutlined onClick={() => navigate('/')} className="navbar_button" />
      </Tooltip>
      <Tooltip title="Добавить заметку">
        <PlusCircleOutlined
          onClick={() => navigate('/new-note')}
          className="navbar_button"
        />
      </Tooltip>
    </div>
  );
}

export default NavBar;
