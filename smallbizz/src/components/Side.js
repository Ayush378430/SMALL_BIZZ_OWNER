import "./Side.css";
import { SidebarData } from "./SidebarData";
// import { auth } from "../firebase";
// import { Button, styled } from "@mui/material";
// const StyledButton=styled(Button)`
// margin-top:20px;
//     margin-Left:60px;
//     background-color:rgba(230,74,105,0.553);
//     &:hover{
//         background-color:rgba(220,20,60,0.796);
//     }
// `;


function Side(){

    return(
        <div className="Sidebar">
        <ul className="Sidebarlist">
            {SidebarData.map((val, key) => {
                return(
                    <li key={key} 
                    className="row"
                    onClick={()=>{window.location.pathname=val.link}}>
                    
                        <div id="icon">{val.icon}</div><div id="title">{val.title}</div>
                    </li>


                )
            })}
            </ul>
            {/* <StyledButton variant = "contained" onClick={()=>auth.signOut()}>Logout</StyledButton> */}
      
        </div>
      

            
    );
}
export default Side;