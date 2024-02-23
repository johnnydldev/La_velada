const template = document.createElement('template');

template.innerHTML = `
<style>
.foo-container{
    display: flex;
    justify-content: center;
}

.items-container{
    display: inline-flex;
    border-top-style: solid;
    width: 80%;
    padding: 10px;
}

#title{
    width: 90%;
    text-align: ;
}

</style>


<div class="foo-container">
    <div class="items-container">
        <span id="title"></span>    
        <div class="icons-container">
            <slot name="oneNetwork"></slot>
            <slot name="twoNetwork"></slot>
            <slot name="threeNetwork"></slot>
        </div>
    </div>
</div>

`;

class CustomFoo extends HTMLElement{

    static get observedAttribues(){
        return ['copyright'];
    }

    set copyright(value){
        if(value){
            this.setAttribute('copyright', value);
        }else{
            this.removeAttribute('copyright');
        }
    }

    get copyright(){
        return this.getAttribute('copyright');
    }//end get copyright

    constructor(){
        super();

        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.assignCredits();

    }

    assignCredits(){
        if(this.copyright){
            this.credits = this.shadowRoot.getElementById('title');
            this.credits.innerHTML = '&#169 ' + this.copyright+' | Todos los derechos reservados'; 
        }else{
            this.credits = this.shadowRoot.getElementById('title');
            this.credits.innerHTML = '&#169 Todos los derechos reservados'; 
        }
    }

    attributeChangedCallback(att, oldValue, newValue) {
        if(att === 'copyright'){
            this.copyright = newValue;
        }
    }

}

customElements.define('custom-foo', CustomFoo);