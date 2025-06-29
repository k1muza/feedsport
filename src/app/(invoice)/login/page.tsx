import AuthForm from "@/components/auth/AuthForm";
import HeroSection from "@/components/auth/HeroSection";


const AuthPage = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      <HeroSection />
      <AuthForm />
    </div>
  );
};

export default AuthPage;