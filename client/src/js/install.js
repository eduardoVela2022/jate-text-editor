// Install button
const butInstall = document.getElementById("buttonInstall");

// Logic for installing the PWA

// Before showing the install prompt
// Save the prompt event in the "deferredPrompt" variable for later use
// And show the install button
window.addEventListener("beforeinstallprompt", (event) => {
  window.deferredPrompt = event;
  butInstall.classList.toggle("hidden", false);
});

// Adds and handles the install button's event listener
butInstall.addEventListener("click", async () => {
  // Gets the prompt event from the "deferredPrompt" variable
  const promptEvent = window.deferredPrompt;

  // If no event exists, return
  if (!promptEvent) {
    return;
  }

  // Prompt the user the install prompt
  promptEvent.prompt();

  // Reset the "deferredPrompt" variable
  window.deferredPrompt = null;

  // Hide the install button
  butInstall.classList.toggle("hidden", true);
});

// If the app was installed, reset the "deferredPrompt" variable
window.addEventListener("appinstalled", (event) => {
  window.deferredPrompt = null;
});
