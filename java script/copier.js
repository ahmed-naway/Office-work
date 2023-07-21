class photCopier {
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
      
    static displayphotCopiers(){
        const photCopiers = store.getphotCopiers();
        photCopiers.forEach((photCopier) => UI.addphotCopierToList(photCopier));
        const numbe = document.querySelectorAll('.no');
        for(let i = 0; i< numbe.length;i++){
            numbe[i].textContent=i+1;
        }
    } 


    static addphotCopierToList(photCopier){
        const list = document.getElementById('table-body');
        const row = document.createElement('tr'); 
        row.innerHTML = `
        <td data-label="no" class="no"></td>
        <td data-label="office">${photCopier.office}</td>
        <td data-label="model">${photCopier.model}</td>
        <td data-label="counter">${photCopier.counter}</td>
        <td data-label="sn" class="sn">${photCopier.sn}</td>
        <td data-label="spare">${photCopier.spare}</td>
        <td data-label="state">${photCopier.state}</td>
        <td data-label="changes">
        <a href="#" class="btn edit">EDIT</a>
        <a href="#" class="btn delete">REMOVE</a>
        </td>
        `;
        list.appendChild(row);
    }

    static deletephotCopier(el){
        if(el.classList.contains('delete')){   
            el.parentElement.parentElement.remove(el);
            UI.shawAlert('deleted succesfully','delete');
            const numbe = document.querySelectorAll('.no');
        for(let i = 0; i< numbe.length;i++){
            numbe[i].textContent=i+1;
        }
        }
    }

    static editphotCopier(el){

        if(el.classList.contains('edit')){
            var tableRow = el.parentElement.parentElement.innerText;
            var inputMatrix = tableRow.split('\t');
            document.getElementById('office').value = inputMatrix[1];
            document.getElementById('model').value = inputMatrix[2];
            document.getElementById('counter').value = inputMatrix[3];
            document.getElementById('sn').value = inputMatrix[4];
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
        const form = document.querySelector('#photCopier-form');
        container.insertBefore(div , form);
        setTimeout(()=> document.querySelector('.alert').remove(),2000);
    }

    static clearInputs (){
        document.getElementById('office').value = '';
        document.getElementById('model').value = '';
        document.getElementById('counter').value = '';
        document.getElementById('sn').value = '';
        document.getElementById('spare').value = '';
        document.getElementById('state').value = '';
    }
}

class store {
    static getphotCopiers(){
        let photCopiers;

        if(localStorage.getItem('photCopiers') === null){
            photCopiers = [];
        }
        else{
            photCopiers = JSON.parse(localStorage.getItem('photCopiers'));
        }
        return photCopiers;
    }

    static addphotCopier(photCopier){
        const photCopiers = store.getphotCopiers();
        photCopiers.push(photCopier);
        localStorage.setItem('photCopiers',JSON.stringify(photCopiers));
        
        const numbe = document.querySelectorAll('.no');
        for(let i = 0; i< numbe.length ;i++){
            numbe[i].textContent=i+1;
        }

    }

    
    static remphotCopiers(el){
        const photCopiers = store.getphotCopiers();

        const mr = el.parentElement.parentElement.textContent;
        let mpr = mr.split("\n") ;
        
        photCopiers.forEach((photCopier, index) => {
            console.log(mpr[4].trim());
            console.log(photCopier.counter.trim());
            if(mpr[4].trim() === photCopier.counter.trim()){
              photCopiers.splice(index,1);
               console.log('oh yeah');
            }else{
              console.log('fuck again 22');
            }
        });


        localStorage.setItem('photCopiers', JSON.stringify(photCopiers));
    }

}

document.addEventListener('DOMContentLoaded' , UI.displayphotCopiers);

document.getElementById('photCopier-form').addEventListener('submit', (e)=> {
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
        const print = new photCopier(office, model, counter, sn, spare,state);
        store.addphotCopier(print);
        UI.addphotCopierToList(print);
        UI.clearInputs();
        UI.shawAlert('added succesfully','adding');
    }
    
});


const bodyTable = document.getElementById('table-body');

bodyTable.addEventListener('click', (e) =>
{
    
    if(e.target.className.indexOf('delete') > -1){
        // remove row 
        
        store.remphotCopiers(e.target);
        UI.deletephotCopier(e.target);
        
        
    }if (e.target.className.indexOf('edit') > -1) {

        // edit row
        
        store.remphotCopiers(e.target);
        UI.editphotCopier(e.target);
    } else {
        
    }

});


let filter = document.getElementById('filter');
filter.addEventListener('keyup', filterNames);

function filterNames(){
    let filterValue = 
    document.getElementById('filter').value.toUpperCase();
    let table = document.getElementById('table-body');
    let li =table.querySelectorAll('tr');
    console.log(li);
   for(let i = 0; i< li.length ;i++){

            let tex = li[i].innerText;

        }
}



