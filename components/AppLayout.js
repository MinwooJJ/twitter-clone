import React from "react";
import PropTypes from "prop-types";

function AppLayout({ children }) {
  return (
    <div>
      <div>공통 메뉴</div>
      {children}
    </div>
  );
}

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
