import LandingPage from '@/_components/LandingPage';
import Footer from '@/_components/Footer';

const page = () => {
    return (
        <div className='min-h-full min-w-full flex flex-col'>
            <LandingPage />
            <Footer />
        </div>
    );
};

export default page;
