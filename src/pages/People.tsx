import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PeopleHero from "@/components/people/PeopleHero";
import PrincipalInvestigator from "@/components/people/PrincipalInvestigator";
import TeamMembers from "@/components/people/TeamMembers";
import JoinUs from "@/components/people/JoinUs";

const People = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <PeopleHero />
        <PrincipalInvestigator />
        <TeamMembers />
        <JoinUs />
      </main>
      <Footer />
    </div>
  );
};

export default People;