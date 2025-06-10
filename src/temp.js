const res = await api.asApp().requestJira(
  route`/rest/api/3/search`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jql,
      fields: ['key', 'summary', 'description'],
      maxResults: 50 // or any number greater than 1
    }),
  }
);