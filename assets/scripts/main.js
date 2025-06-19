import { handleReload, navigateTo } from  "./utils.js";
import "./jquery.js";

document.addEventListener("DOMContentLoaded",()=>{
    //check if it is a reload statement
    const currentPath = sessionStorage.getItem('prev-path') ?? "/";
    console.log(currentPath,window.location.pathname);
    
    if(currentPath === window.location.pathname){
         navigateTo(currentPath);
         return;
    }

    navigateTo("home");
})
