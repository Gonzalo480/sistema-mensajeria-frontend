import { getSelectedChannel } from "./channels.js";

export function loadMessages (channelName) {

    fetch('http://127.0.0.1:5000/channels/'+channelName+'/messages', {method:"GET"})
    .then(response => response.json())
    .then(messages => {
        messages.forEach((message) => {

            createMessageBubble(message);
        })
    })
}

export function resetMessagesList () {

    const messages = document.querySelectorAll(".message-container");
    messages.forEach((message) => {
        message.remove();
    })
}


const createMessageBubble = (message) => {

    const messageDiv = document.createElement("div");
    const userPhoto = document.createElement("img");
    const username = document.createElement("h4");
    const messageBubble = document.createElement("span");

    messageDiv.setAttribute("class", "message-container");
    document.getElementById("message-list").appendChild(messageDiv);

    userPhoto.src = "/static/imagenes/arbol_pp.jpg";
    userPhoto.setAttribute("class", "user-photo");
    messageDiv.appendChild(userPhoto);

    messageBubble.setAttribute("class", "message-bubble");
    messageBubble.textContent = message["message"];
    messageDiv.appendChild(messageBubble);
    
    username.setAttribute("class", "username");
    username.innerHTML = message["user"];
    messageDiv.appendChild(username);
    messageDiv.scrollTop = messageDiv.scrollIntoView();

    document.getElementById("user-message-field").style.display = "block";
}

const sendButton = document.getElementById("send-button");

sendButton.addEventListener("click", () => {
    const userMessage = document.getElementById("user-message").value;
    saveMessage(userMessage);
})

const saveMessage = (userMessage) => {

    const data = {
        message: userMessage,
        nombre_sala: getSelectedChannel()
    }

    fetch("http://127.0.0.1:5000/channels/messages", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(data),
        credentials: 'include'
    })
    .then(response => {
        if (response.ok) {
            resetMessagesList();
            loadMessages(data["nombre_sala"]);
        }
    })
}