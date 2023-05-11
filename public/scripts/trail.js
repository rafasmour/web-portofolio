//initialize coords variable
const coords = { x: 0, y: 0 };
//target all trail divs on DOM
const divs = document.querySelectorAll(".trail");

//every div starts on (x,y) => (0,0)
divs.forEach( (div) => {
    div.x = 0;
    div.y = 0;
});
//Event emitter when the mouse moves 
window.addEventListener("mousemove", (position) =>{
    //record mouse cords
    coords.x = position.clientX;
    coords.y = position.clientY;
    console.log(position.clientY, position.clientX);
});
//mouse trail function
function divTrail(){
    //get current mouse coords
    let x = coords.x;
    let y = coords.y;
    //loop for every trail div on the page
    divs.forEach( (div, index) => {
        //manipulate div element and give it the mouses position plus an offset of 5pxs
        div.style.left = x + "px";
        div.style.top = y + "px";
        div.x = x;
        div.y = y;
        //make each div smaller than the previous one  
        div.style.scale = (divs.length - index) / divs.length;

        //calculate the location of the next div
        const nextdiv = divs[index + 1] || divs[0];
        x += (nextdiv.x - x) * 0.1;
        y += (nextdiv.y - y) * 0.1;
    })
    //when the mouse leaves the window animate divs to go where it last left off
    requestAnimationFrame(divTrail);
}
//execute function
divTrail();
