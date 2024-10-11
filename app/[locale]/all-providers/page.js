import AllProviders from '@/components/playerFrontend/allProviders/AllProviders';
import { fetchAllGameProviders } from '@/lib/fetchHomeAPI';

const AllProvidersPage = async () => {
  try {
    const getAllGameProvidersData = await fetchAllGameProviders();
    
    return (
      <>
        <AllProviders getAllGameProvidersData={getAllGameProvidersData} />
      </>
    );
  } catch (error) {
    console.error("Error fetching game providers:", error);
    return (
      <div>Error loading game providers. Please try again later.</div> 
    );
  }
};

export default AllProvidersPage;
