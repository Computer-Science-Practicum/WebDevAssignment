window.onload = async () => {
    console.log("loaded")

    list = await fetch_List();
    console.log("list", list)
    for (let x of list) {
        document.getElementById("elements").innerHTML += ele(x.id, x.id, x.status)
    }
    setFace(list[0])

    // when updating an element status
    document.getElementById('btns').addEventListener("click", async (event) => {
        if (event.target.className == "Sbtn") {
            console.log(event.target.innerHTML)
            await setElement(current, event.target.innerHTML);
            // list[current].status=event.target.innerHTML;
            document.getElementById("currentEleS").innerHTML = event.target.innerHTML
            status_class = map_status_to_class(event.target.innerHTML);
            console.log("stus", status_class)

            document.getElementById("ele" + current).className = "element "+ status_class;
        }
    })

    // when selecting one element from list
    document.querySelector("#elements").addEventListener("click", (event) => {
        if (hasClass(event.target, "element")){
            console.log("element clicked", event.target.innerHTML)
            current = parseInt(event.target.id.substr(3))
            setFace(getElement(current))
        }
        event.stopPropagation();
    })

}
function map_status_to_class(status) { 
    if (status == "Criminal") {
        return "status_Criminal"
    }
    else if (status == "Not Criminal") {
        return "status_NonCriminal"
    }
    else if (status == "Junk") {
        return "status_Junk"
    }
    else {
        return "Unclassified"
    }
}

function ele(i, id, status) {
    status_class = map_status_to_class(status);

    return `<div class="element ${status_class}" id="ele${id}"  >Person id:${i}</div>`
}

function hasClass(element, className) { 
    return (' ' + element.className + ' ').indexOf(' ' + className+ ' ') > -1;
}

function setFace(face) {
    current = face.id
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
staticURL = "http://127.0.0.1:5000"
url = "http://127.0.0.1:5000/api"

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


list = []
async function fetch_List() {
    list = await CallApi(url + "/get_all_image_info", "GET").then((data) => {
        console.log(data)
        return data.image_info;
    }
    )
    return list
}
async function setElement(id, status) {
    console.log("updating", id, status)
    await CallApi(url + "/update_image_status", "POST", {
        id: id,
        "status": status
    }).then((data) => {
        // console.log(data)
        notify("Person with id:" + id + " status updated successfully ");
    })
}
function getElement(i) {
    // return ith element
    return list[i-1];
}

function notify(msg) {
    document.getElementById("notify").innerHTML = msg;
    document.getElementById("notify").style.display = "block";
    setTimeout(() => {
        document.getElementById("notify").innerHTML = "";
        document.getElementById("notify").style.display = "none";
    }, 2000)
}

current = null
// for(let i=0;i<10;i++){
//     list[i]={
//         key:i,
//         status:"Unclassified"
//     }
// }