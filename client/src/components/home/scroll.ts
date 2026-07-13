export function scrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId);
  if (element) {
    const offset = 80; // Account for fixed header
    const elementPosition = element.offsetTop - offset;
    window.scrollTo({
      top: elementPosition,
      behavior: "smooth",
    });
  }
}
