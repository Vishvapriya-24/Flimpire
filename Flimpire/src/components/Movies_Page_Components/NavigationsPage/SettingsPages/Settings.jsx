// Settings.jsx
import { Outlet } from "react-router-dom";
import SettingsNavBar from "./SettingsNavBar";
import Styles from '../../../../style/Settings.module.css';
import { RxCross2 } from "react-icons/rx";

const Settings = ({ setShowSettings }) => {  // ✅ receive props
  return (
    <div className={Styles.overlay}>
      <div className={Styles.container}>
        <div className={Styles.contents}>
          <div className={Styles.navi}>
            <p>Settings</p>
            <SettingsNavBar />
          </div>

          <div className={Styles.body}>
            <Outlet />
          </div>

          <button
            className={Styles.closeBtn}
            onClick={() => setShowSettings(false)} // ✅ close action
          >
            <RxCross2 />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
