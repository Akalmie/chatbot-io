'use strict';

class Chat {
  constructor() {
    this.el = document.querySelector("#content");
    this.app = this.el = document.querySelector("#app");
    this.run();
  }

  renderMessagesSend(message) {
    const { author, avatar, text } = message;
    const date = new Date();
    let hourminute = date.getHours() + ":" + date.getMinutes();
    return `
    <div class ="row">
      <div class = "col-6 mt-2 mb-2 col-md-offset-12">
        <div class="card">
          <h5 class="card-header">
            <img width ="30px" class ="rounded-circle" src="${avatar}">
            <span>${author}</span>
          </h5>
          <div class="card-body">
            <p class="card-text">${text}</p>
            <p style="text-align:right" class="text-muted">${hourminute}</small>
          </div>
        </div>
      </div>
    </div>`;
  }

  renderMessagesReceived(message) {
    const { author, avatar, text } = message;
    const date = new Date();
    let hourminute = date.getHours() + ":" + date.getMinutes();
    return ` 
    <div class ="row">
      <div class = "col-6 mb-2 ">
        <div class="card">
          <h5 class="card-header">
            <img width ="30px" class ="rounded-circle" src="${avatar}">
            <span>${author}</span>
          </h5>
        <div class="card-body">
          <p class="card-text">${text}</p>
          <p style="text-align:right" class="text-muted">${hourminute}</small>
        </div>
      </div>
    </div> `;
  }

  renderMessages() {
    return `    
      <div class = "col-md-6 col-md-offset-3 well">
      <div class ="message-content row"></div>
      <div class ="message-content-bot row"></div>
        ${this.renderTypingMessages()}
    </div>
    `;
  }

  renderTypingMessages() {
    return `
      <div class ="typing-message row">  
        <div class="col-9 ">
          <input type="text" class="form-control" placeholder ="Message" id="Message" aria-label="Message"/>
        </div>
        <div class='col-1'>              
          <div class="d-grid gap-2">
            <button class="btn btn-default btn-block" type="submit">Envoyer</button>
          </div>
        </div>
      </div>`;
  }

  renderContact(contact) {
    const { avatar, author } = contact;
    return `
      <div id = "profile" class="profile mt-4" >
        <img src="${avatar}" alt="profile_picture" >
        <h5>${author}</h5>
      </div>
      <hr>
    `;
  }

  renderContacts(contacts) {
    return `
    <div class="wrapper1">
      <div class="sidebar">    
        ${contacts.map((contact) => this.renderContact(contact)).join('')}     
      </div>
    </div>
    `;
  }

  typingMessage() {
    const el = document.querySelector('.typing-message input');
    const messageuser = document.querySelector('.message-content');
    const messagebot = document.querySelector('.message-content');
    el.addEventListener('keypress', (e) => {
      const text = e.currentTarget.value;
      switch (text) {
        case 'Joker':
          fetch("https://api.chucknorris.io/jokes/random", {
            "method": "GET",
          })
            .then(response => response.json())
            .then(data => {
              let botmessage = data.value;
              const message = {
                author: 'Joker',
                avatar: '../images/clown.jpg',
                text : botmessage,
              };
              messagebot.innerHTML +=this.renderMessagesReceived(message) 
            })
            .catch(err => {
              console.error(err);
            });
        break;
        case 'Cyril':
          fetch( 'https://aws.random.cat/meow')
          .then( response => response.json() )
          .then( data => {
            let botmessage=data.file
            const message = {
              author: 'Cyril',
              avatar: '../images/cyril.jpg',
              text : `<div class ="message-content-bot row"><img src="${botmessage}" /></div>`,
            };
            messagebot.innerHTML += this.renderMessagesReceived(message);
          } );
        break;
        case 'Astroboy':
          var url = "https://api.nasa.gov/planetary/apod?api_key=nGyb4L9GhjsBPfcA5Z4q5LzxUzs5ryYDMWIQA4kE";
          function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1) + min) 
          }
          var randomDay = getRandomInt('01','30');
          var randomMonth = getRandomInt('01','12');
          var randomYear = getRandomInt('2000','2018');
          var newdate = randomYear+"-"+randomMonth+"-"+randomDay
          var frenchdate = randomDay+"-"+randomMonth+"-"+randomYear
          url+="&date="+ newdate;
          fetch( url )
          .then( response => response.json() )
          .then( data => {
            let botmessage=data.url
            //let botdescription = data.explanation;
            const message = {
              author: 'Astroboy',
              avatar: '../images/astronaut.png',
              text : `<div class ="message-content-bot row"><img src="${botmessage}" /><br> Photo prise le : ${frenchdate}<br> </div>`,
            };
            messagebot.innerHTML += this.renderMessagesReceived(message);
          } );
        break;

        case 'help':
          alert ("help");
          break;
      }


      if (e.keyCode === 13) {
        const message = {
          author: 'user',
          avatar: '../images/user.png',
          text
        };
        messageuser.innerHTML += this.renderMessagesSend(message);
        e.currentTarget.value = '';
      }
    });

  }

  run() {
    const contacts = [{
      author: 'Astroboy',
      avatar: '../images/astronaut.png'
    }, {
      author: 'Joker',
      avatar: '../images/clown.jpg'
    }, {
      author: 'Cyril',
      avatar: '../images/cyril.jpg'
    }];

    this.el.innerHTML += this.renderContacts(contacts);
    this.el.innerHTML += this.renderMessages();
    this.typingMessage();
  }
}

const chat = new Chat();