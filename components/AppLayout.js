import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

function AppLayout({ children }) {
  return (
    <div>
      <div>
        <Link href="/">
          <a>Node Bird</a>
        </Link>
        <Link href="/profile">
          <a>Profile</a>
        </Link>
        <Link href="/signup">
          <a>Signup</a>
        </Link>
      </div>
      {children}
    </div>
  );
}

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
