import { NavLink, useLocation } from "react-router-dom";
import { FaUser, FaCog, FaEnvelope, FaCalendar, FaUsers } from "react-icons/fa";
import { LuBot } from "react-icons/lu";
import Styles from "../../../../style/Settings.module.css";

const SettingsNavBar = () => {
  const location = useLocation();

  return (
    <nav>
      <ul className={Styles.menu}>
        <li>
          <NavLink
            to="account"
            state={location.state} // ✅ preserve previous page info
            className={({ isActive }) => (isActive ? Styles.active : "")}
          >
            <FaUser className={Styles.icon} /> Account
          </NavLink>
        </li>
        <li>
          <NavLink
            to="general"
            state={location.state}
            className={({ isActive }) => (isActive ? Styles.active : "")}
          >
            <FaCog className={Styles.icon} /> General
          </NavLink>
        </li>
        <li>
          <NavLink
            to="mail"
            state={location.state}
            className={({ isActive }) => (isActive ? Styles.active : "")}
          >
            <FaEnvelope className={Styles.icon} /> Mail
          </NavLink>
        </li>
        <li>
          <NavLink
            to="calendar"
            state={location.state}
            className={({ isActive }) => (isActive ? Styles.active : "")}
          >
            <FaCalendar className={Styles.icon} /> Calendar
          </NavLink>
        </li>
        <li>
          <NavLink
            to="people"
            state={location.state}
            className={({ isActive }) => (isActive ? Styles.active : "")}
          >
            <FaUsers className={Styles.icon} /> People
          </NavLink>
        </li>
        <li>
          <NavLink
            to="copilot"
            state={location.state}
            className={({ isActive }) => (isActive ? Styles.active : "")}
          >
            <LuBot className={Styles.icon} /> Copilot
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default SettingsNavBar;
