import "./styles/App.css";
import LiquidEther from "./components/Background/LiquidEther.jsx";
import Navbar from "./components/HomePage/Navbar/Navbar.jsx";
import InfoHome from "./components/HomePage/InfoHome.jsx";
import { StaggeredMenu } from "./components/HomePage/Navbar/StaggeredMenu.jsx";

function App() {

    // Items para Navbar (móvil/tablet)
    const navItems = [
        {
            label: "Library",
            bgColor: "#1a2a1a",
            textColor: "#fff",
            links: [
                {label: "Explore", ariaLabel: "Explore Library"},
                {label: "Collections", ariaLabel: "View Collections"}
            ]
        },
        {
            label: "Projects",
            bgColor: "#2a4a2a",
            textColor: "#fff",
            links: [
                {label: "Featured", ariaLabel: "Featured Projects"},
                {label: "Case Studies", ariaLabel: "Project Case Studies"}
            ]
        },
        {
            label: "About Me",
            bgColor: "#3a6a3a",
            textColor: "#fff",
            links: [
                {label: "Email", ariaLabel: "Email us"},
                {label: "LinkedIn", ariaLabel: "LinkedIn"},
            ]
        }
    ];

    // Items para StaggeredMenu (desktop)
    const menuItems = [
        { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
        { label: 'Library', ariaLabel: 'Explore our library', link: '/library' },
        { label: 'Projects', ariaLabel: 'View projects', link: '/projects' },
        { label: 'About Me', ariaLabel: 'Learn about me', link: '/about' }
    ];

    const socialItems = [
        { label: 'Twitter', link: 'https://twitter.com' },
        { label: 'GitHub', link: 'https://github.com' },
        { label: 'LinkedIn', link: 'https://linkedin.com' }
    ];

    return (
        <div className="min-h-screen relative overflow-x-hidden">
            {/* Background (capa inferior) */}
            <div className="fixed inset-0 z-0 w-full h-full">
                <LiquidEther
                    colors={['#D6FB3F', '#49E04A', '#D9EE6B']}
                    mouseForce={20}
                    cursorSize={100}
                    isViscous={false}
                    viscous={30}
                    iterationsViscous={32}
                    iterationsPoisson={32}
                    resolution={0.5}
                    isBounce={false}
                    autoDemo={true}
                    autoSpeed={0.5}
                    autoIntensity={2.2}
                    takeoverDuration={0.25}
                    autoResumeDelay={3000}
                    autoRampDuration={0.6}
                />
            </div>

            {/* Capa frontal (contenido) */}
            <div className="relative z-10">
                {/* Navbar para móvil y tablet (oculto en desktop) */}
                <div className="lg:hidden">
                    <Navbar
                        logo="/logo/LogoBooklify.png"
                        logoAlt="Booklify"
                        items={navItems}
                        baseColor="rgba(15, 20, 16, 0.85)"
                        menuColor="#fff"
                        buttonBgColor="#D6FB3F"
                        buttonTextColor="#000"
                        ease="power3.out"
                    />
                </div>

                {/* StaggeredMenu para desktop (oculto en móvil/tablet) */}
                <div className="hidden lg:block">
                    <StaggeredMenu
                        position="right"
                        items={menuItems}
                        socialItems={socialItems}
                        displaySocials={true}
                        displayItemNumbering={true}
                        menuButtonColor="#fff"
                        openMenuButtonColor="#fff"
                        changeMenuColorOnOpen={true}
                        colors={['#D6FB3F', '#49E04A']}
                        logoUrl="/logo/LogoBooklify.png"
                        accentColor="#D6FB3F"
                        isFixed={true}
                        onMenuOpen={() => console.log('Menu opened')}
                        onMenuClose={() => console.log('Menu closed')}
                    />
                </div>

                <InfoHome />
            </div>
        </div>
    );
}

export default App;
