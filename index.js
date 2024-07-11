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
    let body = document.createElement("div");
    let card = document.createElement("div");
    let bubbleflex = document.createElement("div");

    let image = document.createElement("img");

    let textflex = document.createElement("div");

    let title = document.createElement("h1");
    let text = document.createElement("p");
    let email = document.createElement("div");
    let phoneNumber = document.createElement("div");

    body.className = "aboutbody";

    card.className = "aboutcard"

    textflex.className = "textflex";

    bubbleflex.className = "bubbleflex";

    text.className = "abouttext";

    image.src = "media/bodypic.png";
    image.id = "bodypic";
    title.style = "text-align: center;";
    
    if(typeof window.orientation !== "undefined"){
        card.style.flexDirection = "column";
        card.style.alignItems = "center";
        card.style.height = "auto";
        card.style.width = "80%";

        image.style.maxWidth = "75%";

        bubbleflex.style.width = "80%";
        bubbleflex.style.height = "20%";
        
    }else{
        
    }
    
    // Add File Reader eventually
    title.textContent = "Who Am I?";
    text.textContent = "Passionate indie dev with a deep love for games. Who spends a good amount of thier freetime analysing what makes games feel good and fun to play.";
    email.style.marginTop = "20px";
    email.style.textAlign = "center";
    email.textContent = "connorfatland@gmail.com";
    phoneNumber.style.marginTop = "5px";
    phoneNumber.style.textAlign = "center";
    phoneNumber.textContent = "(425)-238-2262";

    // yes I know this is a code smell
    // github bubble ---------------------------------------------------------

    let linkbubble = document.createElement("a");
    let bubbleart = document.createElement("img");

    linkbubble.className = "linkbubble";
    linkbubble.href = "https://github.com/connor-fatland";
    linkbubble.target = "_blank";
    linkbubble.id = "github";

    bubbleart.className = "bubbleart";

    bubbleart.src = "media/icons/github.png";
    
    linkbubble.append(bubbleart);

    // linkedin bubble ---------------------------------------------------------

    let linkBubbleLinkedIn = document.createElement("a");
    let bubbleArtLinkedIn = document.createElement("img");

    linkBubbleLinkedIn.className = "linkbubble";
    linkBubbleLinkedIn.href = "https://www.linkedin.com/in/connor-fatland";
    linkBubbleLinkedIn.target = "_blank";
    linkBubbleLinkedIn.id = "linkedin";

    bubbleArtLinkedIn.className = "bubbleart";

    bubbleArtLinkedIn.src = "media/icons/linkedin.png";
    
    linkBubbleLinkedIn.append(bubbleArtLinkedIn);

    //--------------------------------------------------------------------------

    card.append(image);
    textflex.append(title);
    textflex.append(text);
    textflex.append(email);
    textflex.append(phoneNumber);
    card.append(textflex);
    body.append(card);

    bubbleflex.append(linkbubble)
    bubbleflex.append(linkBubbleLinkedIn)

    body.append(bubbleflex);

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


    let cardText = document.createElement("p");

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