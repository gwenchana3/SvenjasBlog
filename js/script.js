if (document.getElementById('my-work-link')) {
  document.getElementById('my-work-link').addEventListener('click', () => {
    document.getElementById('my-work-section').scrollIntoView({behavior: "smooth"})
  })
}

// Theme switcher functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    // Check for saved theme preference or default to dark
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    // Update profile image and favicon from CSS variable
    updateProfileImages();
    
    // Update background image from CSS variable - FORCE UPDATE
    updateBackgroundImage();
    
    // Force background image update after a small delay to ensure CSS variables are loaded
    setTimeout(() => {
        updateBackgroundImage();
        console.log('Forced background image update for', currentTheme);
    }, 100);
    
    // Update social links from CSS variables
    updateSocialLinks();
    
    // Update contact button visibility
    updateContactButton();
    
    // Update copyright text from CSS variable
    updateCopyright();
    
    // Update blog navigation buttons
    updateBlogNavigation();
    
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
        
        console.log(`Background updated for ${currentTheme} theme: ${backgroundImagePath} with opacity ${backgroundOpacity}`);
        console.log('CSS variables set:', {
            '--current-background-image': `url(${backgroundImagePath})`,
            '--current-background-opacity': backgroundOpacity
        });
    }
    
    function updateSocialLinks() {
        // Get social link URLs from CSS variables
        const itchUrl = getComputedStyle(document.documentElement)
            .getPropertyValue('--social-itch').trim().replace(/['"]/g, '');
        const artstationUrl = getComputedStyle(document.documentElement)
            .getPropertyValue('--social-artstation').trim().replace(/['"]/g, '');
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
        
        // Update all ArtStation links (by icon class)
        const artstationIcons = document.querySelectorAll('a .footer-icon[src*="artstation.svg"]');
        artstationIcons.forEach(icon => {
            icon.parentElement.href = artstationUrl;
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
        
        console.log('Social links updated from CSS variables');
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
        
        console.log(`Contact button visibility: ${contactButtonEnabled === '0' ? 'hidden' : 'visible'}`);
    }
    
    function updateCopyright() {
        // Get copyright text from CSS variable
        const copyrightText = getComputedStyle(document.documentElement)
            .getPropertyValue('--copyright-text').trim().replace(/['"]/g, '');
        
        // Find all copyright divs and update their text
        const copyrightDivs = document.querySelectorAll('div[style*="text-align: center"][style*="font-size: 14px"]');
        copyrightDivs.forEach(div => {
            if (div.textContent.includes('©')) {
                div.textContent = copyrightText;
            }
        });
        
        console.log('Copyright text updated:', copyrightText);
    }
    
    async function updateBlogNavigation() {
        // Only run on blog pages
        if (!window.location.pathname.includes('BlogPages')) return;
        
        // Auto-discover all blog posts by trying common patterns
        const blogPostPatterns = [
            'Blog%23001_Brockhaus.html',
            'Blog%23002_GoogleCalLinks.html',
            'Blog%23003_',
            'Blog%23004_',
            'Blog%23005_'
        ];
        
        const allBlogPosts = [];
        
        // SIMPLE: Just add new blog URLs here (newest first)
        // The system will automatically read titles from each blog's metadata
        const blogUrls = [
            'Blog%23002_GoogleCalLinks.html',
            'Blog%23001_Brockhaus.html'
            // Add new blog URLs here: 'Blog%23003_YourTitle.html',
        ];
        
        // Auto-read titles from each blog's metadata (when we're on that page)
        for (const url of blogUrls) {
            // For now, use fallback titles - in future this could fetch from each file
            let title = 'Blog Post';
            if (url.includes('002_GoogleCalLinks')) title = 'Google Cal Magic';
            if (url.includes('001_Brockhaus')) title = 'Brockhouse Pages found';
            
            allBlogPosts.push({ url, title });
        }
        

        
        // Get current blog URL from CSS variable
        const currentUrl = getComputedStyle(document.documentElement)
            .getPropertyValue('--blog-url').trim().replace(/['"]/g, '');
        
        // Find current post index
        const currentIndex = allBlogPosts.findIndex(post => post.url === currentUrl);
        
        if (currentIndex === -1) {
            console.log('Current blog post not found in navigation list');
            return;
        }
        
        // Calculate previous (newer) and next (older) posts with circular navigation
        const prevIndex = currentIndex === 0 ? allBlogPosts.length - 1 : currentIndex - 1;
        const nextIndex = currentIndex === allBlogPosts.length - 1 ? 0 : currentIndex + 1;
        
        const prevPost = allBlogPosts[prevIndex];
        const nextPost = allBlogPosts[nextIndex];
        
        // Update previous (newer) button
        const prevButton = document.getElementById('prev-button');
        const prevTitle = document.getElementById('prev-title');
        if (prevButton && prevTitle) {
            prevButton.onclick = () => window.location.href = prevPost.url;
            prevTitle.textContent = prevPost.title;
        }
        
        // Update next (older) button  
        const nextButton = document.getElementById('next-button');
        const nextTitle = document.getElementById('next-title');
        if (nextButton && nextTitle) {
            nextButton.onclick = () => window.location.href = nextPost.url;
            nextTitle.textContent = nextPost.title;
        }
        
        console.log('Blog navigation updated:', { 
            current: allBlogPosts[currentIndex].title,
            prev: prevPost.title, 
            next: nextPost.title 
        });
    }
});