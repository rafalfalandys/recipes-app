export const AJAX = async function (url) {
  try {
    const res = await fetch(url);
    if (!res) throw new Error();
    return await res.json();
  } catch (error) {
    throw new Error();
  }
};
