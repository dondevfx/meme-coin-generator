function getRandomTicker() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return "$" + Array.from({ length: 3 + Math.floor(Math.random() * 2) }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

function formatHandle(base) {
  return base.replace(/\s+/g, '').replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
}

async function generateCoin() {
  const prompt = document.getElementById("promptInput").value.trim();
  if (!prompt) return alert("Please enter a meme idea!");

  const baseName = prompt.split(" ")[0];
  const suffixes = ["Coin", "Token", "Inu", "Swap", "Drop", "Finance"];
  const coinName = baseName.charAt(0).toUpperCase() + baseName.slice(1) + " " + suffixes[Math.floor(Math.random() * suffixes.length)];
  const ticker = getRandomTicker();
  const description = `The official currency of ${prompt}. Powered by community hype, FOMO, and zero utility. Just vibes.`;
  const domain = `${formatHandle(baseName)}coin.xyz`;
  const twitter = `@${formatHandle(baseName)}coin`;
  const telegram = `t.me/${formatHandle(baseName)}gang`;

  document.getElementById("logo").src = "";
  const logoRes = await fetch("https://your-render-backend-url.onrender.com/generate-logo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: `${coinName} logo cartoon style` })
  });
  const logoData = await logoRes.json();

  document.getElementById("coinName").innerText = coinName;
  document.getElementById("ticker").innerText = ticker;
  document.getElementById("description").innerText = description;
  document.getElementById("website").innerText = domain;
  document.getElementById("twitter").innerText = twitter;
  document.getElementById("telegram").innerText = telegram;
  document.getElementById("logo").src = logoData.url;
  document.getElementById("result").style.display = "block";
}

function tweet() {
  const name = document.getElementById("coinName").innerText;
  const ticker = document.getElementById("ticker").innerText;
  const text = `I just generated ${name} (${ticker}) with the Meme Coin Generator! 🚀\n\nTry it now! https://your-meme-site.netlify.app`;
  window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`);
}