class printer {
    constructor(office, model, counter, sn, spare, state){
        this.office = office;
        this.model = model;
        this.counter = counter;
        this.sn = sn;
        this.spare = spare;
        this.state = state;
    }
}

// UI class hundle Ui

class UI {
      
    static displayprinters(){
        const printers = store.getprinters();
        printers.forEach((printer) => UI.addprinterToList(printer));
        const numbe = document.querySelectorAll('.no');
        for(let i = 0; i< numbe.length;i++){
            numbe[i].textContent=i+1;
        }
    } 


    static addprinterToList(printer){
        const list = document.getElementById('table-body');
        const row = document.createElement('tr'); 
        row.innerHTML = `
        <td data-label="no" class="no"></td>
        <td data-label="office">${printer.office}</td>
        <td data-label="model">${printer.model}</td>
        <td data-label="counter">${printer.counter}</td>
        <td data-label="sn" class="sn">${printer.sn}</td>
        <td data-label="spare">${printer.spare}</td>
        <td data-label="state">${printer.state}</td>
        <td data-label="changes">
        <a href="#" class="btn edit">EDIT</a>
        <a href="#" class="btn delete">REMOVE</a>
        </td>
        `;
        list.appendChild(row);
    }

    static deleteprinter(el){
        if(el.classList.contains('delete')){   
            el.parentElement.parentElement.remove(el);
            UI.shawAlert('deleted succesfully','delete');
            const numbe = document.querySelectorAll('.no');
        for(let i = 0; i< numbe.length;i++){
            numbe[i].textContent=i+1;
        }
        }
    }

    static editprinter(el){

        if(el.classList.contains('edit')){
            var tableRow = el.parentElement.parentElement.innerText;
            var inputMatrix = tableRow.split('\t');
            document.getElementById('office').value = inputMatrix[1];
            document.getElementById('model').value = inputMatrix[2];
            document.getElementById('sn').value = inputMatrix[3];
            document.getElementById('counter').value = inputMatrix[4];         
            document.getElementById('spare').value = inputMatrix[5];
            document.getElementById('state').value = inputMatrix[6];
            UI.shawAlert('ready to edit','edit');
            
        }
        
        // delete element after put its value for editing
        el.parentElement.parentElement.remove(el);

        const numbe = document.querySelectorAll('.no');
        for(let i = 0; i< numbe.length;i++){
            numbe[i].textContent=i+1;
        }
    }

    static shawAlert(message ,className){

        const div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#printer-form');
        container.insertBefore(div , form);
        setTimeout(()=> document.querySelector('.alert').remove(),2000);
    }

    static clearInputs (){
        document.getElementById('office').value = '';
        document.getElementById('model').value = '';
        document.getElementById('sn').value = '';
        document.getElementById('spare').value = '';
        document.getElementById('state').value = '';
    }
}

class store {
    static getprinters(){
        let printers;

        if(localStorage.getItem('printers') === null){
            printers = [];
        }
        else{
            printers = JSON.parse(localStorage.getItem('printers'));
        }
        return printers;
    }

    static addprinter(printer){
        const printers = store.getprinters();
        printers.push(printer);
        localStorage.setItem('printers',JSON.stringify(printers));
        
        const numbe = document.querySelectorAll('.no');
        for(let i = 0; i< numbe.length ;i++){
            numbe[i].textContent=i+1;
        }

    }

    
    static remprinters(el){
        const printers = store.getprinters();

        const mr = el.parentElement.parentElement.textContent;
        let mpr = mr.split("\n") ;
        
        printers.forEach((printer, index) => {
            console.log(mpr[4].trim());
            console.log(printer.sn.trim());
            if(mpr[4].trim() === printer.sn.trim()){
              printers.splice(index,1);
            }else{
              
            }
        });


        localStorage.setItem('printers', JSON.stringify(printers));
    }

}

document.addEventListener('DOMContentLoaded' , UI.displayprinters);

document.getElementById('printer-form').addEventListener('submit', (e)=> {
    e.preventDefault();
    const office = document.getElementById('office').value;
    const model = document.getElementById('model').value;
    const counter = document.getElementById('counter').value;
    const sn = document.getElementById('sn').value;
    const spare = document.getElementById('spare').value;
    const state = document.getElementById('state').value;  

    // validate
    if( office === '' || model === '' || counter === '' || sn === '' || spare === '' || state === '') 
    {
        UI.shawAlert('please fill in all inputs','delete');
    } else {
        const print = new printer(office, model, counter, sn, spare,state);
        store.addprinter(print);
        UI.addprinterToList(print);
        UI.clearInputs();
        UI.shawAlert('added succesfully','adding');
    }
    
});

const bodyTable = document.getElementById('table-body');
bodyTable.addEventListener('click', (e) =>
{
    
    if(e.target.className.indexOf('delete') > -1){
        // remove row 
        
        store.remprinters(e.target);
        UI.deleteprinter(e.target);
        
        
    }if (e.target.className.indexOf('edit') > -1) {

        // edit row
        
        store.remprinters(e.target);
        UI.editprinter(e.target);
    } else {
        
    }

});