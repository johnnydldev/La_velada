const template = document.createElement('template');

template.innerHTML = `
<style>
.span-info-container{
    display: flex;
    justify-content: center;
    color: #333333;
    height: 100px;
    margin-bottom: 80px;
}

.items-container{
    display: grid;
}

#dateTime{
    font-size: 1.5rem;
    margin: auto;
    justify-content: center;
}

#title{
    font-size: 1rem;
    margin-left: auto;
    margin-right: auto;
    margin-top: 15px;
    justify-content: center;
}

#place{
    font-size: 1rem;
    margin: auto;
    justify-content: center;
}

#infoEntries{
    border: solid #333333;
    font-size: 1rem;
    margin-left: auto;
    margin-right: auto;
    margin-top: 15px;
    justify-content: center;
    padding: 4px;
}
</style>

<div class="span-info-container">
    <div class="items-container">
        <strong id="dateTime"></strong>    
        <span id="title"></span>
        <span id="place"></span>
        <span id="infoEntries"></span>
    </div>
</div>

`;

class SpanInfo extends HTMLElement{

    static get observedAttribues(){
        return ['dateTimeInfo', 'titleEvent', 'placeEvent', 'infoEntries'];
    }

    set dateTimeInfo(value){
        if(value){
            this.setAttribute('dateTimeInfo', value);
        }else{
            this.removeAttribute('dateTimeInfo');
        }
    }

    get dateTimeInfo(){
        return this.getAttribute('dateTimeInfo');
    }//end get dateTime

    set titleEvent(value){
        if(value){
            this.setAttribute('titleEvent', value);
        }else{
            this.removeAttribute('titleEvent');
        }
    }

    get titleEvent(){
        return this.getAttribute('titleEvent');
    }//end get title

    set placeEvent(value){
        if(value){
            this.setAttribute('placeEvent', value);
        }else{
            this.removeAttribute('placeEvent');
        }
    }

    get placeEvent(){
        return this.getAttribute('placeEvent');
    }//end get place 

    set infoEntries(value){
        if(value){
            this.setAttribute('infoEntries', value);
        }else{
            this.removeAttribute('infoEntries');
        }
    }

    get infoEntries(){
        return this.getAttribute('infoEntries');
    }

    constructor(){
        super();

        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.assignDate();

        this.assignTitle();

        this.assignPlace();

        this.assignInfoEntry();

    }

    assignDate(){
        if(this.dateTimeInfo){
            this.dTInfo = this.shadowRoot.getElementById('dateTime');
            this.dTInfo.innerHTML = this.dateTimeInfo.toLocaleUpperCase(); 
        }else{
            this.dTInfo = this.shadowRoot.getElementById('dateTime');
            this.dTInfo.innerHTML = 'Fecha y hora del evento'; 
        }
    }

    assignTitle(){
        if(this.titleEvent){
            this.tEvent = this.shadowRoot.getElementById('title');
            this.tEvent.innerHTML = this.titleEvent.toLocaleUpperCase(); 
        }else{
            this.tEvent = this.shadowRoot.getElementById('title');
            this.tEvent.innerHTML = 'Titulo secundario del evento'; 
        }
    }

    assignPlace(){
        if(this.placeEvent){
            this.pEvent = this.shadowRoot.getElementById('place');
            this.pEvent.innerHTML = this.placeEvent.toLocaleUpperCase(); 
        }else{
            this.pEvent = this.shadowRoot.getElementById('place');
            this.pEvent.innerHTML = 'Lugar se llevara acabo el evento'; 
        }
    }

    assignInfoEntry(){
        if(this.infoEntries){
            this.iEntry = this.shadowRoot.getElementById('infoEntries');
            this.iEntry.innerHTML = this.infoEntries.toLocaleUpperCase(); 
        }else{
            this.iEntry = this.shadowRoot.getElementById('infoEntries');
            this.iEntry.innerHTML = 'Info entradas'; 
        }
    }

    attributeChangedCallback(att, oldValue, newValue) {
        if(att === 'dateTimeInfo'){
            this.dateTimeInfo = newValue;
        }else if(att === 'titleEvent'){
            this.titleEvent = newValue;
        }else if(att === 'placeEvent'){
            this.placeEvent = newValue;
        }else if(att === 'infoEntries'){
            this.infoEntries = newValue;
        }
    }

}

customElements.define('span-info', SpanInfo);