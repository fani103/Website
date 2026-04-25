// loader.js - Page transition loader with custom icon
function showPageLoader(nextPage, delay = 300) {
    // Remove existing loader if any
    const oldLoader = document.getElementById("pageLoaderOverlay");
    if (oldLoader) oldLoader.remove();
    
    // Create loader overlay
    const overlay = document.createElement("div");
    overlay.id = "pageLoaderOverlay";
    overlay.innerHTML = `
        <div class="ft-loader-container">
            <div class="ft-loader-icon">
                <img src="images/icon.png" alt="Loading..." class="ft-loader-img" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🚌</text></svg>'">
            </div>
            <div class="ft-loader-text">Loading your journey...</div>
            <div class="ft-loader-subtext">Please wait</div>
        </div>
    `;
    
    // Add styles if not already present
    if (!document.getElementById("ftLoaderStyle")) {
        const style = document.createElement("style");
        style.id = "ftLoaderStyle";
        style.textContent = `
            #pageLoaderOverlay {
                position: fixed;
                inset: 0;
                background: linear-gradient(135deg, rgba(15, 23, 42, 0.85), rgba(0, 0, 0, 0.75));
                backdrop-filter: blur(8px);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 999999;
                opacity: 0;
                animation: ftFadeIn 0.2s ease forwards;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            }
            
            .ft-loader-container {
                text-align: center;
                animation: ftScaleUp 0.3s ease;
            }
            
            .ft-loader-icon {
                width: 100px;
                height: 100px;
                margin: 0 auto 20px;
                animation: ftBounce 0.8s ease-in-out infinite;
            }
            
            .ft-loader-img {
                width: 100%;
                height: 100%;
                object-fit: contain;
                animation: ftPulse 1s ease-in-out infinite;
            }
            
            .ft-loader-text {
                font-size: 18px;
                font-weight: 800;
                color: #ffffff;
                margin-bottom: 8px;
                text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                letter-spacing: 0.5px;
            }
            
            .ft-loader-subtext {
                font-size: 13px;
                font-weight: 600;
                color: rgba(255, 255, 255, 0.8);
                letter-spacing: 0.3px;
            }
            
            /* Animation for the icon */
            @keyframes ftPulse {
                0% {
                    transform: scale(0.95);
                    opacity: 0.7;
                }
                50% {
                    transform: scale(1.1);
                    opacity: 1;
                }
                100% {
                    transform: scale(0.95);
                    opacity: 0.7;
                }
            }
            
            @keyframes ftBounce {
                0%, 100% {
                    transform: translateY(0);
                }
                50% {
                    transform: translateY(-10px);
                }
            }
            
            @keyframes ftFadeIn {
                from { opacity: 0; visibility: hidden; }
                to { opacity: 1; visibility: visible; }
            }
            
            @keyframes ftScaleUp {
                from {
                    opacity: 0;
                    transform: scale(0.9);
                }
                to {
                    opacity: 1;
                    transform: scale(1);
                }
            }
            
            @keyframes ftFadeOut {
                from { opacity: 1; visibility: visible; }
                to { opacity: 0; visibility: hidden; }
            }
            
            /* Spinner ring around icon (optional) */
            .ft-loader-icon {
                position: relative;
            }
            
            .ft-loader-icon::before {
                content: '';
                position: absolute;
                top: -8px;
                left: -8px;
                right: -8px;
                bottom: -8px;
                border-radius: 50%;
                border: 3px solid rgba(217, 35, 45, 0.3);
                border-top-color: #d9232d;
                animation: ftSpin 1s linear infinite;
            }
            
            @keyframes ftSpin {
                to { transform: rotate(360deg); }
            }
            
            /* Mobile responsive */
            @media (max-width: 640px) {
                .ft-loader-icon {
                    width: 70px;
                    height: 70px;
                }
                .ft-loader-text {
                    font-size: 16px;
                }
                .ft-loader-subtext {
                    font-size: 12px;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
        window.location.href = nextPage;
    }, delay);
}

// Auto-remove loader when page loads
window.addEventListener('load', function() {
    const loader = document.getElementById("pageLoaderOverlay");
    if (loader) {
        loader.style.animation = 'ftFadeOut 0.2s ease forwards';
        setTimeout(() => {
            loader.remove();
            document.body.style.overflow = '';
        }, 200);
    }
});

// Optional: Export for module usage (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { showPageLoader };
}