// Google Sign-In callback function
function handleGoogleSignIn(response) {
  // Decode the JWT token
  const payload = parseJwt(response.credential);
  
  // Display user information
  displayUserInfo(payload);
  
  // Hide login forms
  document.getElementById('loginForm').style.display = 'none';
  document.getElementById('signupForm').style.display = 'none';
  
  console.log('Google Sign-In successful:', payload);
}

// Function to parse JWT token
function parseJwt(token) {
  const base64Url = token.split('.')[20];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  
  return JSON.parse(jsonPayload);
}

// Function to display user information
function displayUserInfo(userInfo) {
  const container = document.querySelector('.container .forms');
  
  container.innerHTML = `
    <div class="user-info" style="display: block;">
      <img src="${userInfo.picture}" alt="Profile Picture">
      <h3>Welcome, ${userInfo.name}!</h3>
      <p>Email: ${userInfo.email}</p>
      <button class="btn" onclick="signOut()">Sign Out</button>
    </div>
  `;
}

// Sign out function
function signOut() {
  google.accounts.id.disableAutoSelect();
  location.reload();
}

// Traditional form toggle functions
document.addEventListener('DOMContentLoaded', function() {
  const showSignup = document.getElementById('showSignup');
  const showLogin = document.getElementById('showLogin');
  
  if (showSignup) {
    showSignup.onclick = function(e) {
      e.preventDefault();
      document.getElementById('loginForm').style.display = 'none';
      document.getElementById('signupForm').style.display = 'block';
    };
  }
  
  if (showLogin) {
    showLogin.onclick = function(e) {
      e.preventDefault();
      document.getElementById('signupForm').style.display = 'none';
      document.getElementById('loginForm').style.display = 'block';
    };
  }
});

// Initialize Google Sign-In when page loads
window.onload = function() {
  // The Google Sign-In will auto-prompt due to data-auto_prompt="true"
  console.log('Page loaded - Google Sign-In initialized');
};
