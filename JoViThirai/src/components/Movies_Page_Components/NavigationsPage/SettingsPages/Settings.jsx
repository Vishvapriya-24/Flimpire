// Settings.jsx
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import SettingsNavBar from "./SettingsNavBar";
import Styles from '../../../../style/Settings.module.css';
import { RxCross2 } from "react-icons/rx";

const Settings = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClose = () => {
    const from = location.state?.from; // 👈 where the user came from
    console.log(from);
    if (from) {
      navigate(from); // ✅ go back to that page
    } else {
      navigate(-1); // fallback (if user refreshed)
    }
  };

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
            onClick={handleClose}
          >
            <RxCross2 />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
