//initiall elements
let imageContainer = document.querySelector("#image-container")
let productImage = document.querySelector("#product-image")
let overlay = document.querySelector("#overlay")
let mouseOverlay = document.querySelector("#mouse-overlay")

//events object (stores events for touch, mouse)
let events = {
  mouse: {
    move: "mousemove",
  },
  touch: {
    move: "touchmove",
  },
}

//initially blank
let deviceType = ""

//check for device type
function isTouchDevice() {
  try {
    deviceType = "touch"
    document.createEvent("TouchEvent")
    return true
  } catch (e) {
    deviceType = "mouse"
    return false
  }
}

//hides overlay
const hideElement = () => {
  overlay.style.display = "none"
  mouseOverlay.style.display = "none"
}

//check device
isTouchDevice()

imageContainer.addEventListener(events[deviceType].move, (e) => {
  try {
    //return the position of cursor from top left screen
    var x = !isTouchDevice() ? e.pageX : e.touches[0].pageX
    var y = !isTouchDevice() ? e.pageY : e.touches[0].pageY
  } catch (e) {}

  //get image height and width
  let imageWidth = imageContainer.offsetWidth
  let imageHeight = imageContainer.offsetHeight

  //check if mouse goes out of image container
  if (
    imageWidth - (x - imageContainer.offsetLeft) < 15 ||
    x - imageContainer.offsetLeft < 15 ||
    imageHeight - (y - imageContainer.offsetTop) < 15 ||
    y - imageContainer.offsetTop < 15
  ) {
    hideElement()
  } else {
    overlay.style.display = "block"
    mouseOverlay.style.display = "inline-block"
  }

  var posX = ((x - imageContainer.offsetLeft) / imageWidth).toFixed(4) * 100
  var posY = ((y - imageContainer.offsetTop) / imageHeight).toFixed(4) * 100

  //set background position in overlay
  overlay.style.backgroundPosition = posX + "%" + posY + "%"

  //move the overlay with cursor
  mouseOverlay.style.top = y + "px"
  mouseOverlay.style.left = x + "px"
})
