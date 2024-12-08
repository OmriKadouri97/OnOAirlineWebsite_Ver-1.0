// scripts/components.js

export function loadComponent(containerId, componentPath) {
    fetch(componentPath)
        .then((response) => response.text())
        .then((data) => {
            document.getElementById(containerId).innerHTML = data;
        })
        .catch((error) => console.error(`Error loading component from ${componentPath}:`, error));
}
