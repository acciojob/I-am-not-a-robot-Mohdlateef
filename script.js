//your code here
document.addEventListener('DOMContentLoaded', function () {
  const images = document.querySelectorAll('img');
  const resetButton = document.getElementById('reset');
  const verifyButton = document.getElementById('verify');
  const para = document.getElementById('para');
  let clickedImages = [];

  // Function to shuffle array
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Function to check if all clicked images are identical
  function areImagesIdentical() {
    return clickedImages.every((img, index, array) => img === array[0]);
  }

  // Function to reset state
  function resetState() {
    clickedImages = [];
    resetButton.style.display = 'none';
    verifyButton.style.display = 'none';
    para.textContent = '';
    images.forEach(img => img.classList.remove('selected'));
  }

  // Function to handle image click
  function handleImageClick(event) {
    const clickedImg = event.target.classList[0];
    if (clickedImages.includes(clickedImg)) return;
    clickedImages.push(clickedImg);
    event.target.classList.add('selected');

    if (clickedImages.length === 2) {
      verifyButton.style.display = 'block';
    }
  }

  // Function to handle reset button click
  function handleResetClick() {
    resetState();
  }

  // Function to handle verify button click
  function handleVerifyClick() {
    verifyButton.style.display = 'none';
    if (areImagesIdentical()) {
      para.textContent = 'You are a human. Congratulations!';
    } else {
      para.textContent = 'We can\'t verify you as a human. You selected the non-identical tiles.';
    }
    resetButton.style.display = 'block';
  }

  // Assign event listeners
  images.forEach(img => {
    img.addEventListener('click', handleImageClick);
  });
  resetButton.addEventListener('click', handleResetClick);
  verifyButton.addEventListener('click', handleVerifyClick);

  // Randomly shuffle and assign images
  const imageClasses = ['img1', 'img2', 'img3', 'img4', 'img5', 'img6'];
  const shuffledClasses = shuffleArray([...imageClasses, ...imageClasses]);
  images.forEach((img, index) => {
    img.src = `image_${shuffledClasses[index]}.jpg`; // replace with actual image URLs
    img.classList.add(shuffledClasses[index]);
  });
});
