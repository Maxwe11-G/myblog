function updateGiscusTheme() {

    const iframe = document.querySelector("iframe.giscus-frame");

    if (!iframe) return;

    // Material 当前主题
    const scheme =
        document.body.getAttribute("data-md-color-scheme");

    // 映射到 giscus theme
    const theme =
        scheme === "default"
            ? "light"
            : "dark";

    iframe.contentWindow.postMessage(
        {
            giscus: {
                setConfig: {
                    theme: theme
                }
            }
        },
        "https://giscus.app"
    );
}

/* 初始加载 */
document.addEventListener("DOMContentLoaded", () => {

    updateGiscusTheme();

    /* 监听 Material 主题切换 */
    const observer = new MutationObserver(() => {
        updateGiscusTheme();
    });

    observer.observe(document.body, {
        attributes: true,
        attributeFilter: ["data-md-color-scheme"]
    });
});