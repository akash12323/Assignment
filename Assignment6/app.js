

const inp = document.querySelector('input');
const btn = document.querySelector('button');
const ul = document.querySelector('ul');

let isTrue = true;
let x;

btn.addEventListener('click',(event)=>{

    const lis = document.createElement('li');

    
    const deleteLi = document.createElement('i');
    deleteLi.innerHTML = `<i class="fas fa-trash-alt"></i>  `;

    const editLi = document.createElement('i');
    editLi.innerHTML = `<i class="fas fa-edit"></i>`;

    let inputText = inp.value;

    if(inputText == "" && isTrue == true){
        console.log('Enter the note');
    }
    else if(isTrue == true) {
        lis.innerHTML = " &nbsp &nbsp"+inputText;
        lis.prepend(deleteLi,editLi);
        ul.append(lis);
        inp.value = "";
    }
    
    lis.addEventListener('click',(e)=>{
        lis.classList.toggle('first');
    });

    //____________DELETE LIS_______________________________________
    deleteLi.addEventListener('click',(e)=>{
        lis.remove();
    });



    //___________EDIT LIS_________________________________________
    
    if(isTrue == false){
        lis.innerHTML = " &nbsp &nbsp"+inp.value;
        let color = x.getAttribute('backgroundColor');
        lis.style.backgroundColor = color;
        lis.prepend(deleteLi,editLi);
        ul.replaceChild(lis,x);
        inp.value = "";
        btn.innerText = "ADD ME";
        isTrue = true;
    }

    editLi.addEventListener('click',(e)=>{
        x = lis;
        inp.value = lis.innerText.slice(5);
        btn.innerText = "UPDATE";
        isTrue = false;
    });
    

    //_______RANDOM COLOR_________________________________________
    let randomInt = Math.floor(Math.random()*3) + 1;

    if(randomInt == 1){
        lis.style.backgroundColor = "lightblue";
    }
    else if(randomInt == 2){
        lis.style.backgroundColor = "lightsalmon";
    }
    else{
        lis.style.backgroundColor = "#f6bd60";
    }
    
});

