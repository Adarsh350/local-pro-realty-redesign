import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogArticles, getBlogArticle } from "../../blog-data";

type BlogPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getBlogArticle(slug);

  if (!article) {
    return {
      title: "Blog Article | LocalPRO Realty",
    };
  }

  return {
    title: `${article.title} | LocalPRO Realty`,
    description: article.deck,
  };
}

export default async function BlogArticlePage({ params }: BlogPageProps) {
  const { slug } = await params;
  const article = getBlogArticle(slug);

  if (!article) notFound();

  return (
    <main className="article-page">
      <header className="article-nav">
        <a href="/" aria-label="Back to LocalPRO Realty landing page">
          <img src="/images/localpro-logo-transparent.png" alt="LocalPRO Realty" />
        </a>
        <a href="/#contact">Talk to a PRO</a>
      </header>

      <article className="article-shell">
        <section className="article-hero">
          <div className="article-hero__copy">
            <a className="article-back" href="/#blog">
              <span aria-hidden="true">&larr;</span> Announcement and Pro Tips
            </a>
            <p className="kicker">{article.eyebrow}</p>
            <h1>{article.title}</h1>
            <p>{article.deck}</p>
            <div className="article-meta" aria-label="Article metadata">
              <span>{article.author}</span>
              <time dateTime={article.publishedIso}>{article.published}</time>
              <span>{article.readTime}</span>
            </div>
          </div>
          <figure className="article-hero__media">
            <img src={article.image} alt="" />
          </figure>
        </section>

        <aside className="article-brief" aria-label="Key takeaways">
          <div>
            <span>Source date note</span>
            <p>{article.dateNote}</p>
          </div>
          {article.highlights.map((highlight) => (
            <div key={highlight}>
              <span>Pro tip</span>
              <p>{highlight}</p>
            </div>
          ))}
        </aside>

        <div className="article-content">
          <p className="article-lead">{article.body}</p>

          {article.sections.map((section, index) => (
            <section className="article-section" key={section.heading}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h2>{section.heading}</h2>
                <p>{section.body}</p>
                {section.points ? (
                  <ul>
                    {section.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </section>
          ))}
        </div>

        <footer className="article-next">
          <div>
            <span>Local insight</span>
            <h2>Ready to turn this into a plan?</h2>
          </div>
          <a href="/#contact">Talk to LocalPRO</a>
        </footer>
      </article>
    </main>
  );
}
