document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('form');

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const password = document.getElementById('password').value;

    // Simple validation
    if (name.trim() === '' || password.trim() === '') {
      alert('Please enter both name/email and password.');
      return;
    }

    // Simulating login (Replace with your actual login logic)
    if (name === 'admin@example.com' && password === 'password123') {
      // alert('Login successful!');
      // Redirect to the home page after successful login
      window.location.href = "home.html";
    } else {
      alert('Invalid credentials. Please try again.');
    }
    
  });
});
// reports note
document.querySelector('#add-btn').addEventListener('click', function() {
  document.querySelector('#notes').style.display = 'block';
})