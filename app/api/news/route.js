export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  const apiKey = 'b9e0fd3b510f4cd4804129c42da28a37';
  const apiURL = `https://newsapi.org/v2/everything`;

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

    // Process the response data if needed (e.g., filter or transform it)
    const processedData = data.articles?.map((article) => ({
      title: article.title,
      description: article.description,
      url: article.url,
      source: article.source.name,
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
