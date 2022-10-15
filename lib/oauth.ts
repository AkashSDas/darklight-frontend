export function oauthSignup(provider: "google" | "twitter" | "facebook") {
  var endpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signup/${provider}`;
  window.open(endpoint, "_self");
}

export function oauthLogin(provider: "google" | "twitter" | "facebook") {
  var endpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login/${provider}`;
  window.open(endpoint, "_self");
}
