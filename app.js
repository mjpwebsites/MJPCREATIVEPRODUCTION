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
    { category: 'wedding', image: 'https://ibb.co/M5L00JK' },
    { category: 'portrait', image: 'https://ibb.co/6X0gZHK' },
    { category: 'commercial', image: 'https://source.unsplash.com/random/400x300/?commercial' },
    { category: 'wedding', image: 'https://cdn.discordapp.com/attachments/1184537320569966594/1331473889338986538/facebook_1737518464090_7287680644009942888.jpg?ex=6791bf30&is=67906db0&hm=cd109b9947f124e3d21b0c7895a6d19746062733820a45d5886a02a3f71eb969&' },
    { category: 'portrait', image: 'https://ibb.co/TkmZXw1' },
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
