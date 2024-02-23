const template = document.createElement('template');

template.innerHTML = `
<style>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css");

a{
    display: inline-flex;
    text-decoration: none;
    font-size: 3rem;
    color: #333333;
}

a:before{
    color: #333333;
}

li{
    list-style-type: none;
    display: inline;
    margin: 10px;
    color: #333333;
}

span{
    margin-left: 3px;
}

span:hover{
    text-decoration: line-through white;
}

</style>

<li class="menu-option">
    <a>
        <i></i>
        <span id="title"></span>
    </a>
</li>

`;


class IconSM extends HTMLElement{

    static get observedAttributes() { 
        return ['dirHref', 'classLink', 'classIcon', 'nameIcon', 'classTitle', 'nameTitle', 'showTitle', 'fontSizeLink']; 
    }

    set dirHref(value){
        if(value){
            this.setAttribute('dirHref', value);
        }else{
            this.removeAttribute('dirHref');
        }
    }

    get dirHref(){
        return this.getAttribute('dirHref');
    }

    set classLink(value){
        if(value){
            this.setAttribute('classLink', value);
        }else{
            this.removeAttribute('classLink');
        }
    }

    get classLink(){
        return this.getAttribute('classLink');
    }

    set classIcon(value){
        if(value){
            this.setAttribute('classIcon', value);
        }else{
            this.removeAttribute('classIcon');
        }
    }

    get classIcon(){
        return this.getAttribute('classIcon');
    }

    set nameIcon(value){
        if(value){
            this.setAttribute('nameIcon', value);
        }else{
            this.removeAttribute('nameIcon');
        }
    }

    get nameIcon(){
        return this.getAttribute('nameIcon');
    }

    set classTitle(value){
        if(value){
            this.setAttribute('classTitle', value);
        }else{
            this.removeAttribute('classTitle');
        }
    }

    get classTitle(){
        return this.getAttribute('classTitle');
    }

    set nameTitle(value){
        if(value){
            this.setAttribute('nameTitle', value);
        }else{
            this.removeAttribute('nameTitle');
        }
    }

    get nameTitle(){
        return this.getAttribute('nameTitle');
    }

    set showTitle(value){
        if(value){
            this.setAttribute('showTitle', value);
        }else{
            this.removeAttribute('showTitle');
        }
    }

    get showTitle(){
        return this.getAttribute('showTitle');
    }

    set fontSizeLink(value){
        if(value){
            this.setAttribute('fontSizeLink', value);
        }else{
            this.removeAttribute('fontSizeLink');
        }
    }

    get fontSizeLink(){
        return this.getAttribute('fontSizeLink');
    }

    constructor(){
        //We called to parent constructor
        super();
        //We create a shadow root tree in the DOM
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        //WE passed the link of href for <a> tag.
        this.aElement = this.shadowRoot.querySelector('a');
        this.aElement.setAttribute('href', this.dirHref);
        //console.log(this.aElement)
        //WE passed the class of <a> tag.
        this.cLink = this.shadowRoot.querySelector('a');
        this.cLink.setAttribute('class', this.classLink);
        this.cLink.style.fontSize = this.fontSizeLink;
        //console.log(this.cLink);

        //WE passed the class of <i> tag.
        this.cIcon = this.shadowRoot.querySelector('i');
        this.cIcon.setAttribute('class', this.classIcon);
        //this.cIcon.innerHTML = this.nameIcon;
        //console.log(this.cIcon);

        //WE passed the class of <span> tag.
        this.cTitle = this.shadowRoot.querySelector('#title');
        this.cTitle.setAttribute('class', this.classTitle);
        //console.log(this.cTitle);
        //WE passed the text of <span> tag.
        this.cTitle.innerHTML = this.nameTitle;

        this.toggleVisibleTitle();
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        console.log('attribute changed callback being executed now');
        if (attrName === 'dirHref') {
            this.dirHref = newValue;
        }else if(attrName === 'classLink'){
            this.classLink = newValue;
        }else if(attrName === 'classIcon'){
            this.classIcon = newValue;
        }else if(attrName === 'classTitle'){
            this.classTitle = newValue;
        }else if(attrName === 'nameTitle'){
            this.nameTitle = newValue;
        }else if(attrName === 'fontSizeLink'){
            this.fontSizeLink = newValue;
        }
    }

    toggleVisibleTitle(){
        if(this.showTitle === 'true'){
            this.cTitle.style.display = 'inline';
        }else{
            this.cTitle.style.display = 'none';
        }
    }

}

customElements.define('icon-sm', IconSM);