//CALCULATE THE MILLISECONDS BY DAY, HOUR, MIN, SEC AND DECLARATE OF VARIABLES NEDEED
let countTime = '';

const dayH = 24, minH = 60, secH = 3600, milliSecMin = 60000, sec = 1000;

const milliSecDay = ((dayH * secH)*sec);

const milliSecH = minH * milliSecMin;

let MSDE;

let idIntVal;
let res;

//CREATE THE WEB COMPONENT TEMPLATE
const template = document.createElement('template');

template.innerHTML = `
<style>
.counter-container{
    display: flex;
    justify-content: center;
    margin-top: 80px;
}

.items-container{
    display: grid;
    grid-template-areas:
    "img"
    "sn";
    grid-template-rows: auto;
    grid-template-columns: repeat(300px 1fr);
}

#counter{
    font-size: 2rem;
    grid-area: sn;
    text-align: center;
}

img{
    grid-area: img;
}

</style>

<div class="counter-container">
    <div class="items-container">
        <img id="srcImg"/>
        <span id="counter"></span>
        <span>Dias, Horas, Minutos, Segundos</span>
    </div>
</div>

`;

class CounterInfo extends HTMLElement{

    static get observedAttributes(){
        return ['dateLimit', 'fontSizeTitle', 'srcImg'];
    }

    set dateLimit(value){
        if(value){
            this.setAttribute('dateLimit', value);
        }else{
            this.removeAttribute('dateLimit');
        }
    }

    get dateLimit(){
        return this.getAttribute('dateLimit');
    }//end get dateLimit

    set fontSizeTitle(value){
        if(value){
            this.setAttribute('fontSizeTitle', value);
        }else{
            this.removeAttribute('fontSizeTitle');
        }
    }

    get fontSizeTitle(){
        return this.getAttribute('fontSizeTitle');
    }//end get fontSize

    set srcImg(value){
        if(value){
            this.setAttribute('srcImg', value);
        }else{
            this.removeAttribute('srcImg');
        }
    }

    get srcImg(){
        return this.getAttribute('srcImg');
    }//end get srcImg

    constructor(){
        super();

        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.assignCLimit();
        this.assignFontSize();
        this.assignSrcImg();

    }

    assignCLimit(){
        if(this.dateLimit){
            this.convertDateToMilli(this.dateLimit);
            if(!idIntVal){
                idIntVal = setInterval(this.timeLess(), 1000);
            }
            
        }else{
            this.cLimit = this.shadowRoot.getElementById('counter');
            this.cLimit.innerHTML = '12 : 01 : 45 : 37';
        }

    }

    assignFontSize(){
        if(this.fontSizeTitle){
            this.cLimit = this.shadowRoot.getElementById('counter');
            this.cLimit.style.fontSize = this.fontSizeTitle;
        }
    }

    assignSrcImg(){
        if(this.srcImg){
            this.sImg = this.shadowRoot.getElementById('srcImg');
            this.sImg.setAttribute('src', this.srcImg);
            this.sImg.setAttribute('alt', '');
        }else{
            this.sImg = this.shadowRoot.getElementById('srcImg');
            this.sImg.setAttribute('src', '../../img/example/clock-example.png');
            this.sImg.setAttribute('alt', 'Image by Susann Mielke, Pixabay.');
        }
    }

    attributeChangedCallback(att, oldValue, newValue){
        if(att === 'dateLimit'){
            this.dateLimit = newValue;
        }else if(att === 'fontSizeTitle'){
            this.fontSizeTitle = newValue;
        }else if(att === 'srcImg'){
            this.srcImg = newValue;
        }
    }

    //METHODS OF CALCULATE THE DATE OF EVENT, AND SHOW THE COUNT DOWN TO GLOBAL LEVEL. 
    convertDateToMilli(value){
        const date = new Date(value);

        var cadena = new Date(date + ' GMT+01:00');

        const dateEvent = cadena.toISOString();
    
        MSDE = Date.parse(dateEvent);
        console.log(dateEvent);
    
        console.log(MSDE);
    }

    timeLess(){
        let dias = 0, horas = 0, minutos = 0, segundos = 0;
        let secondsCurrent = Date.now();
        //console.log(secondsCurrent);
        res = MSDE - secondsCurrent;
        console.log(res);
        if(res >= 0){
            dias = Math.floor(res/milliSecDay);
            horas = Math.floor(res/milliSecH);
            minutos = Math.floor(res/milliSecMin);
            segundos = Math.floor(res/sec);
        }else{
            clearInterval(idIntVal);
            idIntVal = null;
        }
        
        countTime = dias+' : '+horas+' : '+minutos+' : '+segundos;

        this.cLimit = this.shadowRoot.getElementById('counter');
        this.cLimit.innerHTML = countTime;
    }

}

customElements.define('counter-info', CounterInfo);