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
  
  // Gambit-style reveal - dramatic scale and fade
  gsap.utils.toArray('[data-aos="gambit-reveal"]').forEach((elem) => {
    const element = elem as HTMLElement;
    const delay = parseInt(element.dataset.aosDelay || '0');
    
    gsap.from(element, {
      scrollTrigger: {
        trigger: element,
        start: 'top 90%',
        end: 'top 40%',
        toggleActions: 'play none none reverse',
        scrub: 0.5,
      },
      scale: 0.8,
      opacity: 0,
      duration: 1.2,
      delay: delay / 1000,
      ease: 'power4.out',
    });
  });
  
  // Slide in from left (for text blocks)
  gsap.utils.toArray('[data-aos="slide-left"]').forEach((elem) => {
    const element = elem as HTMLElement;
    
    gsap.from(element, {
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      x: -100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    });
  });
  
  // Slide in from right (for images)
  gsap.utils.toArray('[data-aos="slide-right"]').forEach((elem) => {
    const element = elem as HTMLElement;
    
    gsap.from(element, {
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      x: 100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    });
  });
  
  // Parallax effect for large images
  gsap.utils.toArray('[data-aos="parallax"]').forEach((elem) => {
    const element = elem as HTMLElement;
    
    gsap.to(element, {
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
      y: -100,
      ease: 'none',
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
