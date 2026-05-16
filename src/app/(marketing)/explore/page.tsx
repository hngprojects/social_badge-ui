import ExploreHero from '../components/explore/hero';
import FilterTabs from '../components/explore/filter-tabs';
import TemplateGrid from '../components/explore/template-grid';
import BuildYourOwn from '../components/explore/build-your-own';

const ExplorePage = () => {
  return (
    <main>
      <ExploreHero />
      <FilterTabs />
      <TemplateGrid />
      <BuildYourOwn />
    </main>
  );
};

export default ExplorePage;