// Set the date we're counting down to
const timer = document.querySelector(".timer");
//const countDownDate = new Date(timer.id).getTime();
const countDownDate = new Date().getTime() + 2 * 3600 * 1000;
// Update the count down every 1 second
var x = setInterval(function () {
  // Get today's date and time
  const now = new Date().getTime();

  // Find the distance between now and the count down date
  const distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  timer.innerHTML = hours + "h " + minutes + "m " + seconds + "s ";
  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    timer.innerHTML = "EXPIRED";
  }
}, 1000);
