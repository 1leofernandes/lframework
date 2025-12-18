import { Outlet } from 'react-router-dom';
import '../styles/AuthLayout.css';
import lsportsIcon from '../assets/images/lsports-icon.png';

const AuthLayout = () => {
  return (
    <div className="auth-layout">
      <div className="auth-container">
        {/* <img src={lsportsIcon} alt="" /> */}
        <div className="auth-header">
            <img src={lsportsIcon} alt="" className='lsportsicon'/>
          {/* <h1 className='lsframework'>LS Framework</h1> */}
          {/* <p>Authentication</p> */}
        </div>
        <div className="auth-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
