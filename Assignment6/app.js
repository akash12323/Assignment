

const inp = document.querySelector('input');
const btn = document.querySelector('button');
const ul = document.querySelector('ul');

let isTrue = true;

btn.addEventListener('click',(event)=>{

    const lis = document.createElement('li');

    const deleteLi = document.createElement('input');
    deleteLi.setAttribute('type','image');
    deleteLi.setAttribute('width','38');
    deleteLi.setAttribute('height','38');
    deleteLi.setAttribute('src','https://cdn.iconscout.com/icon/premium/png-512-thumb/delete-1432400-1211078.png');
    deleteLi.setAttribute('name','submit');

    const editLi = document.createElement('input');
    editLi.setAttribute('type','image');
    editLi.setAttribute('width','38');
    editLi.setAttribute('height','38');
    editLi.setAttribute('name','submit');
    editLi.setAttribute('src','https://cdn0.iconfinder.com/data/icons/set-app-incredibles/24/Edit-01-512.png');

    let inputText = inp.value;

    if(inputText == "" && isTrue == true){
        console.log('Enter the note');
    }
    else if(isTrue == true) {
        lis.innerHTML = " &nbsp &nbsp"+ inputText;
        ul.append(lis);
        lis.prepend(deleteLi,editLi);
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
        const x = document.querySelector('.second');
        x.classList.remove('first');
        x.innerHTML = " &nbsp &nbsp" + inputText;
        x.prepend(deleteLi,editLi);
        inp.value = ""; 
        isTrue = true;
    }

    editLi.addEventListener('click',(e)=>{
        lis.classList.add('second');
        inp.value = lis.innerText.slice(4);
        lis.classList.add('second');
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