import { useState, useEffect } from "react";
import { fetchClimateNews } from "../services/api";
// Static educational content
const facts = [
  {
    title: "India's Energy Mix",
    content:
      "A significant portion of India's electricity is generated from coal, which has a high carbon footprint.",
  },
  {
    title: "LPG Subsidies",
    content:
      "The PAHAL scheme for LPG subsidies has helped millions switch to cleaner cooking fuel, reducing indoor air pollution.",
  },
  {
    title: "Methane from Rice",
    content:
      "Rice paddies are a major source of methane, a potent greenhouse gas. India is one of the world's largest rice producers.",
  },
];

const Sidebar = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const getNews = async () => {
      try {
        const { data } = await fetchClimateNews();
        setNews(data.articles);
      } catch (error) {
        console.error("Failed to fetch news:", error);
      }
    };
    getNews();
  }, []);

  return (
    <aside className="w-full lg:w-64 p-4 border-b lg:border-r lg:border-b-0 border-gray-700 bg-gray-800">
      <section>
        <h3 className="text-lg font-semibold text-purple-400 mb-2">
          Climate News 📰
        </h3>
        <ul className="space-y-2">
          {news.map((article, index) => (
            <li key={index}>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-400 hover:text-purple-300"
              >
                {article.title}
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* New "Learn More" Section */}
      <section className="mt-8 pt-4 border-t border-gray-600">
        <h3 className="text-lg font-semibold text-purple-400 mb-2">
          Learn More 💡
        </h3>
        <ul className="space-y-4">
          {facts.map((fact, index) => (
            <li key={index}>
              <h4 className="font-semibold text-gray-300">{fact.title}</h4>
              <p className="text-sm text-gray-400">{fact.content}</p>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
};

export default Sidebar;
