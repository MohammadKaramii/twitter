import { ArticleNews } from "@/types";
import Link from "next/link";
export default function News({ articles }: ArticleNews) {
  return (
    <Link rel="noreferrer" href={articles.url} target="_blank">
      <div className="flex items-center justify-between px-4 py-2 space-x-1 hover:bg-gray-200 transition duration-500 ease-out">
        <div className="space-y-0.5">
          <h6 className="text-sm font-bold">{articles.title}</h6>
          <p className="text-xs font-medium text-gray-500">
            {articles.source.name}
          </p>
        </div>
        <img
          className="rounded-xl "
          width="70"
          src={articles.urlToImage}
          alt=""
        />
      </div>
    </Link>
  );
}
