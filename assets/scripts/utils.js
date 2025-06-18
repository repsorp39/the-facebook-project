import { isAdmin,isAuthenticated } from "./auth.js";
async function navigateTo(url){
    try {
        //simulate a loading state
        addLoader();

        //check if it is a private page
        if(url.includes("admin")){
            if(!isAdmin()) navigateTo("login");
            return;
        }

        if(url.includes("logged")){
            if(!isAuthenticated()) navigateTo("login");
            return;
        }

        //fetch the html content
        const fileName = `${ url.startsWith("/") ? url.slice(1,) : url}.html`;
        
        const response = await fetch(`/views/${fileName}`);
        const body = await response.text();

        //add in the body
        renderApp(body);

        //set the header
        await insertHeader();
        await insertFooter();

        //remove private parts
        if(!isAuthenticated()) hideLoggedInUsersParts();
        else hideNoLoggedUsersParts();
        if(!isAdmin())  hideAdminParts();

        //change the value of the url in the url bar
        const currentPath = fileName.replace(/.html/,'');
        window.history.replaceState(null,null, `/${currentPath}`);
        sessionStorage.setItem('prev-path',currentPath);
        console.log('++');
        
        //end of loading state
        removeLoader();
    } catch (e) {
        console.log(e);
    }

}

function addLoader(){
    $("#loader-overlay").removeClass("d-none");
}

function removeLoader(){
    $("#loader-overlay").addClass("d-none");
}

function renderApp(content){
    $("#my-app").html(content);
}

async function insertHeader(){
    const response = await fetch(`/views/header.html`);
    const content = await response.text();
    $("header").html(content);
}

async function insertFooter(){
    const response = await fetch(`/views/footer.html`);
    const content = await response.text();
    $("footer").html(content);
}


function handleReload(){
    const currentPath = sessionStorage.getItem('prev-path') ?? "/";
    if(currentPath != "/") navigateTo(currentPath);
    return;
}

function hideLoggedInUsersParts(){
    $(".for-logged-in").remove();
}

function hideAdminParts(){
   $(".for-admin").remove();
}

function hideNoLoggedUsersParts(){
    $(".for-nologged").remove();
}

export {
    navigateTo,
    insertFooter,
    insertHeader,
    hideNoLoggedUsersParts,
    hideAdminParts,
    hideLoggedInUsersParts,
    handleReload,
    addLoader,
    removeLoader,
    renderApp
}

window.navigateTo = navigateTo;