document.addEventListener("DOMContentLoaded", function () {
    
    // --- 1. Lead Source Capture ---
    const urlParams = new URLSearchParams(window.location.search);
    const leadSource = urlParams.get("source") || "organic"; // Default to "organic"
    
    const sourceInput = document.getElementById("sourceField");
    if (sourceInput) {
        sourceInput.value = leadSource;
    }

    // --- 2. Form Submission ---
    // Function to handle form submission
    function handleFormSubmission(formElement, submitBtnElement, messageElement, sourceInputElement) {
        formElement.addEventListener("submit", function (e) {
            e.preventDefault(); // Prevent the default form submission

            // *** IMPORTANT: Paste your Google Apps Script URL here ***
            const scriptURL = "PASTE_YOUR_DEPLOYED_WEB_APP_URL_HERE";

            // Show loading state
            submitBtnElement.disabled = true;
            submitBtnElement.textContent = "جاري الإرسال...";
            messageElement.textContent = "";

            // Set lead source if available
            if (sourceInputElement) {
                const urlParams = new URLSearchParams(window.location.search);
                const leadSource = urlParams.get("source") || "organic"; // Default to "organic"
                sourceInputElement.value = leadSource;
            }

            const formData = new FormData(formElement);

            fetch(scriptURL, { method: "POST", body: formData })
                .then(response => response.json())
                .then(data => {
                    if (data.result === "success") {
                        // Success!
                        messageElement.textContent = "تم استلام طلبك بنجاح! سيتم التواصل معك قريبا.";
                        messageElement.style.color = "lightgreen";
                        formElement.reset(); // Clear the form
                    } else {
                        // Error from our script
                       throw new Error(data.message || "An unknown error occurred.");
                    }
                })
                .catch(error => {
                    // Network error or script error
                    console.error("Error!", error.message);
                    messageElement.textContent = "حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.";
                    messageElement.style.color = "red";
                })
                .finally(() => {
                    // Re-enable the button
                    submitBtnElement.disabled = false;
                    submitBtnElement.textContent = "اطلب الان";
                });
        });
    }

    // Initialize first form
    const form1 = document.getElementById("leadForm");
    const submitButton1 = document.getElementById("submitButton");
    const formMessage1 = document.getElementById("formMessage");
    const sourceInput1 = document.getElementById("sourceField");
    if (form1) { // Check if form exists
        handleFormSubmission(form1, submitButton1, formMessage1, sourceInput1);
   }

    // Initialize new form
    const form2 = document.getElementById("leadFormNew");
    const submitButton2 = document.getElementById("submitButtonNew");
    const formMessage2 = document.getElementById("formMessageNew");
    const sourceInput2 = document.getElementById("sourceFieldNew");
    if (form2) { // Check if form exists
         handleFormSubmission(form2, submitButton2, formMessage2, sourceInput2);
}

    // --- 3. Automatic Testimonial Slideshow ---
    const testimonialElement = document.getElementById('testimonialImage');
    
    if (testimonialElement) {
        const testimonialImages = [
            'Images/Review-001.png',
            'Images/Review-002.png',
            'Images/Review-003.png'
        ];
        let currentTestimonialIndex = 0;

        // Set an interval to change the image
        setInterval(() => {
            // 1. Fade out the current image
             testimonialElement.style.opacity = 0;

            // 2. Wait for the fade-out (0.5s) to finish
            setTimeout(() => {
                // 3. Move to the next image in the list
                currentTestimonialIndex++;
                if (currentTestimonialIndex >= testimonialImages.length) {
                    currentTestimonialIndex = 0; // Loop back to the start
                }
                
                // 4. Update the image source
                testimonialElement.src = testimonialImages[currentTestimonialIndex];
                
                // 5. Fade the new image back in
               testimonialElement.style.opacity = 1;
                
            }, 500); // This time (500ms) MUST match your CSS transition time (0.5s)

        }, 3000); // Change image every 4 seconds (4000ms)
    }

});