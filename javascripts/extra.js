function updateGiscusTheme() {
  const iframe = document.querySelector("iframe.giscus-frame");

  if (!iframe) return;

  const scheme = document.body.getAttribute("data-md-color-scheme");
  const theme = scheme === "default" ? "light" : "dark";

  iframe.contentWindow.postMessage(
    {
      giscus: {
        setConfig: {
          theme,
        },
      },
    },
    "https://giscus.app"
  );
}

function formatGitHubStars(count) {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(count >= 10000 ? 0 : 1)}k`;
  }

  return String(count);
}

async function updateGitHubStars() {
  const source = document.querySelector("[data-github-repo]");
  const starsTarget = document.querySelector("[data-github-stars]");
  const forksTarget = document.querySelector("[data-github-forks]");

  if (!source || !starsTarget) return;

  const repo = source.getAttribute("data-github-repo");

  try {
    const response = await fetch(`https://api.github.com/repos/${repo}`, {
      headers: {
        Accept: "application/vnd.github+json",
      },
    });

    if (!response.ok) throw new Error("GitHub API request failed");

    const data = await response.json();
    starsTarget.textContent = formatGitHubStars(data.stargazers_count || 0);

    if (forksTarget) {
      forksTarget.textContent = formatGitHubStars(data.forks_count || 0);
    }
  } catch {
    starsTarget.textContent = "Star";

    if (forksTarget) {
      forksTarget.textContent = "Fork";
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  updateGiscusTheme();
  updateGitHubStars();

  const observer = new MutationObserver(() => {
    updateGiscusTheme();
  });

  observer.observe(document.body, {
    attributes: true,
    attributeFilter: ["data-md-color-scheme"],
  });
});
