/* ============================================
   ELEMENTS
============================================ */

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

const chat = document.getElementById("chatMessages");
const typingMessage = document.getElementById("typingMessage");

const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");

const attempts = document.getElementById("attempts");
const lies = document.getElementById("lies");
const honesty = document.getElementById("honesty");

const achievement = document.getElementById("achievement");
const result = document.getElementById("result");
const restartBtn = document.getElementById("restartBtn");

const particles = document.getElementById("particles");

/* ============================================
   VARIABLES
============================================ */

let noCount = 0;
let progress = 0;
let yesScale = 1;

/* ============================================
   BOT MESSAGES
============================================ */

const messages = [

"👋 Hello Human.",

"I have an important question.",

"🤔 Are you short?",

"Really?",

"Are you absolutely sure?",

"📏 My sensors disagree.",

"😂 Interesting answer.",

"Come on... be honest.",

"I already know the answer.",

"You clicked No again?",

"This is getting suspicious.",

"📡 Satellite data says otherwise.",

"🤖 Calculating height...",


"Still denying it?",

"😂 Nice try.",

"You almost clicked Yes.",

"I admire your determination.",

"Your mouse must be tired.",

"The No button refuses.",

"I'm smarter than that.",

"Truth cannot hide forever.",

"Denial detected.",

"Height scan loading...",

"Reality check incoming.",

"🤨 Seriously?",

"Last chance...",

"You know how this ends.",

"😂 Just press Yes.",

"I'm running out of jokes.",

"Fine... keep trying.",

"Still no?",

"My database is laughing.",

"Bro...",

"This is awkward.",

"AI confidence: 99.9%",

"You're making this difficult.",

"Height recalculated.",

"Nope.",

"Still nope.",

"Nice dodge.",

"You can't escape forever.",

"😂 Amazing persistence.",

"Please cooperate.",

"I'll wait.",

"I'm always watching.",

"Almost there.",

"Give up already.",

"Mission: Accept Reality.",

"😂😂😂",

"Final warning..."

];

/* ============================================
   TYPEWRITER EFFECT
============================================ */

function typeMessage(text){

    typingMessage.textContent="";

    let i=0;

    const timer=setInterval(()=>{

        typingMessage.textContent+=text.charAt(i);

        i++;

        if(i>=text.length){

            clearInterval(timer);

        }

    },35);

}

/* ============================================
   ADD CHAT MESSAGE
============================================ */

function addMessage(text){

    const div=document.createElement("div");

    div.className="bot-message fade-in";

    div.innerHTML=`
        <span class="bot-icon">🤖</span>
        <span>${text}</span>
    `;

    chat.appendChild(div);

    chat.scrollTop=chat.scrollHeight;

}

/* ============================================
   UPDATE STATS
============================================ */

function updateStats(){

    attempts.textContent=noCount;

    lies.textContent=Math.min(progress,100)+"%";

    if(progress<25){

        honesty.textContent="Unknown";

    }

    else if(progress<50){

        honesty.textContent="Suspicious";

    }

    else if(progress<75){

        honesty.textContent="Doubtful";

    }

    else{

        honesty.textContent="😂 Lying";

    }

}

/* ============================================
   UPDATE PROGRESS
============================================ */

function updateProgress(){

    progress=Math.min(progress+4,100);

    progressBar.style.width=progress+"%";

    progressText.textContent=progress+"%";

}

/* ============================================
   GROW YES BUTTON
============================================ */

function growYes(){

    yesScale+=0.04;

    yesBtn.style.transform=`scale(${yesScale})`;

}

/* ============================================
   CREATE PARTICLES
============================================ */

function createParticles(){

    for(let i=0;i<40;i++){

        const p=document.createElement("div");

        p.className="particle";

        p.style.left=Math.random()*100+"%";

        p.style.animationDuration=
        (10+Math.random()*10)+"s";

        p.style.animationDelay=
        Math.random()*8+"s";

        particles.appendChild(p);

    }

}

/* ============================================
   SHAKE CARD
============================================ */

function shakeCard(){

    document.querySelector(".glass-card")
        .classList.add("shake");

    setTimeout(()=>{

        document.querySelector(".glass-card")
            .classList.remove("shake");

    },500);

}

/* ============================================
   START
============================================ */

window.onload=()=>{

    createParticles();

    typeMessage("Hello Human...");

};

/* ============================================
   RANDOM MESSAGE
============================================ */

function randomMessage(){

    const index = Math.floor(Math.random() * messages.length);

    return messages[index];

}

/* ============================================
   MOVE NO BUTTON
============================================ */

function moveNoButton(){

    noCount++;

    updateProgress();

    updateStats();

    growYes();

    shakeCard();

    addMessage(randomMessage());

    // On small screens the button stacks full width, so skip the dodge
    if(window.innerWidth <= 768){

        return;

    }

    // Get the buttons container
    const container = document.querySelector(".buttons");

    const maxX = container.clientWidth - noBtn.offsetWidth;
    const maxY = container.clientHeight - noBtn.offsetHeight;

    // Keep button inside container
    const x = Math.max(0, Math.random() * maxX);
    const y = Math.max(0, Math.random() * maxY);

    noBtn.style.left = x + "px";
    noBtn.style.top = y + "px";

    // Spin effect
    const rotate = Math.floor(Math.random() * 360);

    noBtn.style.transform =
        `rotate(${rotate}deg)`;

}

/* ============================================
   NO BUTTON EVENTS
============================================ */

noBtn.addEventListener("pointerenter", moveNoButton);

noBtn.addEventListener("click", function(e){

    e.preventDefault();

    moveNoButton();

});

/* ============================================
   YES BUTTON
============================================ */

yesBtn.addEventListener("click", ()=>{

    addMessage("🎉 Honesty detected!");

    addMessage("Height Analysis Complete.");

    addMessage("Congratulations 😂");

    achievement.classList.add("show");

    result.classList.add("show");

    yesBtn.style.display="none";

    noBtn.style.display="none";

    honesty.textContent="Honest";

    progressBar.style.width="100%";

    progressText.textContent="100%";

    if(typeof confetti==="function"){

        confetti({

            particleCount:200,

            spread:90,

            origin:{
                y:0.6
            }

        });

    }

});

/* ============================================
   RESTART
============================================ */

restartBtn.addEventListener("click",()=>{

    noCount=0;

    progress=0;

    yesScale=1;

    attempts.textContent="0";

    lies.textContent="0%";

    honesty.textContent="Unknown";

    progressBar.style.width="0%";

    progressText.textContent="0%";

    result.classList.remove("show");

    achievement.classList.remove("show");

    yesBtn.style.display="inline-block";

    noBtn.style.display="inline-block";

    yesBtn.style.transform="scale(1)";

    noBtn.style.left="";

    noBtn.style.top="";

    noBtn.style.transform="";

    chat.innerHTML = `
        <div class="bot-message">
            <span class="bot-icon">🤖</span>
            <span class="typing" id="typingMessage">
                Hello Human...
            </span>
        </div>
    `;

    // Reconnect typingMessage reference
    window.typingMessage = document.getElementById("typingMessage");

    typeMessage("Hello Human...");

});

/* ============================================
   WINDOW RESIZE
============================================ */

window.addEventListener("resize",()=>{

    noBtn.style.left="";

    noBtn.style.top="";

    noBtn.style.transform="";

});

/* ============================================
   INITIAL MESSAGE
============================================ */

setTimeout(()=>{

    addMessage("🤖 I have a question...");

},1500);

setTimeout(()=>{

    addMessage("📏 Are you short?");

},3000);