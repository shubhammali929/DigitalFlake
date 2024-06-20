import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import user from '../assets/user.png';

function Navbar({ isLoggedIn, handleLogout }) {
  const navigate = useNavigate();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const logout = () => {
    handleLogout();
    navigate('/');
    setShowLogoutDialog(false);
  };

  const showConfirmationDialog = () => {
    setShowLogoutDialog(true);
  };

  const hideConfirmationDialog = () => {
    setShowLogoutDialog(false);
  };

  return (
    <div className='navbarMain'>
      <div className="navbarTitle">
        <img className="navbarImgRight" src="https://s3-alpha-sig.figma.com/img/03e2/9685/10d4ea293d7a14946d8bd331c5e5055f?Expires=1719792000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=WxPGFQaC8O-ksq145IG9Ofq6kkRdNQCnnoqEkQB27bu67P4v~IgqWe37R-gbf-A3X4ANUqFmktT3uJsGMaz~nAWra3LngJvyCmSpN06VoUl-9pVwOkgvhcJjYgw3pXVsXLHwiGjCWZ1yaUnqbY31AizHNcFZ-NtsQMwvpeFokGmmEb-lwL112BNz2BpBIPxMztuZagn259UqUwpvN7oBXNj-OJOz931b892h8PEcVJIxd8T8Vnwj6oS5NSfGjSQVa5wtoG3HCJ6azvUMjOFw4kCPnoQob6KKvsZ1VNkJcKtI5MxpkjPbISOaYLEPJ~AyN9fBosr3nFe0C2gawUkEBQ__" alt="" />
      </div>
      <div className="userBtn">
        {isLoggedIn ? (
          <>
            <img
              title="LOGOUT"
              onClick={showConfirmationDialog}
              src={user}
              alt="User Icon"
            />
            {/* Logout Confirmation Dialog */}
            {showLogoutDialog && (
              <div className="logoutConfirmation">
                <p>Are you sure you want to logout?</p>
                <div className="confirmationButtons">
                  <button onClick={logout}>Yes</button>
                  <button onClick={hideConfirmationDialog}>No</button>
                </div>
              </div>
            )}
          </>
        ) : (
          <Link to="/">Login</Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
