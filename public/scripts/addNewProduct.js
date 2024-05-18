const newProductForm = document.getElementById('productForm')

newProductForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const fileInput = document.getElementById('slika_ime');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();

        // Convert file to a data URL
        reader.readAsDataURL(file);

        reader.onload = function() {
            // Create a Blob from the data URL
            const dataURL = reader.result;
            const blob = new Blob([dataURL]);

            console.log(URL.createObjectURL(blob))

            const formData = new FormData(newProductForm);
            formData.append('slika', blob, file.name);

            // Send the form data to the server
            fetch('/products', {
                method: 'POST',
                body: formData
            })
            .then(console.log("Success"))
            .catch(error => {
                console.error('Error:', error);
            });

        };

        reader.onerror = function(error) {
            console.error('Error reading file:', error);
        };
    }

    });

