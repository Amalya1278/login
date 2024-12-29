document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
  
    const response = await fetch('http://localhost:8080/secure', {
      headers: { Authorization: `Bearer ${token}` },
    });
  
    const result = await response.json();
  
    if (response.ok) {
      document.getElementById('secureContent').textContent = result.message;
    } else {
      alert(result.error || 'Access denied');
      window.location.href = './index.html';
    }
  });
  