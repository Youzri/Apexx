/*
  This script should be placed just before the closing </body> tag on your sales page.
  It finds a hidden input field with the id "sourceField" and populates its value
  from the "source" parameter in the page's URL.
*/

document.addEventListener("DOMContentLoaded", function () {
  // 1. Create a URLSearchParams object to easily access query parameters.
  const urlParams = new URLSearchParams(window.location.search);

  // 2. Get the value of the "source" parameter.
  // If the parameter doesn't exist, it defaults to "organic".
  const leadSource = urlParams.get("source") || "organic";

  // 3. Find the hidden input field in your form.
  // Make sure your form has this exact line: <input type="hidden" id="sourceField" name="source">
  const sourceInput = document.getElementById("sourceField");

  // 4. If the field exists, set its value.
  if (sourceInput) {
    sourceInput.value = leadSource;
  }
});