document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. WHATSAPP PHONE & BASE UTILITIES
     ========================================================================== */
  const whatsappNumber = '923139271282';

  // Auto Update Copyright Year in Footer
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }


  /* ==========================================================================
     2. MOBILE MENU TOGGLE
     ========================================================================== */
  const menuBtn = document.querySelector('.menu');
  const navMenu = document.querySelector('nav');

  if (menuBtn && navMenu) {
    menuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    // Close mobile menu when a navigation link is clicked
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }


  /* ==========================================================================
     3. HERO SECTION TYPING ANIMATION
     ========================================================================== */
  const typedSpan = document.getElementById('typed');
  if (typedSpan) {
    const subjects = [
      'Quran Reading',
      'Noorani Qaida',
      'Tajweed Rules',
      'Hifz Programme',
      'Quran Translation',
      'Tafseer-e-Quran',
      'Kalmas & Namaz'
    ];
    let subjectIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const delayBetweenWords = 2000;

    function typeEffect() {
      const currentWord = subjects[subjectIndex];
      
      if (isDeleting) {
        typedSpan.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typedSpan.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
      }

      let currentSpeed = isDeleting ? deletingSpeed : typingSpeed;

      if (!isDeleting && charIndex === currentWord.length) {
        currentSpeed = delayBetweenWords;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        subjectIndex = (subjectIndex + 1) % subjects.length;
        currentSpeed = 500;
      }

      setTimeout(typeEffect, currentSpeed);
    }

    typeEffect();
  }


  /* ==========================================================================
     4. FAQ ACCORDION INTERACTIVITY
     ========================================================================== */
  const faqArticles = document.querySelectorAll('.faq .course');

  faqArticles.forEach(item => {
    item.style.cursor = 'pointer';
    const heading = item.querySelector('h3');
    const paragraph = item.querySelector('p');

    if (heading && paragraph) {
      // Add a visual indicator to the FAQ question
      heading.style.display = 'flex';
      heading.style.justifyContent = 'space-between';
      heading.style.alignItems = 'center';
      
      const toggleIcon = document.createElement('span');
      toggleIcon.textContent = '+';
      toggleIcon.style.fontSize = '1.2rem';
      toggleIcon.style.color = '#dfb15b';
      toggleIcon.style.transition = 'transform 0.3s ease';
      heading.appendChild(toggleIcon);

      // Initially collapse paragraph
      paragraph.style.display = 'none';
      paragraph.style.marginTop = '10px';

      item.addEventListener('click', () => {
        const isOpen = paragraph.style.display === 'block';

        // Close all other FAQs
        faqArticles.forEach(otherItem => {
          const otherPara = otherItem.querySelector('p');
          const otherIcon = otherItem.querySelector('h3 span');
          if (otherPara) otherPara.style.display = 'none';
          if (otherIcon) {
            otherIcon.textContent = '+';
            otherIcon.style.transform = 'rotate(0deg)';
          }
        });

        // Toggle current FAQ
        if (!isOpen) {
          paragraph.style.display = 'block';
          toggleIcon.textContent = '-';
          toggleIcon.style.transform = 'rotate(180deg)';
        }
      });
    }
  });


  /* ==========================================================================
     5. DYNAMIC TESTIMONIAL / FEEDBACK SLIDER
     ========================================================================== */
  const track = document.getElementById('track');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  const dotsContainer = document.querySelector('.dots');
  const dots = dotsContainer ? dotsContainer.querySelectorAll('button') : [];

  if (track && prevBtn && nextBtn) {
    const reviews = track.querySelectorAll('.review');
    let currentIndex = 0;
    const totalReviews = reviews.length;

    function updateSlider(index) {
      if (index < 0) {
        currentIndex = totalReviews - 1;
      } else if (index >= totalReviews) {
        currentIndex = 0;
      } else {
        currentIndex = index;
      }

      // Slide track horizontally
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      track.style.transition = 'transform 0.4s ease-in-out';

      // Update active dot
      dots.forEach((dot, idx) => {
        if (idx === currentIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }

    prevBtn.addEventListener('click', () => {
      updateSlider(currentIndex - 1);
    });

    nextBtn.addEventListener('click', () => {
      updateSlider(currentIndex + 1);
    });

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        updateSlider(idx);
      });
    });

    // Auto-advance slider every 6 seconds
    setInterval(() => {
      updateSlider(currentIndex + 1);
    }, 6000);
  }


  /* ==========================================================================
     6. WHATSAPP ENQUIRY FOR COURSE LINKS
     ========================================================================== */
  const courseLinks = document.querySelectorAll('a[data-course]');

  courseLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const courseName = link.getAttribute('data-course');
      if (courseName) {
        e.preventDefault();
        
        // Select the course dropdown in trial form if available
        const courseSelect = document.getElementById('course');
        if (courseSelect) {
          for (let i = 0; i < courseSelect.options.length; i++) {
            if (courseSelect.options[i].text.toLowerCase().includes(courseName.toLowerCase())) {
              courseSelect.selectedIndex = i;
              break;
            }
          }
        }

        // Smooth scroll to trial section
        const trialSection = document.getElementById('trial');
        if (trialSection) {
          trialSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });


  /* ==========================================================================
     7. TRIAL FORM WHATSAPP SUBMISSION
     ========================================================================== */
  const trialForm = document.getElementById('trial-form');

  if (trialForm) {
    trialForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name') ? document.getElementById('name').value.trim() : '';
      const age = document.getElementById('age') ? document.getElementById('age').value.trim() : '';
      const course = document.getElementById('course') ? document.getElementById('course').value.trim() : '';
      const country = document.getElementById('country') ? document.getElementById('country').value.trim() : '';
      const time = document.getElementById('time') ? document.getElementById('time').value.trim() : 'Flexible / As arranged';

      // Format professional WhatsApp message
      const formattedMessage = `Assalam-o-Alaikum! I would like to request a 3-Day Free Trial at The Best Online Islamic Center.

*Student/Parent Name:* ${name}
*Learner's Age:* ${age}
*Selected Course:* ${course}
*Country/Time Zone:* ${country}
*Preferred Schedule:* ${time}`;

      const encodedMessage = encodeURIComponent(formattedMessage);
      const waUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

      // Open WhatsApp in a new tab
      window.open(waUrl, '_blank');
    });
  }


  /* ==========================================================================
     8. BACK TO TOP BUTTON & SCROLL REVEAL
     ========================================================================== */
  const backtopBtn = document.getElementById('backtop');

  window.addEventListener('scroll', () => {
    if (backtopBtn) {
      if (window.scrollY > 400) {
        backtopBtn.style.display = 'block';
        backtopBtn.style.opacity = '1';
      } else {
        backtopBtn.style.opacity = '0';
        setTimeout(() => {
          if (window.scrollY <= 400) backtopBtn.style.display = 'none';
        }, 300);
      }
    }

    // Scroll reveal animation for elements with .reveal class
    const reveals = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;

    reveals.forEach(reveal => {
      const elementTop = reveal.getBoundingClientRect().top;
      const elementVisible = 120;

      if (elementTop < windowHeight - elementVisible) {
        reveal.classList.add('active');
        reveal.style.opacity = '1';
        reveal.style.transform = 'translateY(0)';
      }
    });
  });

  if (backtopBtn) {
    backtopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

});