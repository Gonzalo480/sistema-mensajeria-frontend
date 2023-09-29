import { loadChannels, resetChannelsList } from "./channels.js"

const serverButtons = document.querySelectorAll(".server")

serverButtons.forEach((button) => {
    button.addEventListener("click", () => {
        let serverName = button.innerHTML;
        resetChannelsList();
        resetServerButtons();
        loadChannels(serverName);
        disableSelectedServer(serverName);
    })
})

const resetServerButtons = () => {
    serverButtons.forEach((button) => {
        button.disabled = false;
    })
}

const disableSelectedServer = (server) => {
    serverButtons.forEach((button) => {
        if (button.innerHTML == server) {
            button.disabled = true;
        }
    })
}


