let spinner = document.getElementById('loader');
let overlay = document.getElementById('overlay');
let submitBtn = document.getElementById('submit-btn');
let output = document.getElementById('output');

submitBtn.addEventListener('click', async(e) => {
    e.preventDefault();
    let name = document.getElementById('name').value;
    let contactNumber = document.getElementById('phone').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    console.log(name, contactNumber, email, password);
    console.log(spinner)
    spinner.style.display = "block"; 
    overlay.style.display = "block";
    setTimeout(() => {
        axios.post('/api/v1/register', {
            name: name,
            contactNumber: contactNumber,
            email: email,
            password: password
        })
        .then(data => {
            spinner.style.display = "none"; // Hide the spinner
            overlay.style.display = "none"; // Hide the spinner
            console.log(data)
            output.innerHTML = data.data.msg
            name = "";
            contactNumber = "";
            email = "";
            password = "";
        })
        .catch(error => { 
            spinner.style.display = "none"; // Hide the spinner
            overlay.style.display = "none"; // Hide the spinner
            output.innerHTML = error.response.data.msg
        });
    }, 2000);
})