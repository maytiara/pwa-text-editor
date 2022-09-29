const conditionInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {

  // Store the triggered events
  window.deferredPrompt = event;

  // Remove the hidden class from the button.
  conditionInstall.classList.toggle('hidden', false);
});

// click event handler on the `conditionInstall` element
conditionInstall.addEventListener('click', async () => {

  const promptEvent = window.deferredPrompt;

  if (!promptEvent) {
   return;
  }

  // Show prompt
  promptEvent.prompt();
  
  // Reset the deferred prompt variable, it can only be used once.
  window.deferredPrompt = null;
  
  // classList allows the manipulation of element's class
  conditionInstall.classList.toggle('hidden', true);
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {});
