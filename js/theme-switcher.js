/**
 * THEME SWITCHER - Demo Modus
 * Erlaubt Wechsel zwischen 10 Varianten
 */

const themes = [
    {
        id: 'default',
        name: 'Standard Blau',
        description: 'Clean & Modern',
        cssFile: 'css/style.css'
    },
    {
        id: 'dark',
        name: 'Dark Mode',
        description: 'Dunkles Elegant',
        cssFile: 'css/themes/dark.css'
    },
    {
        id: 'green',
        name: 'Nature Green',
        description: 'Frisch & Organisch',
        cssFile: 'css/themes/green.css'
    },
    {
        id: 'orange',
        name: 'Energie Orange',
        description: 'Dynamisch & Kreativ',
        cssFile: 'css/themes/orange.css'
    },
    {
        id: 'purple',
        name: 'Premium Purple',
        description: 'Luxuriös & Exklusiv',
        cssFile: 'css/themes/purple.css'
    },
    {
        id: 'red',
        name: 'Power Red',
        description: 'Stark & Direkt',
        cssFile: 'css/themes/red.css'
    },
    {
        id: 'teal',
        name: 'Ocean Teal',
        description: 'Beruhigend & Professionell',
        cssFile: 'css/themes/teal.css'
    },
    {
        id: 'warm',
        name: 'Warm Sand',
        description: 'Freundlich & Einladend',
        cssFile: 'css/themes/warm.css'
    },
    {
        id: 'blackgold',
        name: 'Black & Gold',
        description: 'Edel & Zeitlos',
        cssFile: 'css/themes/blackgold.css'
    },
    {
        id: 'minimal',
        name: 'Minimal White',
        description: 'Puristisch & Schlicht',
        cssFile: 'css/themes/minimal.css'
    }
];

function initThemeSwitcher() {
    // Create switcher HTML
    const switcherHTML = `
        <div class="theme-switcher" id="themeSwitcher">
            <button class="theme-switcher__toggle" id="themeToggle" title="Design wechseln">
                🎨
            </button>
            <div class="theme-switcher__panel" id="themePanel">
                <div class="theme-switcher__header">
                    <span>Design wählen</span>
                    <button class="theme-switcher__close" id="themeClose">✕</button>
                </div>
                <div class="theme-switcher__list">
                    ${themes.map((theme, index) => `
                        <button class="theme-switcher__item ${index === 0 ? 'active' : ''}" 
                                data-theme="${theme.id}"
                                data-css="${theme.cssFile}"
                                title="${theme.description}">
                            <span class="theme-switcher__color" style="background: ${getThemeColor(theme.id)}"></span>
                            <span class="theme-switcher__name">${theme.name}</span>
                            <span class="theme-switcher__desc">${theme.description}</span>
                        </button>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', switcherHTML);
    
    // Add styles
    addSwitcherStyles();
    
    // Event listeners
    const toggle = document.getElementById('themeToggle');
    const close = document.getElementById('themeClose');
    const panel = document.getElementById('themePanel');
    const items = document.querySelectorAll('.theme-switcher__item');
    
    toggle.addEventListener('click', () => {
        panel.classList.toggle('open');
    });
    
    close.addEventListener('click', () => {
        panel.classList.remove('open');
    });
    
    items.forEach(item => {
        item.addEventListener('click', () => {
            const themeId = item.dataset.theme;
            const cssFile = item.dataset.css;
            applyTheme(themeId, cssFile);
            
            // Update active state
            items.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            
            // Save preference
            localStorage.setItem('selectedTheme', themeId);
        });
    });
    
    // Restore saved theme
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
        const theme = themes.find(t => t.id === savedTheme);
        if (theme) {
            applyTheme(theme.id, theme.cssFile);
            items.forEach(i => i.classList.remove('active'));
            const activeItem = document.querySelector(`[data-theme="${savedTheme}"]`);
            if (activeItem) activeItem.classList.add('active');
        }
    }
}

function getThemeColor(themeId) {
    const colors = {
        default: '#2563eb',
        dark: '#1f2937',
        green: '#10b981',
        orange: '#f97316',
        purple: '#7c3aed',
        red: '#dc2626',
        teal: '#14b8a6',
        warm: '#d97706',
        blackgold: '#000000',
        minimal: '#e5e7eb'
    };
    return colors[themeId] || '#2563eb';
}

function applyTheme(themeId, cssFile) {
    // Remove existing theme stylesheets
    const existingThemes = document.querySelectorAll('link[data-theme]');
    existingThemes.forEach(el => el.remove());
    
    // Don't load default twice (it's already loaded)
    if (themeId !== 'default') {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = cssFile;
        link.setAttribute('data-theme', themeId);
        document.head.appendChild(link);
    }
}

function addSwitcherStyles() {
    const styles = `
        .theme-switcher {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 9999;
        }
        
        .theme-switcher__toggle {
            width: 56px;
            height: 56px;
            border-radius: 50%;
            background: #2563eb;
            border: none;
            font-size: 24px;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .theme-switcher__toggle:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 20px rgba(0,0,0,0.4);
        }
        
        .theme-switcher__panel {
            position: absolute;
            bottom: 70px;
            right: 0;
            width: 320px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            transform: translateY(20px);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s;
            overflow: hidden;
        }
        
        .theme-switcher__panel.open {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
        }
        
        .theme-switcher__header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 16px 20px;
            background: #f9fafb;
            border-bottom: 1px solid #e5e7eb;
            font-weight: 600;
            font-size: 14px;
        }
        
        .theme-switcher__close {
            background: none;
            border: none;
            font-size: 18px;
            cursor: pointer;
            color: #6b7280;
            width: 28px;
            height: 28px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 4px;
        }
        
        .theme-switcher__close:hover {
            background: #e5e7eb;
        }
        
        .theme-switcher__list {
            max-height: 400px;
            overflow-y: auto;
        }
        
        .theme-switcher__item {
            display: flex;
            align-items: center;
            gap: 12px;
            width: 100%;
            padding: 14px 20px;
            border: none;
            background: white;
            cursor: pointer;
            text-align: left;
            transition: background 0.2s;
            border-bottom: 1px solid #f3f4f6;
        }
        
        .theme-switcher__item:hover {
            background: #f9fafb;
        }
        
        .theme-switcher__item.active {
            background: #eff6ff;
            border-left: 3px solid #2563eb;
        }
        
        .theme-switcher__color {
            width: 32px;
            height: 32px;
            border-radius: 8px;
            flex-shrink: 0;
            border: 2px solid #e5e7eb;
        }
        
        .theme-switcher__name {
            font-weight: 600;
            font-size: 14px;
            color: #1f2937;
        }
        
        .theme-switcher__desc {
            font-size: 12px;
            color: #6b7280;
            margin-left: auto;
        }
        
        @media (max-width: 480px) {
            .theme-switcher__panel {
                width: calc(100vw - 40px);
                right: -10px;
            }
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initThemeSwitcher);