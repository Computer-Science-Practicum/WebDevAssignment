window.onload= async ()=>{
    console.log("loaded")

    list = await fetch_List();
    console.log("list",list)
    for(let x of list){
        document.getElementById("elements").innerHTML+=ele(x.id,x.id)
    }
    setFace(list[0])

    // when updating an element status
    document.getElementById('btns').addEventListener("click",(event)=>{
        if(event.target.className=="Sbtn")
        {
            console.log(event.target.innerHTML)
            setElement(current,event.target.innerHTML);
            // list[current].status=event.target.innerHTML;
            document.getElementById("currentEleS").innerHTML = event.target.innerHTML
            
        }
    })

    // when selecting one element from list
    document.querySelector("#elements").addEventListener("click",(event)=>{
        if(event.target.className=="element")
        {
            console.log("element clicked",event.target.innerHTML)
            current=parseInt(event.target.id.substr(3))
            setFace(getElement(current))
        }
        event.stopPropagation();
    })

}
function ele(i,id){
   return `<div class="element" id="ele${id}">Person id:${i}</div>`
}

function setFace(face) {
    document.getElementById("currentEleH").innerHTML = face.id
    document.getElementById("currentEleS").innerHTML = face.status
    addFrameToImage(staticURL + face.url, face.x, face.y, face.w, face.h)
}

// add red frame of 2px to the image
addFrameToImage = (image_url, x, y, w, h) => {
    let img = document.createElement("img")
    img.src = image_url
    img.onload = () => {
        let canvas = document.createElement("canvas")
        canvas.width = img.width
        canvas.height = img.height
        let ctx = canvas.getContext("2d")
        ctx.drawImage(img, 0, 0)
        ctx.strokeStyle = "red"
        ctx.lineWidth = 5
        ctx.strokeRect(x, y, w, h)
        document.getElementById("image").innerHTML = ""
        document.getElementById("image").appendChild(canvas)
    }
}

// **************************************
staticURL="http://127.0.0.1:5000"
url="http://127.0.0.1:5000/api"

async function CallApi(url, method, data) { 

    // Access to fetch at 'http://localhost:5000/api/get_all_image_info' from origin 'http://127.0.0.1:5000' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access - Control - Allow - Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled


    let headerlist = {
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
    let body = null;
    if (data) {
        body = JSON.stringify(data)
    }
    let response = await fetch(url, {
        method: method,
        headers: headerlist,
        body: body
    })

    let result = await response.json()

    return result
}


list=[]
async function fetch_List(){
    list = await CallApi(url+"/get_all_image_info","GET").then((data)=>{
        console.log(data)
        return data.image_info;
    }
    )
    return list
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
// for(let i=0;i<10;i++){
//     list[i]={
//         key:i,
//         status:"Unclassified"
//     }
// }