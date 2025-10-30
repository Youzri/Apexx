document.addEventListener("DOMContentLoaded", function () {
  // --- 1. Lead Source Capture ---
  const urlParams = new URLSearchParams(window.location.search);
  const leadSource = urlParams.get("source") || "organic"; // Default to "organic"
  const sourceInput = document.getElementById("sourceField");
  if (sourceInput) {
    sourceInput.value = leadSource;
  } // --- NEW: Client-side phone normalization ---

  function normalizePhoneJS(phone) {
    if (!phone) return "";
    return String(phone)
      .replace(/\s+|-|\(|\)/g, "") // Remove spaces, hyphens, and parentheses
      .replace(/^\+?964/, "") // Remove leading +964 or 964
      .replace(/^0/, ""); // Remove leading 0
  } // --- 2. Form Submission ---

  function handleFormSubmission(
    formElement,
    submitBtnElement,
    messageElement,
    sourceInputElement
  ) {
    formElement.addEventListener("submit", function (e) {
      e.preventDefault(); // Prevent the default form submission // --- NEW: Validation Check ---

      const phoneInput = formElement.querySelector('input[name="PhoneNumber"]');
      const normalizedPhone = normalizePhoneJS(phoneInput.value);
      const iraqPhoneRegex = /^7[345789]\d{8}$/; // 10 digits, starts with 7[3,4,5,7,8,9]

      if (!iraqPhoneRegex.test(normalizedPhone)) {
        messageElement.textContent =
          "الرجاء إدخال رقم هاتف عراقي صالح (مثل 07701234567)";
        messageElement.style.color = "red";
        phoneInput.focus(); // Put the cursor back in the phone field
        return; // Stop the submission
      } // --- End Validation Check ---
      const scriptURL =
        "https://script.google.com/macros/s/AKfycbz9sbxFw7jdhWQReBZyRv7QnHRmc4cSmUBbLhBzqICJaktAFLH1l85MPXbEvhAjaB6_fg/exec";

      submitBtnElement.disabled = true;
      submitBtnElement.textContent = "جاري الإرسال...";
      messageElement.textContent = "";

      if (sourceInputElement) {
        const urlParams = new URLSearchParams(window.location.search);
        const leadSource = urlParams.get("source") || "organic";
        sourceInputElement.value = leadSource;
      }

      const formData = new FormData(formElement);

      fetch(scriptURL, { method: "POST", body: formData })
        .then((response) => response.json())
        .then((data) => {
          if (data.result === "success") {
            messageElement.textContent =
              "تم استلام طلبك بنجاح! سيتم التواصل معك قريبا.";
            messageElement.style.color = "lightgreen";
            formElement.reset();
          } else {
            throw new Error(data.message || "An unknown error occurred.");
          }
        })
        .catch((error) => {
          console.error("Error!", error.message);
          messageElement.textContent =
            "حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.";
          messageElement.style.color = "red";
        })
        .finally(() => {
          submitBtnElement.disabled = false;
          submitBtnElement.textContent = "اطلب الان";
        });
    });
  } // Initialize form (Your old script only had form2, I'm keeping that logic)

  const form2 = document.getElementById("leadFormNew");
  const submitButton2 = document.getElementById("submitButtonNew");
  const formMessage2 = document.getElementById("formMessageNew");
  const sourceInput2 = document.getElementById("sourceFieldNew");
  if (form2) {
    handleFormSubmission(form2, submitButton2, formMessage2, sourceInput2);
  } // --- 3. Automatic Testimonial Slideshow ---

  const testimonialElement = document.getElementById("testimonialImage");
  if (testimonialElement) {
    const testimonialImages = [
      "Images/Review-001.png",
      "Images/Review-002.png",
      "Images/Review-003.png",
    ];
    let currentTestimonialIndex = 0;

    setInterval(() => {
      testimonialElement.style.opacity = 0;
      setTimeout(() => {
        currentTestimonialIndex++;
        if (currentTestimonialIndex >= testimonialImages.length) {
          currentTestimonialIndex = 0;
        }
        testimonialElement.src = testimonialImages[currentTestimonialIndex];
        testimonialElement.style.opacity = 1;
      }, 500);
    }, 3000);
  }
});
