// Get the form and the input fields
const form = document.querySelector('form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const messageInput = document.querySelector('#message');

// Add an event listener to the form's submit event
form.addEventListener('submit', e => {
  e.preventDefault(); // Prevent the default form submission

  // Get the input values
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();

  // Validate the inputs
  if (name === '' || email === '' || message === '') {
    alert('Please fill in all the fields.'); // Show an alert message if any of the fields are empty
    return;
  }

  // Send the form data to the server using fetch API
  fetch('https://example.com/api/contact', {
    method: 'POST',
    body: JSON.stringify({
      name,
      email,
      message
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) {
      alert('Thank you for contacting us! We will get back to you soon.'); // Show a success message
      form.reset(); // Clear the form inputs
    } else {
      throw new Error('Something went wrong.'); // Throw an error if the server responded with an error status code
    }
  })
  .catch(error => {
    alert(error.message); // Show an error message
  });
});
