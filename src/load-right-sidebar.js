// Universal Right Sidebar Loader
// This script loads the right sidebar content into pages that have the right-sidebar container

(function() {
    'use strict';

    // Share to TikTok function (global) - Define early so it's available when content loads
    window.shareToTikTok = function(shareTextEncoded, shareUrlEncoded) {
        const shareText = decodeURIComponent(shareTextEncoded);
        const shareUrl = decodeURIComponent(shareUrlEncoded);
        const shareContent = shareText + ' ' + shareUrl;
        const isEnglish = window.location.pathname.includes('/en/');

        // Priority 1: Try Web Share API first (works on mobile and some desktop browsers like Chrome/Edge)
        // This is the BEST method - one click, opens native share dialog where user can select TikTok/Instagram
        if (navigator.share) {
            navigator.share({
                title: document.title,
                text: shareText,
                url: shareUrl
            }).then(function() {
                // Success - user shared via native dialog
                console.log('Shared successfully via Web Share API');
                showShareSuccessNotification('TikTok', isEnglish);
            }).catch(function(err) {
                // User cancelled (AbortError) - don't show error, just return silently
                if (err.name === 'AbortError') {
                    console.log('User cancelled share');
                    return;
                }
                // Other error - try fallback
                console.error('Error sharing:', err);
                tryDeepLinkShare('tiktok', shareContent, shareUrl, isEnglish);
            });
        } else {
            // Web Share API not available - use fallback
            tryDeepLinkShare('tiktok', shareContent, shareUrl, isEnglish);
        }
    };

    // Share to Instagram function (global) - Define early so it's available when content loads
    window.shareToInstagram = function(shareTextEncoded, shareUrlEncoded) {
        const shareText = decodeURIComponent(shareTextEncoded);
        const shareUrl = decodeURIComponent(shareUrlEncoded);
        const shareContent = shareText + ' ' + shareUrl;
        const isEnglish = window.location.pathname.includes('/en/');

        // Priority 1: Try Web Share API first (works on mobile and some desktop browsers like Chrome/Edge)
        // This is the BEST method - one click, opens native share dialog where user can select Instagram/TikTok
        if (navigator.share) {
            navigator.share({
                title: document.title,
                text: shareText,
                url: shareUrl
            }).then(function() {
                // Success - user shared via native dialog
                console.log('Shared successfully via Web Share API');
                showShareSuccessNotification('Instagram', isEnglish);
            }).catch(function(err) {
                // User cancelled (AbortError) - don't show error, just return silently
                if (err.name === 'AbortError') {
                    console.log('User cancelled share');
                    return;
                }
                // Other error - try fallback
                console.error('Error sharing:', err);
                tryDeepLinkShare('instagram', shareContent, shareUrl, isEnglish);
            });
        } else {
            // Web Share API not available - use fallback
            tryDeepLinkShare('instagram', shareContent, shareUrl, isEnglish);
        }
    };

    // Try deep link share for mobile apps (fallback when Web Share API is not available)
    function tryDeepLinkShare(platform, shareContent, shareUrl, isEnglish) {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        if (isMobile && platform === 'instagram') {
            // Try Instagram deep link to open camera (experimental - may not work on all devices)
            // Note: Instagram doesn't officially support sharing external content via deep link
            try {
                // Try to open Instagram app camera
                const deepLinkUrl = 'instagram://camera';
                window.location.href = deepLinkUrl;

                // Copy to clipboard as fallback (content will be available if deep link fails)
                setTimeout(function() {
                    copyTextToClipboardForShare(shareContent, 'Instagram', isEnglish, true);
                }, 1000);
            } catch (e) {
                // If deep link fails, just copy to clipboard
                copyTextToClipboardForShare(shareContent, 'Instagram', isEnglish, true);
            }
        } else {
            // For TikTok or desktop: Copy to clipboard with instruction
            copyTextToClipboardForShare(shareContent, platform === 'tiktok' ? 'TikTok' : 'Instagram', isEnglish, true);
        }
    }

    // Show share success notification
    function showShareSuccessNotification(platform, isEnglish) {
        const message = isEnglish
            ? `Shared to ${platform} successfully!`
            : `Berhasil dibagikan ke ${platform}!`;

        const notification = document.createElement('div');
        notification.style.cssText = 'position: fixed; top: 20px; right: 20px; background: #10b981; color: white; padding: 16px 24px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); z-index: 10000; font-size: 14px; font-weight: 500;';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(function() {
            notification.style.opacity = '0';
            notification.style.transition = 'opacity 0.3s';
            setTimeout(function() {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 2000);
    }

    // Copy text to clipboard with notification (for share functions)
    function copyTextToClipboardForShare(text, platform, isEnglish, showAppInstruction) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(function() {
                showShareNotification(platform, isEnglish, showAppInstruction);
            }).catch(function(err) {
                console.error('Failed to copy:', err);
                fallbackCopyWithNotification(text, platform, isEnglish, showAppInstruction);
            });
        } else {
            fallbackCopyWithNotification(text, platform, isEnglish, showAppInstruction);
        }
    }

    // Show share notification
    function showShareNotification(platform, isEnglish, showAppInstruction) {
        let message = '';
        if (showAppInstruction) {
            message = isEnglish
                ? `Content copied! Open ${platform} app and paste in your post.`
                : `Konten disalin! Buka aplikasi ${platform} dan tempel di postingan Anda.`;
        } else {
            message = isEnglish
                ? `Content copied! Paste it in ${platform} app.`
                : `Konten disalin! Tempel di aplikasi ${platform}.`;
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.style.cssText = 'position: fixed; top: 20px; right: 20px; background: #10b981; color: white; padding: 16px 24px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); z-index: 10000; font-size: 14px; font-weight: 500; max-width: 300px; line-height: 1.5;';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(function() {
            notification.style.opacity = '0';
            notification.style.transition = 'opacity 0.3s';
            setTimeout(function() {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }

    // Fallback copy with notification
    function fallbackCopyWithNotification(text, platform, isEnglish, showAppInstruction) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            const successful = document.execCommand('copy');
            if (successful) {
                showShareNotification(platform, isEnglish, showAppInstruction);
            } else {
                const message = isEnglish
                    ? `Please copy manually: ${text}`
                    : `Silakan salin manual: ${text}`;
                alert(message);
            }
        } catch (err) {
            const message = isEnglish
                ? `Please copy manually: ${text}`
                : `Silakan salin manual: ${text}`;
            alert(message);
        }
        if (textArea.parentNode) {
            document.body.removeChild(textArea);
        }
    }

    function loadRightSidebar() {
        // Find all right sidebar containers
        const sidebarContainers = document.querySelectorAll('#right-sidebar-content, .right-sidebar-content:empty');

        if (sidebarContainers.length === 0) {
            return; // No sidebar container found
        }

        // Determine the current page URL for dynamic social share links
        const currentUrl = window.location.href;
        const currentTitle = document.title || 'Solusi Teknologi Batam';

        // Get content from page-title-subtitle
        const pageSubtitleEl = document.querySelector('.page-title-subtitle');
        const pageSubtitle = pageSubtitleEl ? pageSubtitleEl.textContent.trim() : currentTitle;

        // Get image from og:image meta tag or page image
        const ogImageEl = document.querySelector('meta[property="og:image"]');
        const pageImage = ogImageEl ? ogImageEl.getAttribute('content') :
                         (document.querySelector('img.service-hero-image img, img.brand-logo')?.src ||
                          'https://faust.co.id/logo-solusi-teknologi-BATAM.png');

        // Check if we're in file:// protocol (local development)
        const isFileProtocol = window.location.protocol === 'file:';

        // If file:// protocol, skip fetch and use inline fallback directly
        if (isFileProtocol) {
            console.log('File protocol detected, using inline sidebar fallback');
            loadInlineSidebar(sidebarContainers, currentUrl, currentTitle, pageSubtitle, pageImage);
            return;
        }

        // Determine if we're in 'id' or 'en' folder
        const isEnglish = window.location.pathname.includes('/en/');
        const lang = isEnglish ? 'en' : 'id';
        const sidebarPath = isEnglish ? '../en/right-sidebar.html' : 'right-sidebar.html';

        // Try to load sidebar content
        fetch(sidebarPath)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Sidebar file not found');
                }
                return response.text();
            })
            .then(html => {
                // Update social share URLs with current page URL, title, and description
                let updatedHtml = html;
                updatedHtml = updatedHtml.replace(/https:\/\/faust\.co\.id\/[^"]*\.html/g, currentUrl);
                updatedHtml = updatedHtml.replace(/Berita Teknologi Terbaru Batam[^"]*/g, currentTitle);

                // Update share text with page subtitle content
                const shareText = encodeURIComponent(pageSubtitle);
                const shareUrl = encodeURIComponent(currentUrl);
                const shareTitle = encodeURIComponent(currentTitle);
                const shareTextEncoded = encodeURIComponent(pageSubtitle);

                // Update Facebook share with quote from page-title-subtitle
                // Replace Facebook share URLs (with or without existing parameters)
                updatedHtml = updatedHtml.replace(/https:\/\/www\.facebook\.com\/sharer\/sharer\.php\?[^"]*/g,
                    `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${shareTextEncoded}`);

                // Update Twitter share with page subtitle
                updatedHtml = updatedHtml.replace(/https:\/\/twitter\.com\/intent\/tweet\?url=[^"]*/g,
                    `https://twitter.com/intent/tweet?url=${shareUrl}&text=${encodeURIComponent(pageSubtitle)}`);

                // Update LinkedIn share with URL and summary
                updatedHtml = updatedHtml.replace(/https:\/\/www\.linkedin\.com\/sharing\/share-offsite\/\?url=[^"]*/g,
                    `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}&summary=${shareTextEncoded}`);

                // Update TikTok share - Replace with onclick function using page subtitle content
                // Note: TikTok doesn't have web share API, so we'll use a custom share function
                updatedHtml = updatedHtml.replace(/href="https:\/\/www\.tiktok\.com\/[^"]*"/g,
                    `href="javascript:void(0)" onclick="shareToTikTok('${shareTextEncoded}', '${shareUrl}'); return false;"`);
                // Also replace any existing onclick handlers
                updatedHtml = updatedHtml.replace(/onclick="shareToTikTok\('[^']*', '[^']*'\)"/g,
                    `onclick="shareToTikTok('${shareTextEncoded}', '${shareUrl}'); return false;"`);

                // Update Instagram share - Replace with onclick function using page subtitle content
                // Note: Instagram doesn't have web share API, so we'll use a custom share function
                updatedHtml = updatedHtml.replace(/href="https:\/\/www\.instagram\.com\/[^"]*"/g,
                    `href="javascript:void(0)" onclick="shareToInstagram('${shareTextEncoded}', '${shareUrl}'); return false;"`);
                // Also replace any existing onclick handlers
                updatedHtml = updatedHtml.replace(/onclick="shareToInstagram\('[^']*', '[^']*'\)"/g,
                    `onclick="shareToInstagram('${shareTextEncoded}', '${shareUrl}'); return false;"`);

                // Update all WhatsApp instances (including WhatsApp Status) with page subtitle
                updatedHtml = updatedHtml.replace(/https:\/\/wa\.me\/\?text=[^"]*/g,
                    `https://wa.me/?text=${shareText}%20${shareUrl}`);

                // Update Email share with page subtitle
                const emailBody = (isEnglish ? 'I want to share information: ' : 'Saya ingin berbagi informasi: ') + pageSubtitle + '\n\n' + currentUrl;
                updatedHtml = updatedHtml.replace(/mailto:\?subject=[^"]*&body=[^"]*/g,
                    `mailto:?subject=${shareTitle}&body=${encodeURIComponent(emailBody)}`);

                // Update Copy Link button - replace all instances
                updatedHtml = updatedHtml.replace(/copyToClipboard\('[^']*'\)/g,
                    `copyToClipboard('${currentUrl}')`);

                // Insert into all containers
                sidebarContainers.forEach(container => {
                    container.innerHTML = updatedHtml;
                });

                // Reorganize layout for mobile
                setTimeout(function() {
                    reorganizeMobileLayout();
                }, 150);

                // Initialize hover effects after content is loaded
                setTimeout(function() {
                    const shareButtons = document.querySelectorAll('.social-share-btn-sidebar');
                    shareButtons.forEach(function(btn) {
                        btn.addEventListener('mouseenter', function() {
                            this.style.transform = 'translateY(-2px)';
                            this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                        });
                        btn.addEventListener('mouseleave', function() {
                            this.style.transform = 'translateY(0)';
                            this.style.boxShadow = 'none';
                        });
                    });
                }, 100);
            })
            .catch(error => {
                // Only log warning if not file:// protocol (file:// errors are expected)
                if (window.location.protocol !== 'file:') {
                    console.warn('Could not load sidebar from file, using inline fallback:', error);
                }
                // Fallback: use inline content if file not found
                loadInlineSidebar(sidebarContainers, currentUrl, currentTitle, pageSubtitle, pageImage);
            });
    }

    function loadInlineSidebar(containers, currentUrl, currentTitle, pageSubtitle, pageImage) {
        const isEnglish = window.location.pathname.includes('/en/');
        const contactTitle = isEnglish ? 'Quick Contact' : 'Kontak Cepat';
        const shareTitle = isEnglish ? 'Share With Friends & Business Partners' : 'Bagikan Ke Teman & Rekan Bisnis Anda';
        const shareDesc = isEnglish ? 'Help your friends find the best technology solutions!' : 'Bantu teman Anda menemukan solusi teknologi terbaik!';
        const shareFb = isEnglish ? 'Share on Facebook' : 'Share di Facebook';
        const shareTw = isEnglish ? 'Share on Twitter' : 'Share di Twitter';
        const shareLi = isEnglish ? 'Share on LinkedIn' : 'Share di LinkedIn';
        const shareWa = isEnglish ? 'Share via WhatsApp' : 'Share via WhatsApp';
        const shareEmail = isEnglish ? 'Share via Email' : 'Share via Email';
        const shareTikTok = isEnglish ? 'Share to TikTok' : 'Share ke TikTok';
        const shareIg = isEnglish ? 'Share to Instagram' : 'Share ke Instagram';
        const shareWaStatus = isEnglish ? 'WhatsApp Status' : 'WhatsApp Status';
        const shareGoogle = isEnglish ? 'Google Business' : 'Google Business';
        const copyLink = isEnglish ? 'Copy Link' : 'Copy Link';

        // Use page subtitle content for sharing
        const shareText = pageSubtitle || currentTitle;
        const shareUrl = encodeURIComponent(currentUrl);
        const shareTitleEncoded = encodeURIComponent(currentTitle);
        const shareTextEncoded = encodeURIComponent(shareText);

        const sidebarHTML = `
<div class="right-sidebar-content">
<!-- Quick Contact -->
<div class="right-sidebar-section">
<h3>${contactTitle}</h3>
<div class="contact-info-sidebar">
<div class="contact-item-sidebar">
<i class="fas fa-phone"></i>
<div>
<h4>${isEnglish ? 'Phone' : 'Telepon'}</h4>
<p><span><a href="https://wa.me/628111262260" target="_blank" rel="noopener">08111262260</a></span></p>
</div>
</div>
<div class="contact-item-sidebar">
<i class="fab fa-whatsapp"></i>
<div>
<h4>WhatsApp</h4>
<p><a href="https://wa.me/6281363783738" target="_blank" rel="noopener">081363783738</a></p>
</div>
</div>
<div class="contact-item-sidebar">
<i class="fas fa-envelope"></i>
<div>
<h4>Email</h4>
<p><a href="mailto:putra@faust.co.id">putra@faust.co.id</a></p>
</div>
</div>
</div>
</div>
<!-- Social Share -->
<div class="right-sidebar-section">
<h3>${shareTitle}</h3>
<p style="color: #64748b; font-size: 0.9rem; margin-bottom: 20px;">${shareDesc}</p>
<div class="social-share-buttons-sidebar">
<a href="https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${shareTextEncoded}" target="_blank" rel="noopener" class="social-share-btn-sidebar" style="display: flex; align-items: center; gap: 8px; padding: 10px 16px; background: #1877f2; color: #ffffff; border-radius: 8px; text-decoration: none; font-weight: 500; font-size: 0.9rem; margin-bottom: 10px; transition: all 0.3s ease;">
<i class="fab fa-facebook-f"></i>
<span>${shareFb}</span>
</a>
<a href="https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTextEncoded}" target="_blank" rel="noopener" class="social-share-btn-sidebar" style="display: flex; align-items: center; gap: 8px; padding: 10px 16px; background: #1da1f2; color: #ffffff; border-radius: 8px; text-decoration: none; font-weight: 500; font-size: 0.9rem; margin-bottom: 10px; transition: all 0.3s ease;">
<i class="fab fa-twitter"></i>
<span>${shareTw}</span>
</a>
<a href="https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}&summary=${shareTextEncoded}" target="_blank" rel="noopener" class="social-share-btn-sidebar" style="display: flex; align-items: center; gap: 8px; padding: 10px 16px; background: #0077b5; color: #ffffff; border-radius: 8px; text-decoration: none; font-weight: 500; font-size: 0.9rem; margin-bottom: 10px; transition: all 0.3s ease;">
<i class="fab fa-linkedin-in"></i>
<span>${shareLi}</span>
</a>
<a href="https://wa.me/?text=${shareTextEncoded}%20${shareUrl}" target="_blank" rel="noopener" class="social-share-btn-sidebar" style="display: flex; align-items: center; gap: 8px; padding: 10px 16px; background: #25d366; color: #ffffff; border-radius: 8px; text-decoration: none; font-weight: 500; font-size: 0.9rem; margin-bottom: 10px; transition: all 0.3s ease;">
<i class="fab fa-whatsapp"></i>
<span>${shareWa}</span>
</a>
<a href="mailto:?subject=${shareTitleEncoded}&body=${encodeURIComponent((isEnglish ? 'I want to share information: ' : 'Saya ingin berbagi informasi: ') + shareText + '\\n\\n' + currentUrl)}" class="social-share-btn-sidebar" style="display: flex; align-items: center; gap: 8px; padding: 10px 16px; background: #ea4335; color: #ffffff; border-radius: 8px; text-decoration: none; font-weight: 500; font-size: 0.9rem; margin-bottom: 10px; transition: all 0.3s ease;">
<i class="fas fa-envelope"></i>
<span>${shareEmail}</span>
</a>
<a href="javascript:void(0)" onclick="shareToTikTok('${shareTextEncoded}', '${shareUrl}'); return false;" class="social-share-btn-sidebar" style="display: flex; align-items: center; gap: 8px; padding: 10px 16px; background: #000000; color: #ffffff; border-radius: 8px; text-decoration: none; font-weight: 500; font-size: 0.9rem; margin-bottom: 10px; transition: all 0.3s ease; cursor: pointer;">
<i class="fab fa-tiktok"></i>
<span>${shareTikTok}</span>
</a>
<a href="javascript:void(0)" onclick="shareToInstagram('${shareTextEncoded}', '${shareUrl}'); return false;" class="social-share-btn-sidebar" style="display: flex; align-items: center; gap: 8px; padding: 10px 16px; background: linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%); color: #ffffff; border-radius: 8px; text-decoration: none; font-weight: 500; font-size: 0.9rem; margin-bottom: 10px; transition: all 0.3s ease; cursor: pointer;">
<i class="fab fa-instagram"></i>
<span>${shareIg}</span>
</a>
<a href="https://wa.me/?text=${shareTextEncoded}%20${shareUrl}" target="_blank" rel="noopener" class="social-share-btn-sidebar" style="display: flex; align-items: center; gap: 8px; padding: 10px 16px; background: #25d366; color: #ffffff; border-radius: 8px; text-decoration: none; font-weight: 500; font-size: 0.9rem; margin-bottom: 10px; transition: all 0.3s ease;">
<i class="fab fa-whatsapp"></i>
<span>${shareWaStatus}</span>
</a>
<a href="https://www.google.com/maps/place/?q=Solusi+Teknologi+Batam" target="_blank" rel="noopener" class="social-share-btn-sidebar" style="display: flex; align-items: center; gap: 8px; padding: 10px 16px; background: #4285f4; color: #ffffff; border-radius: 8px; text-decoration: none; font-weight: 500; font-size: 0.9rem; margin-bottom: 10px; transition: all 0.3s ease;">
<i class="fab fa-google"></i>
<span>${shareGoogle}</span>
</a>
<button onclick="copyToClipboard('${currentUrl}')" class="social-share-btn-sidebar" style="display: flex; align-items: center; gap: 8px; padding: 10px 16px; background: #64748b; color: #ffffff; border: none; border-radius: 8px; text-decoration: none; font-weight: 500; font-size: 0.9rem; margin-bottom: 10px; transition: all 0.3s ease; cursor: pointer; width: 100%;">
<i class="fas fa-link"></i>
<span>${copyLink}</span>
</button>
</div>
</div>
</div>`;

        containers.forEach(container => {
            container.innerHTML = sidebarHTML;
        });

        // Reorganize layout for mobile
        setTimeout(function() {
            reorganizeMobileLayout();
        }, 150);

        // Initialize hover effects
        setTimeout(function() {
            const shareButtons = document.querySelectorAll('.social-share-btn-sidebar');
            shareButtons.forEach(function(btn) {
                btn.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-2px)';
                    this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                });
                btn.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0)';
                    this.style.boxShadow = 'none';
                });
            });
        }, 100);
    }

    // Function to reorganize layout for mobile
    function reorganizeMobileLayout() {
        const isMobile = window.innerWidth <= 768;

        // Find all containers that have right-sidebar
        const containers = document.querySelectorAll('.container');

        // Handle Quick Contact separately (doesn't need container with ul)
        const rightSidebars = document.querySelectorAll('.right-sidebar');
        rightSidebars.forEach(function(rightSidebar) {
            const rightSidebarContent = rightSidebar.querySelector('.right-sidebar-content');
            if (!rightSidebarContent) return;

            const quickContactSection = rightSidebarContent.querySelector('.right-sidebar-section:first-child');
            const socialShareSection = rightSidebarContent.querySelector('.right-sidebar-section:last-child');
            const hasSocialShare = socialShareSection && socialShareSection.querySelector('.social-share-buttons-sidebar');

            if (isMobile) {
                // 1. Move Quick Contact before breadcrumb
                if (quickContactSection && !quickContactSection.classList.contains('quick-contact-moved')) {
                    const pageHeader = document.querySelector('.page-header');
                    const breadcrumb = pageHeader ? pageHeader.querySelector('.breadcrumb') : null;

                    // Remove existing mobile quick contact if any
                    const existingMobileQuickContact = document.querySelector('.quick-contact-mobile');
                    if (existingMobileQuickContact) {
                        existingMobileQuickContact.remove();
                    }

                    if (breadcrumb) {
                        // Clone quick contact section
                        const clonedQuickContact = quickContactSection.cloneNode(true);
                        clonedQuickContact.classList.add('quick-contact-mobile');
                        clonedQuickContact.style.display = 'block';
                        clonedQuickContact.style.marginBottom = '20px';
                        clonedQuickContact.style.padding = '20px';
                        clonedQuickContact.style.background = '#f8f9fa';
                        clonedQuickContact.style.borderRadius = '8px';

                        // Insert before breadcrumb
                        breadcrumb.parentNode.insertBefore(clonedQuickContact, breadcrumb);

                        // Mark as moved and hide original
                        quickContactSection.classList.add('quick-contact-moved');
                        quickContactSection.style.display = 'none';
                    }
                }
            } else {
                // Desktop: Restore Quick Contact
                const mobileQuickContact = document.querySelector('.quick-contact-mobile');
                if (mobileQuickContact) {
                    mobileQuickContact.remove();
                }

                if (quickContactSection && quickContactSection.classList.contains('quick-contact-moved')) {
                    quickContactSection.style.display = 'block';
                    quickContactSection.classList.remove('quick-contact-moved');
                }
            }
        });

        // Handle Social Share - Move after Page Header Content
        rightSidebars.forEach(function(rightSidebar) {
            const rightSidebarContent = rightSidebar.querySelector('.right-sidebar-content');
            if (!rightSidebarContent) return;

            const socialShareSection = rightSidebarContent.querySelector('.right-sidebar-section:last-child');
            const hasSocialShare = socialShareSection && socialShareSection.querySelector('.social-share-buttons-sidebar');

            if (isMobile) {
                // 2. Move Social Share after Page Header Content
                if (hasSocialShare && socialShareSection && !socialShareSection.classList.contains('social-share-moved')) {
                    // Find page header section
                    const pageHeader = document.querySelector('.page-header');
                    if (!pageHeader) return;

                    // Remove existing mobile social share if any
                    const existingMobileSocialShare = document.querySelector('.social-share-mobile');
                    if (existingMobileSocialShare) {
                        existingMobileSocialShare.remove();
                    }

                    // Clone social share section
                    const clonedSocialShare = socialShareSection.cloneNode(true);
                    clonedSocialShare.classList.add('social-share-mobile');
                    clonedSocialShare.style.display = 'block';
                    clonedSocialShare.style.marginTop = '20px';
                    clonedSocialShare.style.marginBottom = '20px';
                    clonedSocialShare.style.padding = '20px';
                    clonedSocialShare.style.background = '#f8f9fa';
                    clonedSocialShare.style.borderRadius = '8px';

                    // Insert after page-header section (after page header content)
                    pageHeader.insertAdjacentElement('afterend', clonedSocialShare);

                    // Mark as moved and hide original
                    socialShareSection.classList.add('social-share-moved');
                    socialShareSection.style.display = 'none';
                }
            } else {
                // Desktop: Restore Social Share
                const mobileSocialShare = document.querySelector('.social-share-mobile');
                if (mobileSocialShare) {
                    mobileSocialShare.remove();
                }

                if (hasSocialShare && socialShareSection && socialShareSection.classList.contains('social-share-moved')) {
                    socialShareSection.style.display = 'block';
                    socialShareSection.classList.remove('social-share-moved');
                }
            }
        });
    }

    // Reorganize on window resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            reorganizeMobileLayout();
        }, 100);
    });

    // Initial reorganize on load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(reorganizeMobileLayout, 300);
        });
    } else {
        setTimeout(reorganizeMobileLayout, 300);
    }


    // Copy to Clipboard function (global)
    window.copyToClipboard = function(text) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(function() {
                const btn = document.querySelector('button[onclick*="copyToClipboard"]');
                if (btn) {
                    const originalText = btn.querySelector('span').textContent;
                    const isEnglish = window.location.pathname.includes('/en/');
                    btn.querySelector('span').textContent = isEnglish ? 'Link Copied!' : 'Link Disalin!';
                    btn.style.background = '#10b981';

                    setTimeout(function() {
                        btn.querySelector('span').textContent = originalText;
                        btn.style.background = '#64748b';
                    }, 2000);
                }
            }).catch(function(err) {
                console.error('Failed to copy:', err);
                fallbackCopy(text);
            });
        } else {
            fallbackCopy(text);
        }
    };

    function fallbackCopy(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            const successful = document.execCommand('copy');
            if (successful) {
                const btn = document.querySelector('button[onclick*="copyToClipboard"]');
                if (btn) {
                    const originalText = btn.querySelector('span').textContent;
                    const isEnglish = window.location.pathname.includes('/en/');
                    btn.querySelector('span').textContent = isEnglish ? 'Link Copied!' : 'Link Disalin!';
                    btn.style.background = '#10b981';

                    setTimeout(function() {
                        btn.querySelector('span').textContent = originalText;
                        btn.style.background = '#64748b';
                    }, 2000);
                }
            } else {
                const isEnglish = window.location.pathname.includes('/en/');
                alert((isEnglish ? 'Failed to copy link. Please copy manually: ' : 'Gagal menyalin link. Silakan salin manual: ') + text);
            }
        } catch (err) {
            const isEnglish = window.location.pathname.includes('/en/');
            alert((isEnglish ? 'Failed to copy link. Please copy manually: ' : 'Gagal menyalin link. Silakan salin manual: ') + text);
        }
        document.body.removeChild(textArea);
    }

    // Load sidebar when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadRightSidebar);
    } else {
        loadRightSidebar();
    }
})();
