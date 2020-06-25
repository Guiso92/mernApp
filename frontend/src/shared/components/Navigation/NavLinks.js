import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";
import Modal from "../UIElements/Modal";
import Button from "../FormElements/Button";

import "./NavLinks.scss";

const NavLinks = (props) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const auth = useContext(AuthContext);

  const showLogoutModalHandler = () => {
    setShowLogoutModal(true);
  }

  const cancelLogoutHandler = () => {
    setShowLogoutModal(false);
  }

  const confirmLogoutHandler = () => {
    setShowLogoutModal(false);
    auth.logout();
  }

  return (
    <React.Fragment>
      <Modal
        show={showLogoutModal}
        onCancel={cancelLogoutHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelLogoutHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmLogoutHandler}>
              CONFIRM
            </Button>
          </React.Fragment>
        }
      >
        <p>
          Do you want to proceed and logout of the application?
        </p>
      </Modal>
      <ul className="nav-links">
        <li>
          <NavLink to="/" exact>
            ALL USERS
          </NavLink>
        </li>
        {auth.isLoggedIn && (
          <li>
            <NavLink to={`/${auth.userId}/places`}>MY PLACES</NavLink>
          </li>
        )}
        {auth.isLoggedIn && (
          <li>
            <NavLink to="/places/new">ADD PLACE</NavLink>
          </li>
        )}
        {!auth.isLoggedIn && (
          <li>
            <NavLink to="/auth">AUTHENTICATE</NavLink>
          </li>
        )}
        {auth.isLoggedIn && (
          <li>
            <button onClick={showLogoutModalHandler}>LOGOUT</button>
          </li>
        )}
      </ul>
    </React.Fragment>
  );
}

export default NavLinks;
