import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeaderScroll from "@/components/Header/HeaderScroll";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderScroll>
        <Header />
      </HeaderScroll>
      <div className="flex-1 w-full max-w-7xl mx-auto">{children}</div>
      <Footer />
    </div>
  );
};

export default MainLayout;
