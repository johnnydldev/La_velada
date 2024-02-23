const template = document.createElement('template');

template.innerHTML = `
<style>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css");

.span-i-primary-container{
    display: grid;
    justify-content: center;
    height: 300px;
    color: #333333;

}

.icon-container{
    display: flex;
    align-items: center;
    justify-content: center;
}

.items-container{
    display: flex;
}

#infoShowman{
    display: flex;
    align-items: center;
    justify-content: center;
    border-top-style: solid;
    border-bottom-style: solid;
    width: 400px;
    margin: 0px 40px 0px 40px;
    font-size: 3rem; 
    font-weight: bold;
    text-align: center;

}

#infoLeft{
    display: flex;
    align-items: center;
    justify-content: center;
    border-top-style: solid;
    border-bottom-style: solid;
    width: 300px;
    font-size: 1.2rem; 
    text-align: center;

}

#infoRight{
    display: flex;
    align-items: center;
    justify-content: center;
    border-top-style: solid;
    border-bottom-style: solid;
    width: 300px;
    font-size: 1.2rem; 
    text-align: center;
}

i{
    color: #333333;
    font-size: 3rem;
}

</style>

<div class="span-i-primary-container">
    <div class="icon-container">
        <a><i fill="currentColor"></i></a>
    </div>
    <div class="items-container">
        
        <span id="infoRight">
            <slot name="infoRight"></slot>
        </span> 
        <span id="infoShowman">
            <slot name="infoShowman"></slot>
        </span>    
        <span id="infoLeft">
            <slot name="infoLeft"></slot>
        </span> 
    </div>
</div>

`;

class InfoPrimary extends HTMLElement{

    static get observedAttribues(){
        return ['classIcon', 'linkSocialM'];
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
    }//end get classIcon

    set linkSocialM(value){
        if(value){
            this.setAttribute('linkSocialM', value);
        }else{
            this.removeAttribute('linkSocialM');
        }
    }

    get linkSocialM(){
        return this.getAttribute('linkSocialM');
    }//end get linkSocialM

    constructor(){
        super();

        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.assignCIcon();

        this.assignLSC();

    }


    assignCIcon(){
        if(this.classIcon){
            this.cIcon = this.shadowRoot.querySelector('i');
            this.cIcon.setAttribute('class', this.classIcon); 
        }else{
            this.cIcon = this.shadowRoot.querySelector('i');
            this.cIcon.setAttribute('class', '');
        }
    }

    assignLSC(){
        if(this.linkSocialM){
            this.lSM = this.shadowRoot.querySelector('a');
            this.lSM.setAttribute('href', this.linkSocialM);
        }else{
            this.lSM = this.shadowRoot.querySelector('a');
            this.lSM.setAttribute('href', '');
        }
    }

    attributeChangedCallback(att, oldValue, newValue) {
        if(att === 'classIcon'){
            this.classIcon = newValue;
        }else if(att === 'linkSocialM'){
            this.linkSocialM = newValue;
        }
    }
}

customElements.define('info-primary', InfoPrimary);