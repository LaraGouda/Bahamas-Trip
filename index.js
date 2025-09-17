let themeButton = document.getElementById("theme-button");

const toggleDarkMode = () => {
  document.body.classList.toggle("dark-mode");
}

themeButton.addEventListener("click", toggleDarkMode);


const submitButton = document.getElementById('rsvp-button');
let count = 3;

const addParticipant = (person) => {
  const newParticipant = document.createElement('p');

  newParticipant.textContent = `🎟️ ${person.name} from ${person.homeState} has RSVP'D`;
  newParticipant.style.fontSize = "16px";
  const participantsDiv = document.querySelector('.rsvp-participants');
  participantsDiv.appendChild(newParticipant);

  const oldCounter = document.getElementById('rsvp-count');
  oldCounter.remove();
  count = count + 1;

  const newCounter = document.createElement('p');
  newCounter.textContent = `⭐ ${count} people have RSVP'd to this event!`;
  newCounter.style.fontSize = "16px";
  newCounter.id = 'rsvp-count';

  participantsDiv.appendChild(newCounter);

}

const validateForm = (event) => {
  event.preventDefault();
  let containsErrors = false;
  var rsvpInputs = document.getElementById("rsvp-form").elements;

  let person = {
    name: rsvpInputs[0].value,
    homeState: rsvpInputs[1].value,
    email: rsvpInputs[2].value,
  }

  for (let i = 0; i  <rsvpInputs.length; i++) {
    const input = rsvpInputs[i];
    if (input.value.length < 2) {
      containsErrors = true;
      input.classList.add('error');
    }
    else {
      input.classList.remove('error');
    }
  }

  const userEmail = document.getElementById("email");
  if (!(userEmail.value.includes('@') && userEmail.value.includes('.com'))) {  // The instructions kept changing between "@" and ".com" so i added both
    containsErrors = true;
    userEmail.classList.add('error');
  }
  else {
    userEmail.classList.remove('error');
  }

  if (containsErrors == false) {
    addParticipant(person);
    toggleModal(person);
    for (let i = 0; i < rsvpInputs.length; i++) {
      rsvpInputs[i].value = "";
    }
  }

}

submitButton.addEventListener('click', validateForm);

const toggleModal = (person) => {
  let modal = 0;
    
  let fullModal = document.getElementById('success-modal');
  const modalContent = document.getElementById('text-in-modal');
  fullModal.style.display = "flex";
  modalContent.innerHTML = `Thanks for RSVPing, ${person.name}!<br>We can't wait to see you!<br><br>Pack your bags now! You're officially coming with us to the trip!`;

  let intervalId = setInterval(animateImage, 500);
  setTimeout(() => {
    fullModal.style.display = 'none';
    clearInterval(intervalId);
  }, 5000);

  let closeButton = document.getElementById("close-button");
  const toggleModalOff = () => {
    fullModal.style.display = 'none';
  }
  closeButton.addEventListener('click', toggleModalOff);
}

let rotateFactor = 0;
let modalImage = document.getElementById('cat-img');

const animateImage = () => {
  if (rotateFactor === 0) {
    rotateFactor = -10;
  }
  else {
    rotateFactor = 0;
  }

  modalImage.style.transform = `rotate(${rotateFactor}deg)`;
}
