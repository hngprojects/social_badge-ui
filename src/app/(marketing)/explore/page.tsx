import ExploreHero from '../components/explore/hero';
import Filter from '../components/explore/filter';
import BuildYourOwn from '../components/explore/build-your-own';

const ExplorePage = () => {
  return (
    <main>
      <ExploreHero />
      <Filter />
      <BuildYourOwn />
    </main>
  );
};

export default ExplorePage;