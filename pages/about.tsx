import React from 'react';

interface AboutPageProps {
    article: any
}

const AboutPage: React.FC<AboutPageProps> = ({ article }) => {
  return (
    <div>
       <h1>{article.title}</h1>
          <p>{article.summary}</p>
    </div>
  );
};

export default AboutPage;

export async function getStaticProps({ preview = false }) {
    const article = await getArticle(preview);
    return {
      props: { article, preview },
      revalidate: 10, // Re-generate the page every 10 seconds
    };
  }
  
  async function fetchAPI(query: string) {
    return fetch(process.env.SITECORE_PREVIEW_ENDPOINT_URL as string, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-GQL-Token": process.env.PREVIEW_API_KEY as string,
      },
      body: JSON.stringify({ query }),
    }).then((response) => response.json());
  }
  
  export async function getArticle(preview: boolean) {
    const result = await fetchAPI(
      `{ 
          articles: allSampleArticle
          {
           results {
              title
              summary
           }
          }
        }`
    );
    console.log('articles', result.data.articles.results);
    return result.data.articles.results[0];
  }
  

