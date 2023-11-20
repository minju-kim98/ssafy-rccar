<script setup>
import { ref } from "vue";
async function init() {
  const clientId = "9692ee8070264be693ff5a02fad52dbd"; // Replace with your client ID
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");

  if (!code) {
    redirectToAuthCodeFlow(clientId);
  } else {
    const accessToken = await getAccessToken(clientId, code);
    const profile = await fetchProfile(accessToken);
    console.log(profile); // Profile data logs to console
    localStorage.setItem("profile", JSON.stringify(profile));
    populateUI();
  }
}

async function redirectToAuthCodeFlow(clientId) {
  const verifier = generateCodeVerifier(128);
  const challenge = await generateCodeChallenge(verifier);

  localStorage.setItem("verifier", verifier);

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("response_type", "code");
  params.append("redirect_uri", "http://localhost:5173/music");
  params.append("scope", "user-read-private user-read-email");
  params.append("code_challenge_method", "S256");
  params.append("code_challenge", challenge);

  document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

function generateCodeVerifier(length) {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

async function generateCodeChallenge(codeVerifier) {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await window.crypto.subtle.digest("SHA-256", data);
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function getAccessToken(clientId, code) {
  const verifier = localStorage.getItem("verifier");

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", "http://localhost:5173/music");
  params.append("code_verifier", verifier);

  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  });

  const { access_token } = await result.json();
  return access_token;
}

async function fetchProfile(token) {
  const result = await fetch("https://api.spotify.com/v1/playlists/2YG2vDczzGu7uDtzYSZFpx", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  return await result.json();
}

const id = ref("");
const email = ref("");
const uri = ref("");
const uriSrc = ref("");
const url = ref("");
const urlSrc = ref("");

async function populateUI() {
  const parsedprofile = await JSON.parse(localStorage.getItem("profile"));
  console.log(parsedprofile);
  id.value = parsedprofile.id;
  email.value = parsedprofile.email;
  uri.value = parsedprofile.uri;
  uriSrc.value = parsedprofile.external_urls.spotify;
  url.value = parsedprofile.href;
  urlSrc.value = parsedprofile.href;
}

init();
</script>

<template>
  <h1>Display your Spotify profile data</h1>

  <section id="profile">
    <h2>Logged in as <span id="displayName"></span></h2>
    <span id="avatar"></span>
    <ul>
      <li>
        User ID: <span id="id">{{ id }}</span>
      </li>
      <li>
        Email: <span id="email">{{ email }}</span>
      </li>
      <li>
        Spotify URI: <a id="uri" :href="uriSrc">{{ uri }}</a>
      </li>
      <li>
        Link: <a id="url" :href="urlSrc">{{ url }}</a>
      </li>
      <li>Profile Image: <span id="imgUrl"></span></li>
    </ul>
  </section>

  <iframe
    style="border-radius: 12px"
    src="https://open.spotify.com/embed/playlist/2YG2vDczzGu7uDtzYSZFpx?utm_source=generator"
    width="80%"
    height="352"
    frameBorder="0"
    allowfullscreen=""
    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
    loading="lazy"
  ></iframe>
</template>

<style scoped>
* {
  margin-left: 70px;
}
</style>
