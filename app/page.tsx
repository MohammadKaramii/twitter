import Feed from "@/components/Feed";
import Sidebar from "@/components/Sidebar";
import Widgets from "@/components/Widgets";


export  default async function Home({ newsResults }: any) {
newsResults = await getNews()
 
  
  return (
    <main className="flex min-h-screen mx-auto">
      <Sidebar />
      <Feed />
      <Widgets newsResults={newsResults?.articles} />
      
    </main>
  );
}
export async function getNews() {
  const res = await fetch(
    "https://saurav.tech/NewsAPI/top-headlines/category/technology/us.json",
    { cache: "no-store" }
  );
  console.log(res);
  const newsResults = await res.json();
  return newsResults
}





// https://saurav.tech/NewsAPI/top-headlines/category/technology/us.json

