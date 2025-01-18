export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  const apiKey = process.env.NEWS_API_KEY;
  const apiURL = `https://newsapi.org/v2/everything`;

  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: 'API key is missing in environment variables' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }

  if (!query) {
    return new Response(
      JSON.stringify({ error: 'Query parameter "q" is required' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } },
    );
  }

  try {
    const response = await fetch(
      `${apiURL}?q=${encodeURIComponent(query)}&apiKey=${apiKey}`,
    );
    if (!response.ok) {
      throw new Error(
        `Error fetching data: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();

    const processedData = data.articles?.map((article) => ({
      title: article.title,
      urlToImage: article.urlToImage,
      url: article.url,
      author: article.author,
    }));

    return new Response(JSON.stringify(processedData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
