const template = document.createElement('template');

template.innerHTML = `
<style>
.span-show-container{
    margin: 70px;
    display: flex;
    justify-content: center;
}

.items-container{
    display: grid;
    grid-template-areas:
    "sn"
    "img";
    grid-template-rows: auto;
    grid-template-columns: repeat(300px 1fr);
}

span{
    background-color: #333333;
    color: white;
    margin: auto;
    padding: 2px 10px 2px 10px; 
    justify-content: center;
    grid-area: sn;
}

img{
    border: none; 
    margin-top: 8px;
    width: 500px;
    grid-area: img;
}

</style>

<div class="span-show-container">
    <div class="items-container">
        <span id="title"></span>
        <img id="srcImg"/>
    </div>
</div>

`;

class SpanShow extends HTMLElement{

    static get observedAttributes(){
        return ['title', 'fontSizeTitle', 'srcImg'];
    }

    set title(value){
        if(value){
            this.setAttribute('title', value);
        }else{
            this.removeAttribute('title');
        }
    }

    get title(){
        return this.getAttribute('title');
    }//end get title

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

        this.assignTitle();
        this.assignFontSize();
        this.assignSrcImg();

    }

    assignTitle(){
        if(this.title){
            this.tSpan = this.shadowRoot.getElementById('title');
            this.tSpan.innerHTML = this.title.toLocaleUpperCase();
        }else{
            this.tSpan = this.shadowRoot.getElementById('title');
            this.tSpan.innerHTML = 'Titulo';
        }
    }

    assignFontSize(){
        if(this.fontSizeTitle){
            this.tSpan = this.shadowRoot.getElementById('title');
            this.tSpan.style.fontSize = this.fontSizeTitle;
        }
    }

    assignSrcImg(){
        if(this.srcImg){
            this.sImg = this.shadowRoot.getElementById('srcImg');
            this.sImg.setAttribute('src', this.srcImg);
            this.sImg.setAttribute('alt', '');
        }else{
            this.sImg = this.shadowRoot.getElementById('srcImg');
            this.sImg.setAttribute('src', '../../img/example/flower-example.jpg');
            this.sImg.setAttribute('alt', 'Foto by tomiha, Pixabay.');
        }
    }

    attributeChangedCallback(att, oldValue, newValue){
        if(att === 'title'){
            this.title = newValue;
        }else if(att === 'fontSizeTitle'){
            this.fontSizeTitle = newValue;
        }else if(att === 'srcImg'){
            this.srcImg = newValue;
        }
    }

}

customElements.define('span-show', SpanShow);