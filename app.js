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

  // Portfolio Gallery
  const gallery = document.getElementById('gallery');
  const filterButtons = document.querySelectorAll('.filter-buttons button');

  // Sample portfolio items
  const portfolioItems = [
    { category: 'wedding', image: 'https://i.ibb.co/G3jSSrG/474702378-497604416779116-1102076383150094893-n.jpg' },
    { category: 'portrait', image: 'https://i.ibb.co/g4Zz7S0/473785351-1261833884894878-9190213595406354699-n.jpg' },
    { category: 'commercial', image: 'https://source.unsplash.com/random/400x300/?commercial' },
    { category: 'wedding', image: 'https://i.ibb.co/vXDS09T/Hitube-zia7-B6-S4nm-2025-01-25-13-36-46.jpg' },
    { category: 'portrait', image: 'https://i.ibb.co/s2yhSgC/474327758-1309269570412239-7511186489870293545-n.jpg' },
    { category: 'commercial', image: 'https://source.unsplash.com/random/400x300/?business' }
  ];

  // Populate gallery
  function populateGallery(items) {
    gallery.innerHTML = '';
    items.forEach(item => {
      const div = document.createElement('div');
      div.className = 'gallery-item';
      div.innerHTML = `<img src="${item.image}" alt="${item.category}" loading="lazy">`;
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
