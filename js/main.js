'use strict';

class Chat {
  constructor(){
    this.el=document.querySelector("#content");
    this.app=this.el=document.querySelector("#app");
    this.run();
  }

  renderMessagesSend(message){
    const {author, avatar, text} = message;
    const date = new Date();
    let hourminute = date.getHours() + ":" + date.getMinutes();
    return `
    <div class ="row">
      <div class = "col-6 mt-2 mb-2 col-md-offset-12">
        <div class="card">
          <h5 align = "center" class="card-header">
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

  renderMessagesReceived(message){
    const {author, avatar, text} = message;
    const date = new Date();
    let hourminute = date.getHours() + ":" + date.getMinutes();
    return ` 
      <div class = "col-6 ">
        <div class="card mb-2">
          <h5 class="card-header">
            <img width ="30px" class ="rounded-circle" src="${avatar}">
            <span>${author}</span>
          </h5>
        <div class="card-body">
          <p class="card-text">${text}</p>
          <p style="text-align:right" class="text-muted">${hourminute}</small>
        </div>
      </div>
    </div>`;
  }

  renderMessages(){
    return `    
      <div class = "col-md-6 col-md-offset-3 well">
      <div class ="message-content row"></div>
        ${this.renderTypingMessages()}
    </div>`;
  }

  renderTypingMessages(){
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
      </div>
      `;
  }

  renderHeader(){

  }

  renderContact(contact){
    const { avatar, name} =  contact;
    return `
      <div id = "profile" class="profile mt-4" >
        <img src="${avatar}" alt="profile_picture" >
        <h5>${name}</h5>
      </div>
      <hr>
    `;
  }

  renderContacts(contacts){
    return `
    <div class="wrapper1">
      <div class="sidebar">    
        ${contacts.map((contact) => this.renderContact(contact)).join('')}     
      </div>
    </div>
    `;
  }

  typingMessage(){
    const el= document.querySelector('.typing-message input');
    //const el= document.querySelector('.typing-message button');
    const messageuser= document.querySelector('.message-content');
    el.addEventListener('keypress',(e) => {
      const text = e.currentTarget.value;
      if (e.keyCode === 13){
        const message = {
          author : 'user',
          avatar : '../images/user.png',
          text 
        };
        messageuser.innerHTML += this.renderMessagesSend(message);
        e.currentTarget.value ='';
      }
    });

  }

  run (){
    const contacts = [{
      name : 'Astroboy',
      avatar : '../images/astronaut.png'
    },{
      name : 'Ghibli',
      avatar : '../images/mononoke.jpg'
    },{
      name : 'Joker',
      avatar : '../images/clown.jpg'
    },{
      name : 'Cyril',
      avatar : '../images/cyril.jpg'
    }];

    this.el.innerHTML += this.renderContacts(contacts);
    //this.el.innerHTML += this.renderHeader();
    this.el.innerHTML += this.renderMessages();
    this.typingMessage();
  }
}

const chat = new Chat();