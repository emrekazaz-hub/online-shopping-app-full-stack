import React, { useState } from 'react';

const LoginListener = () => {
  const [isRightPanelActive, setRightPanelActive] = useState(false);

  const handleSignUpClick = () => {
    setRightPanelActive(true);
  };

  const handleSignInClick = () => {
    setRightPanelActive(false);
  };

  return (
    <div>
      {/* ... your existing JSX code */}
    </div>
  );
};

export default LoginListener;
