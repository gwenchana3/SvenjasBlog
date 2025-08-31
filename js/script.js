if (document.getElementById('my-work-link')) {
  document.getElementById('my-work-link').addEventListener('click', () => {
    document.getElementById('my-work-section').scrollIntoView({behavior: "smooth"})
  })
}

// Theme switcher functionality
document.addEventListener('DOMContentLoaded', function() {
    try {
        const themeToggle = document.getElementById('theme-toggle');
        const themeIcon = document.getElementById('theme-icon');
        
        if (!themeToggle || !themeIcon) {
            return;
        }
        
        // Check for saved theme preference or default to dark
        const currentTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', currentTheme);
        updateThemeIcon(currentTheme);
        
        // Update profile image and favicon from CSS variable
        updateProfileImages();
        
        // Update background image from CSS variable
        updateBackgroundImage();
        
        // Update social links from CSS variables
        updateSocialLinks();
        
        // Update contact button visibility
        updateContactButton();
    
        // Theme toggle click handler
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            // Update theme
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Update icon
            updateThemeIcon(newTheme);
            
            // Update background image for new theme
            updateBackgroundImage();
        });
    
    function updateThemeIcon(theme) {
        // Determine the correct path based on current page location
        const isBlogPage = window.location.pathname.includes('BlogPages');
        const iconPath = isBlogPage ? '../assets/icons/' : './assets/icons/';
        
        if (theme === 'light') {
            themeIcon.src = iconPath + 'sun.svg';
            themeIcon.alt = 'Switch to dark theme';
        } else {
            themeIcon.src = iconPath + 'moon.svg';
            themeIcon.alt = 'Switch to light theme';
        }
    }
    
    function updateProfileImages() {
        // Get the profile image path from CSS variable
        const profileImagePath = getComputedStyle(document.documentElement)
            .getPropertyValue('--profile-image-path').trim().replace(/['"]/g, '');
        
        // Update favicon
        const favicon = document.querySelector('link[rel="icon"]');
        if (favicon) {
            favicon.href = profileImagePath;
        }
        
        // Update profile image
        const profileImage = document.querySelector('.portfolio-header-image');
        if (profileImage) {
            profileImage.src = profileImagePath;
        }
    }
    
    function updateBackgroundImage() {
        // Get the current theme
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        
        // Get the appropriate background image path and opacity from CSS variables
        const backgroundImageVar = currentTheme === 'light' ? '--background-image-light' : '--background-image-dark';
        const backgroundOpacityVar = currentTheme === 'light' ? '--background-image-opacity-light' : '--background-image-opacity-dark';
        
        const backgroundImagePath = getComputedStyle(document.documentElement)
            .getPropertyValue(backgroundImageVar).trim().replace(/['"]/g, '');
        const backgroundOpacity = getComputedStyle(document.documentElement)
            .getPropertyValue(backgroundOpacityVar).trim();
        
        // Set the current background image and opacity as CSS custom properties
        document.documentElement.style.setProperty('--current-background-image', `url(${backgroundImagePath})`);
        document.documentElement.style.setProperty('--current-background-opacity', backgroundOpacity);
        
        // Also update body background for better compatibility
        document.body.style.backgroundImage = `url(${backgroundImagePath})`;
        document.body.style.opacity = '1';
        

    }
    
    function updateSocialLinks() {
        // Get social link URLs from CSS variables
        const itchUrl = getComputedStyle(document.documentElement)
            .getPropertyValue('--social-itch').trim().replace(/['"]/g, '');
        const instagramUrl = getComputedStyle(document.documentElement)
            .getPropertyValue('--social-instagram').trim().replace(/['"]/g, '');
        const emailUrl = getComputedStyle(document.documentElement)
            .getPropertyValue('--social-email').trim().replace(/['"]/g, '');
        const linkedinUrl = getComputedStyle(document.documentElement)
            .getPropertyValue('--social-linkedin').trim().replace(/['"]/g, '');
        
        // Update all itch.io links (by icon class)
        const itchIcons = document.querySelectorAll('a .footer-icon[src*="itch.svg"]');
        itchIcons.forEach(icon => {
            icon.parentElement.href = itchUrl;
        });
        
        // Update all Instagram links (by icon class)
        const instagramIcons = document.querySelectorAll('a .footer-icon[src*="instagram.svg"]');
        instagramIcons.forEach(icon => {
            icon.parentElement.href = instagramUrl;
        });
        
        // Update all email links (by icon class)
        const emailIcons = document.querySelectorAll('a .footer-icon[src*="mail.svg"]');
        emailIcons.forEach(icon => {
            icon.parentElement.href = emailUrl;
        });
        
        // Update all LinkedIn links (by icon class)
        const linkedinIcons = document.querySelectorAll('a .footer-icon[src*="linkedin.svg"]');
        linkedinIcons.forEach(icon => {
            icon.parentElement.href = linkedinUrl;
        });
        

    }
    
    function updateContactButton() {
        // Get contact button visibility setting from CSS variable
        const contactButtonEnabled = getComputedStyle(document.documentElement)
            .getPropertyValue('--contact-button-enabled').trim();
        
        // Find the contact button in the navbar
        const contactButton = document.querySelector('.nav-buttons .button[href*="mailto"]');
        
        if (contactButton) {
            if (contactButtonEnabled === '0') {
                contactButton.style.display = 'none';
            } else {
                contactButton.style.display = 'flex';
            }
        }
        

    }
    } catch (error) {
        // Silent fail for production
    }
});