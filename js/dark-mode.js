const theme_key = "light";
const light_theme = "light";
const dark_theme = "dark";

window.onload = function() {
  function fadeInBody() {
    document.body.style.opacity = "1";
  }

  fadeInBody();

  function saveTheme(theme) {
    localStorage.setItem(theme_key, theme);
  }

  function getTheme() {
    let theme = localStorage.getItem(theme_key);
    return theme == null ? light_theme : theme;
  }

  var theme = getTheme();
  changeTheme(theme);

  var checkbox = document.getElementsByClassName("switch-theme")[0];
  if (checkbox != null) {
    checkbox.checked = theme == dark_theme;
    checkbox.addEventListener("change", function() {
      trans();
      changeTheme(this.checked ? dark_theme : light_theme);
    });
  }

  function changeTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    saveTheme(theme);
  }

  let trans = () => {
    document.documentElement.classList.add("transition");
    window.setTimeout(() => {
      document.documentElement.classList.remove("transition");
    }, 1000);
  };
};
