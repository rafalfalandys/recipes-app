export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const res = await fetchPro;
    if (!res) throw new Error();
    return await res.json();
  } catch (error) {
    throw new Error();
  }
};
