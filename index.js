const PAGE_STATE = {
    HOME: "HOME",
    PROJECTS: "PROJECTS"
}

let pageState = PAGE_STATE.HOME;
let pageContent = document.getElementById("pagecontent");

let main = function(){
    document.body.append(pageContent)
    ActivateTab(pageState);
    CreateHomePage();
}

let ActivateTab = function(target){
    document.getElementById(target).className = "activetab";
    pageState = target;
}

let DisableTab = function(target){
    document.getElementById(target).className = "navtab";
}

// --------------------------------------------------------------------------------------------

let CollapsingUnload = function(element){
    while (element.firstChild) {
        CollapsingUnload(element.lastChild);
        element.removeChild(element.lastChild);
    }
}

let UnloadPage = function(){
    CollapsingUnload(pageContent);
}

let CreateHomePage = function (){
    let body = document.createElement("a");
    let card = document.createElement("a");
    let image = document.createElement("img");
    let title = document.createElement("h1");
    let text = document.createElement("div");

    body.className = "aboutbody";

    card.className = "aboutcard"

    image.src = "media/bodypic.png";
    image.id = "bodypic";
    title.style = "text-align: center;";
    title.textContent = "Who Am I?";
    
    // Add File Reader eventually
    text.textContent = "";

    card.append(image);
    card.append(title);
    card.append(text);
    body.append(card);

    pageContent.append(body);
}

let CreateCard = function(pageBody, cardJSON){
    let card = document.createElement("a");
    
    card.className = "projectcard";
    card.href = cardJSON.site;
    card.target = "_blank";


    let cardArt = document.createElement("img");
    let platformIcon = document.createElement("img");
    let artSpot = document.createElement("a");

    artSpot.className = "artspot";

    platformIcon.className = "platformicon";
    platformIcon.src = cardJSON.platform;

    cardArt.className = "projectart";
    cardArt.src = cardJSON.art

    artSpot.append(cardArt);
    artSpot.append(platformIcon);

    card.append(artSpot);


    let cardText = document.createElement("a");

    cardText.className = "projectcardtext";

    let textTitle = document.createElement("div");
    textTitle.id = "title";
    textTitle.textContent = cardJSON.title;

    let genre = document.createElement("div");
    genre.id = "genre";
    genre.textContent = cardJSON.genre;

    let description = document.createElement("div");
    description.id = "description";
    description.textContent = cardJSON.description;

    cardText.append(textTitle);
    cardText.append(genre);
    cardText.append(description);


    card.append(cardText);

    pageBody.append(card);
}

let CreateProjectPage = function (){
    let body = document.createElement("a");

    body.className = "projectbody";

    fetch("projects.json").then(response => response.json())
    .then(json => 
        {
            for(let index = 0; index < json.length; index++) {
                CreateCard(body, json[index])
            }
        }
    );

    pageContent.append(body);
}

// --------------------------------------------------------------------------------------------

let UpdatePage = function (){
    UnloadPage();
    switch(String(pageState)){
        case "HOME":
            CreateHomePage();
            break;
        case "PROJECTS":
            CreateProjectPage();
            break;

        default:
            break;
    }
}

let NavTabClick = function(element){
    DisableTab(pageState);
    ActivateTab(element);
    UpdatePage();
}

main();