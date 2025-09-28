import { Outlet } from "react-router-dom";
import SettingsNavBar from "./SettingsNavBar";
const Settings =  ({setShowSettings}) =>{
    const Styles = {
        overlay:{
            position:'fixed',
            top:0,
            right:0,
            width:"100vw",
            height:"100vh",
            backgroundColor:"rgba(0,0,0,0.6)",
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            zIndex:100,
        },
        container:{
            backgroundColor:"#fff",
            borderRadius:"12px",
            padding:"30px",
            width:"820px",
            maxWidth:'90%',
            boxShadow:"0 5px 20px rgba(0,0,0,0.2)"
        },
        contents:{
            display:"grid",
            gridTemplateColums:"100px 1fr"
        }
    }

    return(
        <div style={Styles.overlay} className="overlay" >
            <div style={Styles.container}>
                <div style={Styles.contents}>
                    <p>Settings</p>
                    <div>
                        <SettingsNavBar />
                    </div>

                    <div>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )


}

export default Settings;