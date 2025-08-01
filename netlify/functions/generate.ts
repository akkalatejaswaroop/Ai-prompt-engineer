try {
  const { userInput } = await req.json();

  if (!userInput || typeof userInput !== 'string') {
    return new Response(JSON.stringify({ error: 'Invalid userInput provided.' }), {
      status: 400,
      headers,
    });
  }

  // Send to Perplexity API
  const response = await openai.chat.completions.create({
    model: "sonar-pro",
    messages: [
      { role: "system", content: systemInstruction },
      { role: "user", content: userInput }
    ],
    response_format: { type: "json_object" },
    temperature: 0.7,
    top_p: 0.95,
  });

  const jsonText = response.choices[0].message.content;

  return new Response(jsonText, {
    status: 200,
    headers,
  });

} catch (error) {
  // existing catch block
}
