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

span{
    font-size: 2rem;
    grid-area: sn;
}

img{
    grid-area: img;
}

</style>

<div class="counter-container">
    <div class="items-container">
        <img id="srcImg"/>
        <span id="counter"></span>
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
            this.cLimit = this.shadowRoot.getElementById('counter');
            this.cLimit.innerHTML = this.dateLimit;
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


}

customElements.define('counter-info', CounterInfo);