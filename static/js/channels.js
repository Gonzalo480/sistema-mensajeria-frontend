import { loadMessages } from "./messages.js";
import { resetMessagesList } from "./messages.js";

export function loadChannels (serverName) {

    fetch('http://127.0.0.1:5000/servers/'+serverName+'/channels', {method:"GET"})
    .then(response => response.json())
    .then(channels => {
        channels.forEach((channel) => {
            createChannelButton(channel);
        })
    })
}

export const resetChannelsList = () => {
    const channelButtons = document.querySelectorAll(".channel");
    channelButtons.forEach((button) => {
        button.remove();
    })
}

const resetChannelButtons = () => {
    const channelButtons = document.querySelectorAll(".channel");
    channelButtons.forEach((button) => {
        button.disabled = false;
    })
}

const disableSelectedChannel = (channel) => {
    const channelButtons = document.querySelectorAll(".channel");
    channelButtons.forEach((button) => {
        if (button.innerHTML == channel) {
            button.disabled = true;
        }
    })
}


const createChannelButton = (channel) => {
    const channelButton = document.createElement("button");
    channelButton.setAttribute("class", "channel");
    channelButton.innerHTML = channel["nombre_sala"];
    document.getElementById("channels-list").appendChild(channelButton);
    eventListener(channelButton);
}

const eventListener = (channel) => {
    channel.addEventListener("click", () => {
        let channelName = channel.innerHTML;
        resetMessagesList();
        resetChannelButtons();
        loadMessages(channelName);
        disableSelectedChannel(channelName);
    })
}

export const getSelectedChannel = () => {
    const channelButtons = document.querySelectorAll(".channel");
    let text;
    channelButtons.forEach((button) => {
        if (button.disabled) {
            text = button.innerHTML;
        }
    })
    return text;
}
