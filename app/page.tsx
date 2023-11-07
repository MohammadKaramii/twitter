import Feed from "@/components/Feed";
import Sidebar from "@/components/Sidebar";
import Widgets from "@/components/Widgets";

export default async function Home({ newsResults, randomUsersResults }: any) {
  newsResults = await getNews();
  randomUsersResults = await getRandomUsers();

  return (
    <main className="flex min-h-screen mx-auto">
      <Sidebar />
      <Feed />
      <Widgets
        newsResults={newsResults.articles}
        randomUsersResults={randomUsersResults.results}
      />
    </main>
  );
}
export async function getNews() {
  const res = await fetch(
    "https://saurav.tech/NewsAPI/top-headlines/category/technology/us.json",
    { cache: "no-store" }
  );

  const newsResults = await res.json();

  return newsResults;
}

export async function getRandomUsers() {
  const resR = await fetch(
    "https://randomuser.me/api/?results=30&inc=name,login,picture",
    { cache: "no-store" }
  );

  const randomUsersResults = await resR.json();

  return randomUsersResults;
}
