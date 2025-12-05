/**
 * Scroll to a specific section on the page
 * @param sectionId - The ID of the section to scroll to
 * @param offset - Optional offset from the top (default: 80px for header)
 */
export const scrollToSection = (sectionId: string, offset: number = 80) => {
    const element = document.getElementById(sectionId);
    if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
};

/**
 * Scroll to top of page smoothly
 */
export const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};
