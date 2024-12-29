document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    const response = await fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
  
    const result = await response.json();
  
    if (response.ok) {
      localStorage.setItem('token', result.token);
      alert('Login successful!');
      window.location.href = './secure.html';
    } else {
      alert(result.error || 'Login failed');
    }
  });
  