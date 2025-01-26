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

  // Lightbox functionality
  let currentImageIndex = 0;
  let galleryImages = [];

  function createLightbox() {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
      <button class="lightbox-close" aria-label="Close">&times;</button>
      <button class="lightbox-nav lightbox-prev" aria-label="Previous">&#10094;</button>
      <button class="lightbox-nav lightbox-next" aria-label="Next">&#10095;</button>
      <div class="lightbox-content">
        <img src="" alt="Lightbox image" style="display: none;">
        <video controls style="display: none;">
          <source src="" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      </div>
    `;
    document.body.appendChild(lightbox);
    return lightbox;
  }

  const lightbox = createLightbox();
  const lightboxContent = lightbox.querySelector('.lightbox-content');
  const lightboxImg = lightbox.querySelector('img');
  const lightboxVideo = lightbox.querySelector('video');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');

  function showImage(index) {
    currentImageIndex = index;
    const item = portfolioItems[index];
    
    // Reset displays and clear previous content
    lightboxImg.style.display = 'none';
    lightboxVideo.style.display = 'none';
    lightboxVideo.pause();
    lightboxVideo.querySelector('source').src = '';
    
    if (item.type === 'video') {
      const spinner = document.createElement('div');
      spinner.className = 'loading-spinner';
      lightboxContent.appendChild(spinner);
      
      lightboxVideo.querySelector('source').src = item.video;
      lightboxVideo.style.display = 'block';
      lightboxVideo.load();
      
      lightboxVideo.addEventListener('canplay', () => {
        spinner.remove();
        lightboxVideo.play().catch(e => console.log("Auto-play prevented:", e));
      }, { once: true });
    } else {
      lightboxImg.src = item.image;
      lightboxImg.style.display = 'block';
    }
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    lightboxVideo.pause();
    lightboxVideo.querySelector('source').src = '';
    lightboxVideo.load();
    document.body.style.overflow = '';
  }

  function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % portfolioItems.length;
    showImage(currentImageIndex);
  }

  function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + portfolioItems.length) % portfolioItems.length;
    showImage(currentImageIndex);
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

  // Portfolio Gallery
  const gallery = document.getElementById('gallery');
  const filterButtons = document.querySelectorAll('.filter-buttons button');

  // Updated portfolio items with corrected video handling
  const portfolioItems = [
    { category: 'beach', type: 'image', image: 'https://i.ibb.co/G7YH5CF/Hitube-i-RKt6-F2-Ytj-2025-01-25-13-54-46.jpg' },
    { category: 'beach', type: 'image', image: 'https://i.ibb.co/vXDS09T/Hitube-zia7-B6-S4nm-2025-01-25-13-36-46.jpg' }, 
    { category: 'beach', type: 'image', image: 'https://i.ibb.co/G3jSSrG/474702378-497604416779116-1102076383150094893-n.jpg' },
    { category: 'beach', type: 'image', image: 'https://i.ibb.co/BwrdZ0t/Hitube-GAa6-Xj-DQfv-2025-01-25-14-07-19.jpg' }, 
    { category: 'bday', type: 'image', image: 'https://i.ibb.co/g4Zz7S0/473785351-1261833884894878-9190213595406354699-n.jpg' },
    { category: 'bday', type: 'image', image: 'https://i.ibb.co/s2yhSgC/474327758-1309269570412239-7511186489870293545-n.jpg' },
    { 
      category: 'videos',
      type: 'video',
      thumbnail: 'https://i.ibb.co/hM1TVZ1/Screenshot-2025-01-26-08-08-36-76-40deb401b9ffe8e1df2f1cc5ba480b12.jpg',
      video: 'https://media-hosting.imagekit.io//97c288eac6c644ec/1000001350.mp4?Expires=1832452642&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=umwxxT1eUOQGgVL7OUvbQMYp4j37VTm5yOoOiIiN2VKk03T75cqbWPRn4tmes0gHGpe1F520TH0n-PM7ZsRLoSAvzn5IHZtgGJTlHKn0L~1ELnwK1fvZTA~y~XFx4DuPOKRgySxghGYw2ut6FdPdgfghl~BYtLspYbuLBlwa3rEjWtczvIX5v6-MPLbHfYYu1Ib2OFMnCzDAeix9NRkIZBMGdkRtxehlEcyf6KpH8dZit2F-TC4Ss3Q0o6TPisRfZ6jib0pXwQ5UfHzBo8L4oxI3AV-1pwdddtTUM47V0XeMuLTaH7L2pmmQe3sHi6PJuSNSuHPN24xSm04ic00oBg__',
      title: 'Nanay Birtday Video'
    }
  ];

  // Enhanced video handling
  function preloadVideo(url) {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.preload = 'auto';
      video.onloadeddata = () => resolve(video);
      video.onerror = reject;
      video.src = url;
    });
  }

  // Enhanced gallery population
  function populateGallery(items) {
    gallery.innerHTML = '';
    items.forEach((item, index) => {
      const div = document.createElement('div');
      div.className = 'gallery-item';
      
      if (item.type === 'video') {
        div.innerHTML = `
          <div class="video-thumbnail" style="background: url('${item.thumbnail}')">
            <div class="play-button">
              <i class="fas fa-play"></i>
            </div>
            <div class="loading-spinner" style="display: none;"></div>
            <h3 style="position: absolute; bottom: 20px; left: 20px; color: white; font-size: 1.2rem; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">
              ${item.title}
            </h3>
          </div>
        `;
        
        // Preload video on hover
        div.addEventListener('mouseenter', () => {
          preloadVideo(item.video).catch(console.error);
        });
      } else {
        div.innerHTML = `
          <img src="${item.image}" alt="${item.category}" loading="lazy">
        `;
      }
      
      div.addEventListener('click', () => {
        if (item.type === 'video') {
          const spinner = div.querySelector('.loading-spinner');
          spinner.style.display = 'block';
          
          preloadVideo(item.video)
            .then(() => {
              spinner.style.display = 'none';
              showImage(index);
            })
            .catch(error => {
              console.error('Error loading video:', error);
              spinner.style.display = 'none';
            });
        } else {
          showImage(index);
        }
      });
      
      // Enhanced animation on scroll
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              div.classList.add('visible');
              div.style.transform = 'translateY(0)';
              div.style.opacity = '1';
            }, index * 150);
            observer.unobserve(entry.target);
          }
        });
      }, { 
        threshold: 0.2,
        rootMargin: '50px'
      });
      
      observer.observe(div);
      gallery.appendChild(div);
    });
  }

  // Initial population
  populateGallery(portfolioItems);

  // Filter functionality
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filteredItems = filter === 'all' 
        ? portfolioItems 
        : portfolioItems.filter(item => item.category === filter);
      
      populateGallery(filteredItems);
    });
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
});
