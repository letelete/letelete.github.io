class Theme {
  static get themeKey() { return "theme_key"; }
  static get lightThemeKey() { return "light"; }
  static get darkThemeKey() { return "dark" }

  constructor() {
    this.currentTheme = Theme.lightThemeKey;
  }

  updatePreferedTheme(theme) {
    localStorage.setItem(this.themeKey, theme);
    this.changeTheme(theme);
  }

  applyPreferedThemeOrDefault() {
    const theme = localStorage.getItem(this.themeKey) || this.lightThemeKey;
    this.changeTheme(theme);
  }

  changeTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    this.currentTheme = theme;
  }
}

export { Theme };
