import "./styles/App.css";
import LiquidEther from "./components/Background/LiquidEther.jsx";
import HomePage from "./pages/HomePage.jsx";

function App() {
    return (
        <div className="min-h-screen relative overflow-x-hidden">
            {/* Background global (capa inferior) */}
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

            {/* Contenido de la aplicación */}
            <div className="relative z-10">
                <HomePage />
            </div>
        </div>
    );
}

export default App;
