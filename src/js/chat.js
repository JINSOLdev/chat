'use strict';
const socket = io();

const nickname = document.querySelector('#nickname');
const chatList = document.querySelector('.chatting-list');
const chatInput = document.querySelector('.chatting-input ');
const sendButton = document.querySelector('.send-button');
const displayContainer = document.querySelector('.display-container');

chatInput.addEventListener('keypress', (event) => {
    if (event.keyCode === 13) {
        send();
        chatInput.value = ''; 
    }
});

function send() {
    const param = {
        name: nickname.value,
        message: chatInput.value,
    };
    socket.emit('chatting', param);
}

sendButton.addEventListener('click', send);

socket.on('chatting', (data) => {
    console.log(data);
    const { name, message, time } = data;
    const item = new LiModel(name, message, time); // LiModel instance
    item.makeLi();
    displayContainer.scrollTo(0, displayContainer.scrollHeight);

    // li.innerText = `${data.name}님이 = ${data.message}`;
    // chatList.appendChild(li);
});

function LiModel(name, message, time) {
    this.name = name;
    this.message = message;
    this.time = time;

    this.makeLi = () => {
        const li = document.createElement('li');
        li.classList.add(nickname.value === this.name ? 'sent' : 'received');
        const dom = `<span class="profile">
                            <span class="user">${this.name}</span>
                            <img class="image" src="https://picsum.photos/250/250 " alt="any" />
                        </span>
                        <span class="message">${this.message}</span>
                        <span class="time">${this.time}</span>`;
        li.innerHTML = dom;
        chatList.appendChild(li);
    };
}
