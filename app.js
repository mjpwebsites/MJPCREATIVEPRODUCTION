document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileMenu = document.querySelector('.mobile-menu');
  const navLinks = document.querySelector('.nav-links');

  mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-links') && !e.target.closest('.mobile-menu')) {
      navLinks.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Updated portfolio items with corrected video URL and handling
  const portfolioItems = [
    { 
      id: 1,
      category: 'beach', 
      type: 'image',
      image: 'https://i.ibb.co/G7YH5CF/Hitube-i-RKt6-F2-Ytj-2025-01-25-13-54-46.jpg',
      title: 'Beautiful Sunset at the Beach',
      description: 'A stunning view of the sun setting over the ocean'
    },
    { 
      id: 2,
      category: 'beach', 
      type: 'image',
      image: 'https://i.ibb.co/vXDS09T/Hitube-zia7-B6-S4nm-2025-01-25-13-36-46.jpg',
      title: 'Calming Ocean Waves',
      description: 'Peaceful waves rolling onto the shore'
    },
    { 
      id: 3,
      category: 'beach', 
      type: 'image',
      image: 'https://i.ibb.co/G3jSSrG/474702378-497604416779116-1102076383150094893-n.jpg',
      title: 'Welcome 2025',
      description: 'A Picture Of MJP Sitting On The Tree.'
    },
    { 
      id: 4,
      category: 'beach', 
      type: 'image',
      image: 'https://i.ibb.co/BwrdZ0t/Hitube-GAa6-Xj-DQfv-2025-01-25-14-07-19.jpg',
      title: 'MJP With Hes Dad.',
      description: 'in The Beach My Dad Decided To Picture With Me.'
    },
    { 
      id: 5,
      category: 'bday', 
      type: 'image',
      image: 'https://i.ibb.co/g4Zz7S0/473785351-1261833884894878-9190213595406354699-n.jpg',
      title: "A Family Picture",
      description: 'A Picture Of All The Familys.'
    },
    { 
      id: 6,
      category: 'bday', 
      type: 'image',
      image: 'https://i.ibb.co/s2yhSgC/474327758-1309269570412239-7511186489870293545-n.jpg',
      title: 'A Picture Of All Bunso.',
      description: 'This Picture Is All Of the bunso With Nanay.'
    },
    { 
      id: 7,
      category: 'videos',
      type: 'video',
      thumbnail: 'https://i.ibb.co/hM1TVZ1/Screenshot-2025-01-26-08-08-36-76-40deb401b9ffe8e1df2f1cc5ba480b12.jpg',
      video: 'https://media-hosting.imagekit.io//97c288eac6c644ec/1000001350.mp4?Expires=1832452642&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=umwxxT1eUOQGgVL7OUvbQMYp4j37VTm5yOoOiIiN2VKk03T75cqbWPRn4tmes0gHGpe1F520TH0n-PM7ZsRLoSAvzn5IHZtgGJTlHKn0L~1ELnwK1fvZTA~y~XFx4DuPOKRgySxghGYw2ut6FdPdgfghl~BYtLspYbuLBlwa3rEjWtczvIX5v6-MPLbHfYYu1Ib2OFMnCzDAeix9NRkIZBMGdkRtxehlEcyf6KpH8dZit2F-TC4Ss3Q0o6TPisRfZ6jib0pXwQ5UfHzBo8L4oxI3AV-1pwdddtTUM47V0XeMuLTaH7L2pmmQe3sHi6PJuSNSuHPN24xSm04ic00oBg__',
      title: 'Nanay Birthday Video',
      duration: '6:58',
      description: 'Special moments from Nanay\'s birthday celebration'
    }
  ];

  // Improved gallery functionality
  const gallery = document.getElementById('gallery');
  const filterButtons = document.querySelectorAll('.filter-buttons button');
  let currentFilter = 'all';

  function createGalleryItem(item) {
    const div = document.createElement('div');
    div.className = 'gallery-item';
    
    if (item.type === 'video') {
      div.innerHTML = `
        <div class="video-container">
          <img class="video-thumbnail" src="${item.thumbnail}" alt="${item.title}" loading="lazy">
          <div class="video-overlay">
            <h3 class="video-title">${item.title}</h3>
            <span class="video-duration">${item.duration}</span>
          </div>
          <div class="play-button">
            <i class="fas fa-play"></i>
          </div>
        </div>
      `;
    } else {
      div.innerHTML = `
        <div class="image-container">
          <img src="${item.image}" alt="${item.title}" loading="lazy">
          <div class="image-overlay">
            <h3 class="image-title">${item.title}</h3>
            <p class="image-description">${item.description}</p>
          </div>
        </div>
      `;
    }

    return div;
  }

  function handleGalleryClick(item, element) {
    if (item.type === 'video') {
      const lightbox = document.querySelector('.lightbox');
      const lightboxContent = lightbox.querySelector('.lightbox-content');
      
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';

      // Create and set up video element
      const video = document.createElement('video');
      video.controls = true;
      video.autoplay = true;
      video.style.maxWidth = '100%';
      video.style.maxHeight = '80vh';
      video.src = item.video;

      lightboxContent.innerHTML = '';
      lightboxContent.appendChild(video);
    } else {
      showInLightbox(item);
    }
  }

  function updateGallery() {
    gallery.innerHTML = '';
    const items = currentFilter === 'all' 
      ? portfolioItems 
      : portfolioItems.filter(item => item.category === currentFilter);

    items.forEach((item, index) => {
      const element = createGalleryItem(item);
      
      element.addEventListener('click', () => handleGalleryClick(item, element));

      // Add animation
      setTimeout(() => {
        element.classList.add('visible');
      }, index * 100);

      gallery.appendChild(element);
    });
  }

  // Filter functionality
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      currentFilter = button.dataset.filter;
      updateGallery();
    });
  });

  // Initial gallery population
  updateGallery();

  // Lightbox functionality
  let currentImageIndex = 0;

  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = `
    <button class="lightbox-close" aria-label="Close">&times;</button>
    <button class="lightbox-nav lightbox-prev" aria-label="Previous">&#10094;</button>
    <button class="lightbox-nav lightbox-next" aria-label="Next">&#10095;</button>
    <div class="lightbox-content">
    </div>
  `;
  document.body.appendChild(lightbox);

  const lightboxContent = lightbox.querySelector('.lightbox-content');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');

  function closeLightbox() {
    const videoElement = lightboxContent.querySelector('video');
    if (videoElement) {
      videoElement.pause();
      videoElement.src = '';
    }
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  async function loadMediaInLightbox(item) {
    lightboxContent.innerHTML = '';
    
    if (item.type === 'video') {
      const video = document.createElement('video');
      video.controls = true;
      video.autoplay = true;
      
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      
      if (!isMobile) {
        video.style.width = '100%';
        video.style.height = '100vh';
        video.style.objectFit = 'contain';
        lightboxContent.style.width = '100vw';
        lightboxContent.style.height = '100vh';
        lightboxContent.style.margin = '0';
        lightboxContent.style.padding = '0';
        
        // Add custom video controls wrapper
        const controlsWrapper = document.createElement('div');
        controlsWrapper.className = 'video-controls-wrapper';
        controlsWrapper.innerHTML = `
          <button class="fullscreen-btn">
            <i class="fas fa-expand"></i>
          </button>
        `;
        
        lightboxContent.appendChild(video);
        lightboxContent.appendChild(controlsWrapper);
        
        const fullscreenBtn = controlsWrapper.querySelector('.fullscreen-btn');
        fullscreenBtn.addEventListener('click', () => {
          if (video.requestFullscreen) {
            video.requestFullscreen();
          } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen();
          } else if (video.msRequestFullscreen) {
            video.msRequestFullscreen();
          }
        });
      } else {
        video.style.maxWidth = '100%';
        video.style.maxHeight = '80vh';
        lightboxContent.style.width = '90%';
        lightboxContent.style.height = 'auto';
        lightboxContent.style.margin = 'auto';
        lightboxContent.appendChild(video);
      }
      
      video.src = item.video;
    } else {
      const img = new Image();
      img.src = item.image;
      img.alt = item.title;
      lightboxContent.appendChild(img);
    }
  }

  function nextImage() {
    const visibleItems = portfolioItems.filter(item => {
      return currentFilter === 'all' || item.category === currentFilter;
    });
    
    currentImageIndex = (currentImageIndex + 1) % visibleItems.length;
    const nextItem = visibleItems[currentImageIndex];
    loadMediaInLightbox(nextItem);
  }

  function prevImage() {
    const visibleItems = portfolioItems.filter(item => {
      return currentFilter === 'all' || item.category === currentFilter;
    });
    
    currentImageIndex = (currentImageIndex - 1 + visibleItems.length) % visibleItems.length;
    const prevItem = visibleItems[currentImageIndex];
    loadMediaInLightbox(prevItem);
  }

  function showInLightbox(item) {
    const visibleItems = portfolioItems.filter(item => {
      return currentFilter === 'all' || item.category === currentFilter;
    });
    currentImageIndex = visibleItems.findIndex(i => i.id === item.id);
    
    loadMediaInLightbox(item);
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // Event listeners for lightbox
  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    prevImage();
  });
  nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    nextImage();
  });

  lightbox.addEventListener('click', closeLightbox);
  lightboxContent.addEventListener('click', (e) => e.stopPropagation());

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  });

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      // Close mobile menu if open
      navLinks.classList.remove('active');
    });
  });

  // Animate services cards
  const animateServices = () => {
    const services = document.querySelectorAll('.service-card');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, index * 100);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    services.forEach(service => observer.observe(service));
  };

  animateServices();

  // Enhanced scroll behavior
  let lastScroll = 0;
  const nav = document.querySelector('nav');

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
      nav.style.transform = 'translateY(-100%)';
    } else {
      nav.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
  });

  // Add smooth scroll reveal for sections
  const revealSections = () => {
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, {
      threshold: 0.1
    });

    sections.forEach(section => {
      section.style.opacity = 0;
      section.style.transform = 'translateY(50px)';
      section.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
      observer.observe(section);
    });
  };

  // Add parallax effect to hero section
  const parallaxHero = () => {
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    });
  };

  revealSections();
  parallaxHero();

  // Add smooth loading for images
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.style.opacity = 0;
    img.style.transition = 'opacity 0.5s ease-in-out';
    img.addEventListener('load', () => {
      img.style.opacity = 1;
    });
  });
});