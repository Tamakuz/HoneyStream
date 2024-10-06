import DefaultLayout from "./components/DefaultLayout";
import CarouselHero from "./components/home/MovieHero";
import HomeList from "./components/home/HomeList";
import SidebarLayout from "./components/SidebarLayout";

export default function Home() {
  return (
    <DefaultLayout>
      <SidebarLayout>
        <HomeList />
      </SidebarLayout>
    </DefaultLayout>
  );
}
