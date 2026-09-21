// Immediately apply the theme based on localStorage

(function() {
  const darkMode = localStorage.getItem('darkMode');
  const themeClass = darkMode === 'enabled' ? 'dark-mode' : 'light-mode';

  // Apply the theme class to the document immediately
  document.documentElement.className = themeClass;

  // Wait for DOMContentLoaded to set up event listeners
  document.addEventListener('DOMContentLoaded', () => {
      const darkModeToggle = document.getElementById('dark-mode-toggle');
      const lightModeToggle = document.getElementById('light-mode-toggle');

      const toggleMode = (isDarkMode) => {
          document.documentElement.classList.toggle('dark-mode', isDarkMode);
          localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
          updateToggleButtons(isDarkMode);
      };

      const updateToggleButtons = (isDarkMode) => {
          // Garde : si les boutons n'existent pas encore dans le DOM (rendu React
          // pas encore terminé), on ne fait rien au lieu de planter.
          if (!darkModeToggle || !lightModeToggle) return;

          if (isDarkMode) {
              darkModeToggle.classList.remove('activate');
              lightModeToggle.classList.add('activate');
          } else {
              lightModeToggle.classList.remove('activate');
              darkModeToggle.classList.add('activate');
          }
      };

      // Add event listeners if elements are present
      if (darkModeToggle && lightModeToggle) {
          // Initial activation based on current theme — appelé seulement si
          // les boutons existent réellement.
          updateToggleButtons(themeClass === 'dark-mode');

          darkModeToggle.addEventListener('click', () => toggleMode(true));
          lightModeToggle.addEventListener('click', () => toggleMode(false));
      }
  });
})();