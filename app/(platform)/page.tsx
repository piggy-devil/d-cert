import { Header } from "@/components/Header";
import { Welcome } from "@/components/Welcome";
import { Verify } from "./_components/Verify";

const Home = () => {
  return (
    <>
      <Header />
      <Welcome />
      <Verify />
    </>
  );
};

export default Home;
