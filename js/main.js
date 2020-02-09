import { Theme } from "./theme.js";

const theme = new Theme();

window.onload = function() {
  fadeInDocumentBody();
  theme.applyPreferedThemeOrDefault();
  updateThemeOnCheckboxChange();
  waveHelloHandOnClick();
};

const fadeInDocumentBody = () => (document.body.style.opacity = "1");

const updateThemeOnCheckboxChange = () => {
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

const waveHelloHandOnClick = () => {
  document
    .getElementsByClassName("hello-hand")[0]
    .addEventListener("click", async function() {
      const animationTrigger = "animate";
      if (this.className.includes(animationTrigger)) {
        return null;
      }
      const originClassName = this.className;
      this.className = `${originClassName} ${animationTrigger}`;
      await new Promise(r => setTimeout(r, 1000));
      this.className = originClassName;
    });
};
