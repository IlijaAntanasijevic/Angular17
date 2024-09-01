export class Spinner {
  static show(): void {
    document.querySelector(".preloader-active").classList.remove("none");
  }
  
  static hide(): void {
    document.querySelector(".preloader-active").classList.add("none");
  }
}