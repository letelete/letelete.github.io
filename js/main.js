import { Theme } from "./theme.js";

const theme = new Theme();

window.onload = function() {
  fadeInDocumentBody();
  theme.applyPreferedThemeOrDefault();
  initializeThemeCheckbox();
};

const fadeInDocumentBody = () => (document.body.style.opacity = "1");

const initializeThemeCheckbox = () => {
  const checkbox = document.getElementsByClassName("switch-theme")[0];
  if (!checkbox) {
    console.log("Theme checkbox object is null.");
    return null;
  }
  checkbox.checked = theme.currentTheme == Theme.darkThemeKey;
  checkbox.addEventListener("change", function() {
    performPageTransition();
    const newTheme = this.checked ? Theme.darkThemeKey : Theme.lightThemeKey;
    theme.updatePreferedTheme(newTheme);
  });
};

const performPageTransition = () => {
  document.documentElement.classList.add("transition");
  window.setTimeout(() => {
    document.documentElement.classList.remove("transition");
  }, 1000);
};
