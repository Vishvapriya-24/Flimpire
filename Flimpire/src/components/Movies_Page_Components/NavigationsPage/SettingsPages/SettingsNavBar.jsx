import { NavLink } from "react-router-dom";
import { FaUser, FaCog, FaEnvelope, FaCalendar, FaUsers } from "react-icons/fa";
import { LuBot } from "react-icons/lu";
import Styles from "../../../../style/Settings.module.css";

const SettingsNavBar = () => {
  return (
    <nav >
      <ul className={Styles.menu}>
        <li>
          <NavLink to="account" className={({ isActive }) => isActive ? Styles.active : ""}>
            <FaUser className={Styles.icon} /> Account
          </NavLink>
        </li>
        <li>
          <NavLink to="general" className={({ isActive }) => isActive ? Styles.active : ""}>
            <FaCog className={Styles.icon} /> General
          </NavLink>
        </li>
        <li>
          <NavLink to="mail" className={({ isActive }) => isActive ? Styles.active : ""}>
            <FaEnvelope className={Styles.icon} /> Mail
          </NavLink>
        </li>
        <li>
          <NavLink to="calendar" className={({ isActive }) => isActive ? Styles.active : ""}>
            <FaCalendar className={Styles.icon} /> Calendar
          </NavLink>
        </li>
        <li>
          <NavLink to="people" className={({ isActive }) => isActive ? Styles.active : ""}>
            <FaUsers className={Styles.icon} /> People
          </NavLink>
        </li>
        <li>
          <NavLink to="copilot" className={({ isActive }) => isActive ? Styles.active : ""}>
            <LuBot className={Styles.icon} /> Copilot
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default SettingsNavBar;
