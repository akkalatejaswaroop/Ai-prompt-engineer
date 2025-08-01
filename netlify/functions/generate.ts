const messageContent = response.choices[0].message.content;

// Optional: Clean up leading/trailing quotes which sometimes appear
const cleanContent = messageContent.replace(/^['"`]+|['"`]+$/g, "");

let jsonData;
try {
  // Try parsing the cleaned content to JSON
  jsonData = JSON.parse(cleanContent);
} catch (parseError) {
  // If parsing fails, return JSON error message to the client
  return new Response(
    JSON.stringify({
      error: "Upstream API did not return valid JSON data.",
      details: parseError instanceof Error ? parseError.message : String(parseError),
      rawContent: cleanContent // optional: you can remove this in production
    }), 
    { status: 500, headers }
  );
}

// If parsing succeeds, send back the parsed JSON as a string
return new Response(JSON.stringify(jsonData), {
  status: 200,
  headers,
});

