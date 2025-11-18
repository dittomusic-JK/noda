import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const initScrollAnimations = () => {
  // Fade up animation
  gsap.utils.toArray('[data-aos="fade-up"]').forEach((elem) => {
    const element = elem as HTMLElement;
    const delay = parseInt(element.dataset.aosDelay || '0');
    
    gsap.from(element, {
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        end: 'top 60%',
        toggleActions: 'play none none reverse',
      },
      y: 60,
      opacity: 0,
      duration: 0.8,
      delay: delay / 1000,
      ease: 'power3.out',
    });
  });
  
  // Counter animation
  gsap.utils.toArray('[data-count-to]').forEach((elem) => {
    const element = elem as HTMLElement;
    const target = parseInt(element.dataset.countTo || '0');
    
    gsap.to(element, {
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        once: true,
      },
      textContent: target,
      duration: 2,
      ease: 'power2.out',
      snap: { textContent: 1 },
      onUpdate: function() {
        const currentElement = this.targets()[0] as HTMLElement;
        currentElement.textContent = Math.ceil(parseFloat(currentElement.textContent || '0')).toString();
      }
    });
  });
  
  // Refresh ScrollTrigger after fonts load
  if (document.fonts) {
    document.fonts.ready.then(() => {
      ScrollTrigger.refresh();
    });
  }
};
