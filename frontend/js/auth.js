async function handleFormSubmit(event, endpoint) {
    event.preventDefault();
    
    let isRegister = endpoint === '/api/auth/register';
    
    let formData = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };

    if (isRegister) {
        formData.name = document.getElementById('name').value;
        formData.role = document.getElementById('role').value;
        formData.age = document.getElementById('age').value || null;
        if(formData.role === 'doctor') {
            formData.specialization = document.getElementById('specialization').value || 'General';
        }
    }

    try {
        const response = await fetch(`http://localhost:5000${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        const data = await response.json();
        
        const errorAlert = document.getElementById('errorAlert');

        if (!response.ok) {
            errorAlert.textContent = data.message || 'Authentication Failed';
            errorAlert.classList.remove('d-none');
        } else {
            errorAlert.classList.add('d-none');
            // Store token and user info
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data));
            
            // Redirect based on role
            if(data.role === 'admin') window.location.href = 'admin/dashboard.html';
            else if(data.role === 'doctor') window.location.href = 'doctor/dashboard.html';
            else window.location.href = 'patient/dashboard.html';
        }
    } catch (err) {
        console.error('Auth Error: ', err);
    }
}

// Attach listeners based on page
const loginForm = document.getElementById('loginForm');
if(loginForm) {
    loginForm.addEventListener('submit', (e) => handleFormSubmit(e, '/api/auth/login'));
}

const registerForm = document.getElementById('registerForm');
if(registerForm) {
    registerForm.addEventListener('submit', (e) => handleFormSubmit(e, '/api/auth/register'));
}

// Toggle extra fields for doctor
const roleSelect = document.getElementById('role');
const specDiv = document.getElementById('specializationDiv');
if(roleSelect) {
    roleSelect.addEventListener('change', (e) => {
        if(e.target.value === 'doctor') {
            specDiv.classList.remove('d-none');
        } else {
            specDiv.classList.add('d-none');
        }
    });
}
