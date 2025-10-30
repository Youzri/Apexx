document.addEventListener("DOMContentLoaded", function () {
  // --- 1. Lead Source Capture ---
  const urlParams = new URLSearchParams(window.location.search);
  const leadSource = urlParams.get("source") || "organic"; // Default to "organic"
  const sourceInput = document.getElementById("sourceFieldNew");
  if (sourceInput) {
    sourceInput.value = leadSource;
  }

  // --- Client-side phone normalization ---
  function normalizePhoneJS(phone) {
    if (!phone) return "";
    return String(phone)
      .replace(/\s+|-|\(|\)/g, "")
      .replace(/^\+?964/, "")
      .replace(/^0/, "");
  }

  // --- 2. Form Submission ---
  function handleFormSubmission(
    formElement,
    submitBtnElement,
    messageElement,
    sourceInputElement
  ) {
    formElement.addEventListener("submit", function (e) {
      e.preventDefault();

      // --- Validation Check ---
      const phoneInput = formElement.querySelector('input[name="PhoneNumber"]');
      const normalizedPhone = normalizePhoneJS(phoneInput.value);
      const iraqPhoneRegex = /^7[345789]\d{8}$/;

      if (!iraqPhoneRegex.test(normalizedPhone)) {
        messageElement.textContent =
          "الرجاء إدخال رقم هاتف عراقي صالح (مثل 07701234567)";
        messageElement.style.color = "red";
        phoneInput.focus();
        return;
      }
      // --- End Validation Check ---

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
            // --- FASTER REDIRECT ---
            // The success message and timeout are removed.
            // We redirect immediately to the thank-you page.
            window.location.href = "thank-you.html";
            // --- End New Feature ---
          } else {
            throw new Error(data.message || "An unknown error occurred.");
          }
        })
        .catch((error) => {
          console.error("Error!", error.message);
          messageElement.textContent =
            "حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.";
          messageElement.style.color = "red";
          // Re-enable button on error
          submitBtnElement.disabled = false;
          submitBtnElement.textContent = "اطلب الان";
        });
      // Note: .finally() was removed because we only want to re-enable
      // the button IF an error occurs. On success, we redirect.
    });
  }

  // --- Initialize form2 ---
  const form2 = document.getElementById("leadFormNew");
  const submitButton2 = document.getElementById("submitButtonNew");
  const formMessage2 = document.getElementById("formMessageNew");
  const sourceInput2 = document.getElementById("sourceFieldNew");
  if (form2) {
    handleFormSubmission(form2, submitButton2, formMessage2, sourceInput2);
  }

  // --- 3. Automatic Testimonial Slideshow ---
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
