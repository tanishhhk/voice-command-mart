import Navbar from "@/components/navbar/Navbar";
import Microphone from "@/components/microphone/Microphone";
import ShelfBackground from "@/components/shelves/ShelfBackground";
import CartDrawer from "@/components/cart/CartDrawer";
import { VoiceAssistant } from '@/components/VoiceAssistant';

export default function HomePage() {
    return (
        <main className="min-h-screen site-bg">
            <Navbar />
            
            <ShelfBackground />
            <CartDrawer />
        </main>
    );
}