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
    document.getElementById(target).classList.add("activetab");
    pageState = target;
}

let DisableTab = function(target){
    document.getElementById(target).classList.remove("activetab");
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

let CreateLinkBubble = function(bubbleflex, linkJSON){
    let linkbubble = document.createElement("a");
    let bubbleart = document.createElement("img");

    linkbubble.className = "linkbubble";
    linkbubble.href = linkJSON.site;
    linkbubble.target = "_blank";
    linkbubble.id = linkJSON.id;

    bubbleart.className = "bubbleart";
    bubbleart.src = linkJSON.icon;

    linkbubble.append(bubbleart);

    bubbleflex.append(linkbubble);
}

let CreateAboutCard = function(pageBody, aboutJSON){
    let card = document.createElement("div");
    let bubbleflex = document.createElement("div");

    let image = document.createElement("img");

    let textflex = document.createElement("div");

    let title = document.createElement("h1");
    let text = document.createElement("p");
    let email = document.createElement("div");
    let phoneNumber = document.createElement("div");

    card.className = "aboutcard";

    textflex.className = "textflex";

    bubbleflex.className = "bubbleflex";

    title.className = "abouttitle";
    text.className = "abouttext";
    email.className = "aboutemail";
    phoneNumber.className = "aboutphone";

    image.src = aboutJSON.picture;
    image.id = "bodypic";

    title.textContent = aboutJSON.title;
    text.textContent = aboutJSON.text;
    email.textContent = aboutJSON.email;
    phoneNumber.textContent = aboutJSON.phone;

    for(let index = 0; index < aboutJSON.links.length; index++) {
        CreateLinkBubble(bubbleflex, aboutJSON.links[index]);
    }

    card.append(image);
    textflex.append(title);
    textflex.append(text);
    textflex.append(email);
    textflex.append(phoneNumber);
    card.append(textflex);
    pageBody.append(card);

    pageBody.append(bubbleflex);
}

let CreateHomePage = function (){
    let body = document.createElement("div");

    body.className = "aboutbody";

    fetch("about.json").then(response => response.json())
    .then(json => CreateAboutCard(body, json));

    pageContent.append(body);
}

let CreateCard = function(pageBody, cardJSON){
    let card = document.createElement("a");
    
    card.className = "projectcard";
    card.href = cardJSON.site;
    card.target = "_blank";


    let cardArt = document.createElement("img");
    let platformIcon = document.createElement("img");
    let artSpot = document.createElement("div");

    artSpot.className = "artspot";

    platformIcon.className = "platformicon";
    platformIcon.src = cardJSON.platform;

    cardArt.className = "projectart";
    cardArt.src = cardJSON.art

    artSpot.append(cardArt);
    artSpot.append(platformIcon);

    card.append(artSpot);


    let cardText = document.createElement("div");

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
    let body = document.createElement("div");

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