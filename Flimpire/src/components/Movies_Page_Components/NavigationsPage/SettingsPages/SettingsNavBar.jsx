import { Link } from "react-router-dom";

const SettingsNavBar = () =>{
    return(
        <div>
            <nav>
                <Link to='/accounts'>Accounts</Link>
            </nav>
        </div>
    )
}

export default SettingsNavBar;