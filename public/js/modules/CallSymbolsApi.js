export default async function CallSymbolsApi() {
  try {
    const response = await fetch(
      "https://api.exchangerate.host/symbols",
    )
    if (!response.ok) {
      throw new Error(`HTTPS error: ${response.status}`);
    }

    const data = response.json();
    return data;
  } catch (error) {
    console.error(`Could not get products: ${error}`);
  }
}

export { CallSymbolsApi };


