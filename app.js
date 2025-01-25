document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileMenu = document.querySelector('.mobile-menu');
  const navLinks = document.querySelector('.nav-links');

  mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const spans = mobileMenu.getElementsByTagName('span');
    spans[0].classList.toggle('rotate-45');
    spans[1].classList.toggle('opacity-0');
    spans[2].classList.toggle('rotate-negative-45');
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
      <img src="" alt="Lightbox image">
    `;
    document.body.appendChild(lightbox);

    return lightbox;
  }

  const lightbox = createLightbox();
  const lightboxImg = lightbox.querySelector('img');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');

  function showImage(index) {
    currentImageIndex = index;
    lightboxImg.src = galleryImages[index].src;
    lightbox.classList.add('active');
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
  }

  function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    lightboxImg.src = galleryImages[currentImageIndex].src;
  }

  function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    lightboxImg.src = galleryImages[currentImageIndex].src;
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
  lightboxImg.addEventListener('click', (e) => e.stopPropagation());

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

  // Updated portfolio items with one more beach photo
  const portfolioItems = [
    { category: 'wedding', image: 'https://i.ibb.co/G7YH5CF/Hitube-i-RKt6-F2-Ytj-2025-01-25-13-54-46.jpg"' },
    { category: 'wedding', image: 'https://i.ibb.co/vXDS09T/Hitube-zia7-B6-S4nm-2025-01-25-13-36-46.jpg' }, 
    { category: 'wedding', image: 'https://i.ibb.co/G3jSSrG/474702378-497604416779116-1102076383150094893-n.jpg' },
    { category: 'wedding', image: 'https://i.ibb.co/BwrdZ0t/Hitube-GAa6-Xj-DQfv-2025-01-25-14-07-19.jpg' }, 
    { category: 'portrait', image: 'https://i.ibb.co/g4Zz7S0/473785351-1261833884894878-9190213595406354699-n.jpg' },
    { category: 'portrait', image: 'https://i.ibb.co/s2yhSgC/474327758-1309269570412239-7511186489870293545-n.jpg' },
    { category: 'commercial', image: 'https://source.unsplash.com/random/400x300/?business' }
  ];

  // Modified portfolio gallery population
  function populateGallery(items) {
    gallery.innerHTML = '';
    items.forEach((item, index) => {
      const div = document.createElement('div');
      div.className = 'gallery-item';
      div.innerHTML = `<img src="${item.image}" alt="${item.category}" loading="lazy">`;
      
      div.addEventListener('click', () => {
        galleryImages = Array.from(gallery.getElementsByTagName('img'));
        showImage(index);
      });
      
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

  // Animation on scroll
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .gallery-item, .stat');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight;
      
      if(elementPosition < screenPosition) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };

  // Initial animation check
  animateOnScroll();
  
  // Listen for scroll
  window.addEventListener('scroll', animateOnScroll);
});
