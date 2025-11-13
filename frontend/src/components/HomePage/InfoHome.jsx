// eslint-disable-next-line no-unused-vars
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import GradientText from '../TextTypes/GradientText';
import CountUpText from '../TextTypes/CountUpText';

const InfoHome = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    // Animaciones de contenedor
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3,
            }
        }
    };

    // Animaciones de elementos individuales
    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.25, 0.4, 0.25, 1]
            }
        }
    };

    const titleText = "Descubre tu próxima lectura favorita";

    return (
        <section 
            ref={ref}
            className="relative w-full min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 pt-32 sm:pt-40 md:pt-28 pb-20"
        >
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="max-w-6xl w-full space-y-12 md:space-y-16"
            >
                {/* Título Principal con GradientText */}
                <motion.div 
                    variants={itemVariants}
                    className="text-center space-y-4 sm:space-y-6"
                >
                    <GradientText
                        colors={["#ffffff", "#D6FB3F", "#49E04A", "#D9EE6B", "#49E04A", "#D6FB3F", "#ffffff"]}
                        animationSpeed={6}
                        showBorder={false}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-tight"
                    >
                        {titleText}
                    </GradientText>

                    {/* Subtítulo */}
                    <motion.p
                        variants={itemVariants}
                        className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed px-4"
                    >
                        Explora millones de libros, encuentra recomendaciones personalizadas
                        y construye tu biblioteca digital perfecta
                    </motion.p>
                </motion.div>

                {/* Grid de características */}
                <motion.div
                    variants={containerVariants}
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
                >
                    {/* Feature 1 */}
                    <motion.div
                        variants={itemVariants}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="group relative bg-linear-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 border border-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-linear-to-br from-[#D6FB3F]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative z-10 space-y-4">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-2xl sm:text-3xl border border-white/20">
                                📚
                            </div>
                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                                Búsqueda Inteligente
                            </h3>
                            <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                                Encuentra cualquier libro al instante con nuestra búsqueda potenciada por IA
                            </p>
                        </div>
                    </motion.div>

                    {/* Feature 2 */}
                    <motion.div
                        variants={itemVariants}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="group relative bg-linear-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 border border-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-linear-to-br from-[#49E04A]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative z-10 space-y-4">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-2xl sm:text-3xl border border-white/20">
                                ⭐
                            </div>
                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                                Recomendaciones
                            </h3>
                            <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                                Descubre libros basados en tus gustos y preferencias de lectura
                            </p>
                        </div>
                    </motion.div>

                    {/* Feature 3 */}
                    <motion.div
                        variants={itemVariants}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="group relative bg-linear-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 border border-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden sm:col-span-2 md:col-span-1"
                    >
                        <div className="absolute inset-0 bg-linear-to-br from-[#D9EE6B]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative z-10 space-y-4">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-2xl sm:text-3xl border border-white/20">
                                📖
                            </div>
                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                                Tu Biblioteca
                            </h3>
                            <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                                Organiza y gestiona tu colección personal de libros favoritos
                            </p>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Call to Action */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-6 pt-6 sm:pt-8"
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-linear-to-r from-[#D6FB3F] to-[#49E04A] rounded-full text-black font-semibold text-base sm:text-lg shadow-lg shadow-[#D6FB3F]/50 hover:shadow-[#D6FB3F]/70 transition-all duration-300 overflow-hidden"
                    >
                        <span className="relative z-10">Comenzar Ahora</span>
                        <div className="absolute inset-0 bg-linear-to-r from-[#49E04A] to-[#D9EE6B] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-sm rounded-full text-white font-semibold text-base sm:text-lg border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-300"
                    >
                        Saber Más
                    </motion.button>
                </motion.div>

                {/* Stats Section */}
                <motion.div
                    variants={containerVariants}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 pt-8 sm:pt-12 border-t border-white/10"
                >
                    {/* Stat 1: Libros */}
                    <motion.div
                        variants={itemVariants}
                        className="text-center space-y-1 sm:space-y-2"
                    >
                        <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-linear-to-r from-[#D6FB3F] to-[#49E04A] bg-clip-text text-transparent">
                            <CountUpText
                                from={0}
                                to={40}
                                duration={2.5}
                                delay={0.5}
                                className="inline"
                            />
                            <span>M+</span>
                        </div>
                        <p className="text-gray-500 text-xs sm:text-sm md:text-base font-medium">
                            Libros Disponibles
                        </p>
                    </motion.div>

                    {/* Stat 2: Gratis */}
                    <motion.div
                        variants={itemVariants}
                        className="text-center space-y-1 sm:space-y-2"
                    >
                        <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-linear-to-r from-[#D6FB3F] to-[#49E04A] bg-clip-text text-transparent">
                            <CountUpText
                                from={0}
                                to={100}
                                duration={2}
                                delay={0.6}
                                className="inline"
                            />
                            <span>%</span>
                        </div>
                        <p className="text-gray-500 text-xs sm:text-sm md:text-base font-medium">
                            Gratis
                        </p>
                    </motion.div>

                    {/* Stat 3: Google */}
                    <motion.div
                        variants={itemVariants}
                        className="text-center space-y-1 sm:space-y-2"
                    >
                        <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-linear-to-r from-[#D6FB3F] to-[#49E04A] bg-clip-text text-transparent">
                            Google
                        </div>
                        <p className="text-gray-500 text-xs sm:text-sm md:text-base font-medium">
                            Powered by
                        </p>
                    </motion.div>

                    {/* Stat 4: Búsquedas */}
                    <motion.div
                        variants={itemVariants}
                        className="text-center space-y-1 sm:space-y-2"
                    >
                        <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-linear-to-r from-[#D6FB3F] to-[#49E04A] bg-clip-text text-transparent">
                            ∞
                        </div>
                        <p className="text-gray-500 text-xs sm:text-sm md:text-base font-medium">
                            Búsquedas
                        </p>
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Elementos decorativos de fondo */}
            <div className="absolute top-1/4 -left-10 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-[#D6FB3F]/20 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 -right-10 sm:right-10 w-56 sm:w-96 h-56 sm:h-96 bg-[#49E04A]/20 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none" />
        </section>
    );
};

export default InfoHome;
