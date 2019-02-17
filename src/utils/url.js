// This definitely doesn't cover all cases, but it covers mine right now.
export function getUrlParam(paramName) {
  const paramString = window.location.href.split('?')[1];
  if (!paramString) {
    return undefined;
  }

  const targetedString = paramString.split(`${paramName}=`)[1];
  if (!paramString) {
    return undefined;
  }

  return targetedString.split('&')[0];
}