window.onload=()=>{
    console.log("loaded")

    list=fetch_List();
    for(let x of list){
        document.getElementById("elements").innerHTML+=ele(x.key,x.key)
    }

    // when updating an element status
    document.getElementById('btns').addEventListener("click",(event)=>{
        if(event.target.className=="Sbtn")
        {
            console.log(event.target.innerHTML)
            setElement(current,event.target.innerHTML);
            // list[current].status=event.target.innerHTML;
            document.getElementById("currentEleS").innerHTML=event.target.innerHTML
        }
    })

    // when selecting one element from list
    document.querySelector("#elements").addEventListener("click",(event)=>{
        if(event.target.className=="element")
        {
            console.log("element clicked",event.target.innerHTML)
            current=parseInt(event.target.id.substr(3))
            document.getElementById("currentEleH").innerHTML=event.target.innerHTML
            // document.getElementById("currentEleS").innerHTML=list[current].status
            document.getElementById("currentEleS").innerHTML=getElement(current).status
        }
        event.stopPropagation();
    })

}
function ele(i,id){
   return `<div class="element" id="ele${id}">element ${i}</div>`
}

// **************************************
function fetch_List(){
    return list;
}
function setElement(i,status,key){
    if(status)
        list[i].status=status;
    if(key)
        list[i].key=key;
}
function getElement(i){
    return list[i];
}


current=null
list=[]
for(let i=0;i<10;i++){
    list[i]={
        key:i,
        status:"Unclassified"
    }
}