// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerSections = [
        {
            title: "Biblioteca",
            links: [
                { label: "Explorar", href: "/explore" },
                { label: "Categorías", href: "/categories" },
                { label: "Novedades", href: "/new" },
                { label: "Más Leídos", href: "/popular" }
            ]
        },
        {
            title: "Recursos",
            links: [
                { label: "Documentación", href: "/docs" },
                { label: "API", href: "/api" },
                { label: "Blog", href: "/blog" },
                { label: "Ayuda", href: "/help" }
            ]
        },
        {
            title: "Sobre Mí",
            links: [
                { label: "Portfolio", href: "/portfolio" },
                { label: "GitHub", href: "https://github.com" },
                { label: "LinkedIn", href: "https://linkedin.com" },
                { label: "Contacto", href: "/contact" }
            ]
        }
    ];

    const socialLinks = [
        { label: "Twitter", href: "https://twitter.com", icon: "𝕏" },
        { label: "GitHub", href: "https://github.com", icon: "⚡" },
        { label: "LinkedIn", href: "https://linkedin.com", icon: "in" }
    ];

    return (
        <footer className="relative w-full bg-linear-to-b from-transparent to-black/30 border-t border-white/5 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                {/* Grid principal */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
                    {/* Logo y descripción */}
                    <div className="sm:col-span-2 lg:col-span-1 space-y-4">
                        <div className="flex items-center gap-2">
                            <img 
                                src="/logo/LogoBooklify.png" 
                                alt="Booklify" 
                                className="h-12 w-auto brightness-0 invert"
                            />
                            <span className="text-white text-xl font-extralight tracking-wider" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                                Booklify
                            </span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                            Tu compañero perfecto para descubrir, explorar y organizar tu próxima gran lectura.
                        </p>
                        
                        {/* Redes sociales */}
                        <div className="flex items-center gap-3 pt-2">
                            {socialLinks.map((social, idx) => (
                                <motion.a
                                    key={idx}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-10 h-10 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#D6FB3F]/50 flex items-center justify-center text-gray-400 hover:text-[#D6FB3F] transition-all duration-300"
                                    aria-label={social.label}
                                >
                                    <span className="text-lg font-semibold">{social.icon}</span>
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Secciones de links */}
                    {footerSections.map((section, idx) => (
                        <div key={idx} className="space-y-4">
                            <h4 className="text-white font-semibold text-sm uppercase tracking-wider">
                                {section.title}
                            </h4>
                            <ul className="space-y-2">
                                {section.links.map((link, linkIdx) => (
                                    <li key={linkIdx}>
                                        <a
                                            href={link.href}
                                            className="text-gray-400 hover:text-[#D6FB3F] text-sm transition-colors duration-300 inline-block hover:translate-x-1 transform"
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Línea divisoria */}
                <div className="h-px bg-linear-to-r from-transparent via-white/10 to-transparent mb-8" />

                {/* Copyright y links legales */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
                    <p className="text-center sm:text-left">
                        © {currentYear} <span className="text-[#D6FB3F]">Booklify</span>. Todos los derechos reservados.
                    </p>
                    <div className="flex items-center gap-6">
                        <a 
                            href="/privacy" 
                            className="hover:text-[#D6FB3F] transition-colors duration-300"
                        >
                            Privacidad
                        </a>
                        <a 
                            href="/terms" 
                            className="hover:text-[#D6FB3F] transition-colors duration-300"
                        >
                            Términos
                        </a>
                        <a 
                            href="/cookies" 
                            className="hover:text-[#D6FB3F] transition-colors duration-300"
                        >
                            Cookies
                        </a>
                    </div>
                </div>

                {/* Nota sobre Google Books */}
                <div className="mt-6 pt-6 border-t border-white/5">
                    <p className="text-center text-xs text-gray-600">
                        Datos proporcionados por <span className="text-gray-400 font-medium">Google Books API</span>
                    </p>
                </div>
            </div>

            {/* Elementos decorativos */}
            <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-[#D6FB3F]/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#49E04A]/5 rounded-full blur-[100px] pointer-events-none" />
        </footer>
    );
};

export default Footer;
