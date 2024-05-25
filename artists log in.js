
const details = document.querySelectorAll('input')
const btn = document.querySelector('.submit')
const msg = document.querySelector('.message')
const email = document.querySelector('.email');
const form = document.querySelector('form');


btn.addEventListener('click', async (e) => {
    e.preventDefault();
    msg.innerText = ''

    if (!details) {
        msg.innerText = 'All fields must be filled'
    }
    else {
        let user = {
            email: email.value,
            password: password.value
        }
        loginUser(user)

    }
})

async function loginUser(data) {
    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const jsonData = await response.json();
            throw new Error(jsonData.error);
        }

        const { token, name } = await response.json();

        //Store the token and user ID in localStorage for subsequent requests
        localStorage.setItem('token', token);
        localStorage.setItem('name', name);


        form.reset();

        // // Redirect to the home page
        window.location.href = 'home.html';
    } catch (error) {
        msg.textContent = error.message;
    }

}
