
export function loadChannels (serverName) {

    fetch('http://127.0.0.1:5000/servers/'+serverName+'/channels', {method:"GET"})
    .then(response => response.json())
    .then(channels => {
        channels.forEach((channel) => {
            createChannelButton(channel);
        })
    })
}

const createChannelButton = (channel) => {
    const channelButton = document.createElement("button");
    channelButton.setAttribute("class", "channel");
    channelButton.innerHTML = channel["nombre_sala"];
    document.getElementById("channels-list").appendChild(channelButton);
}

export const resetChannelsList = () => {
    const channelButtons = document.querySelectorAll(".channel");
    channelButtons.forEach((button) => {
        button.remove();
    })
}