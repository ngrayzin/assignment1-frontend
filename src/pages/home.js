import Navbar from '../components/navbar';
import Settings from '../settings/settings';
const settings = new Settings();

const Home = () => {
  const userInfo = JSON.parse(settings.user);

  return (
    <div>
      {/* <Navbar /> */}
      <div className="container mx-auto mt-8">
        <h1 className="text-3xl text-black font-bold mb-4">Welcome {userInfo.firstName}</h1>
        <p className="text-lg text-black mb-4">This is your home page content.</p>
        {/* You can add more content here */}
      </div>
    </div>
  );
};

export default Home;
