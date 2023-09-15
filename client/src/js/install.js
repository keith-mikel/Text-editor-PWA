const butInstall = document.getElementById('buttonInstall');

let deferredPrompt; // Store the deferred prompt for later use

// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the browser's default install prompt
  event.preventDefault();

  // Store the event for later use
  deferredPrompt = event;

  // Show the installation button
  butInstall.style.display = 'block';
});

// Click event handler for the installation button
butInstall.addEventListener('click', async () => {
  if (deferredPrompt) {
    // Show the installation prompt when the button is clicked
    deferredPrompt.prompt();

    // Wait for the user to make a choice
    const choiceResult = await deferredPrompt.userChoice;

    // Check if the user accepted the installation
    if (choiceResult.outcome === 'accepted') {
      console.log('PWA installed');
    } else {
      console.log('PWA installation declined');
    }

    // Reset the deferred prompt
    deferredPrompt = null;

    // Hide the installation button
    butInstall.style.display = 'none';
  }
});

// Event handler for the PWA installation completion
window.addEventListener('appinstalled', (event) => {
  console.log('PWA installed successfully');
});
