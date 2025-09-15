// SIGNUP Logic
if (document.getElementById('signup-form')) {
  document.getElementById('signup-form').addEventListener('submit', function(e) {
    e.preventDefault();
    var email = document.getElementById('signup-email').value.trim();
    var password = document.getElementById('signup-password').value.trim();
    var users = JSON.parse(localStorage.getItem('users') || '{}');
    if (users[email]) {
      alert('User already exists!');
    } else {
      users[email] = password;
      localStorage.setItem('users', JSON.stringify(users));
      alert('Sign up successful! Please log in.');
      window.location.href = 'index.html'; // Redirect to login
    }
  });
}

// LOGIN Logic
if (document.getElementById('login-form')) {
  document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    var email = document.getElementById('login-email').value.trim();
    var password = document.getElementById('login-password').value.trim();
    var users = JSON.parse(localStorage.getItem('users') || '{}');
    if (users[email] && users[email] === password) {
      alert('Login successful!');
      // Redirect to your main app page or show logged-in content
    } else {
      alert('Invalid credentials!');
    }
  });
}
