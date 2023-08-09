export default async function CallRateApi(APIURL) {
  console.log(APIURL);
  try {
    const response = await fetch(APIURL)
    if (!response.ok) {
      throw new Error(`HTTPS error: ${response.status}`);
    }

    const data = response.json();
    return data;
  } catch (error) {
    console.error(`Could not get products: ${error}`);
  }
}

export { CallRateApi };


