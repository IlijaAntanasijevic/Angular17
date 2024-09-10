import { config } from "./global";

export class ImageUtils {
  static getImagePath(imagePath: string, basePath: string): string {
    let tmp = imagePath.split("\\");
    let lastElement = tmp[tmp.length - 1];


    lastElement = lastElement === "test" ? "b3a4a797-8f6b-4989-9934-6b65f9ac3e2b.jpg" : lastElement;
   
   
   
    return `${config.apiUrl}${basePath}/${lastElement}`;
  }
}