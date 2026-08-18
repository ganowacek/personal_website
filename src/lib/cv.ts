import { siteConfig } from "../data/site";

export function downloadCv() {
  if (!siteConfig.cvAvailable) {
    return;
  }

  const link = document.createElement("a");
  link.href = siteConfig.cv;
  link.download = "George_Nowacek_CV.pdf";
  document.body.appendChild(link);
  link.click();
  link.remove();
}
