async function navigateTo(url){
    try {
        //simulate a loading state
        addLoader();
        //fetch the html content
        const fileName = url + ".html";
        const response = await fetch(`/views/${fileName}`);
        const body = await response.text();
        //add in the body
        renderApp(body);
        //set the header
        await insertHeader();
        await insertFooter();

        removeLoader();
    } catch (e) {
        
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


function goToPreviousPath(){
    const savedPath = localStorage.getItem("last-path");
    if(savedPath){
        navigateTo(savedPath);
    }
}

function hideForNoLoggedIn(){
    const sections = $(".for-logged-in");
    for(const section of sections){
        section.remove();
    }
}

function hideForNonAdmin(){
    const sections = $(".for-admin");
    console.log(sections);
    
    // for(const section of sections){
    //     section.remove();
    // }
}

export {
    navigateTo,
    insertFooter,
    insertHeader,
    hideForNoLoggedIn,
    hideForNonAdmin,
    goToPreviousPath,
    addLoader,
    removeLoader,
    renderApp
}