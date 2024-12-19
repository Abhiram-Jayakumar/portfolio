document.addEventListener('DOMContentLoaded', () => {
    const username = "Abhiram-Jayakumar";
    const projectsGrid = document.querySelector('.project-grid');

    requestUserRepos(username)
        .then(response => response.json())
        .then(data => {
            projectsGrid.innerHTML = '';

            if (!data || data.message === "Not Found" || data.length === 0) {
                projectsGrid.innerHTML = `<p>No repositories found for username: ${username}</p>`;
                return;
            }

            data.forEach(repo => {
                if (repo.description) {
                    const projectCard = document.createElement('div');
                    projectCard.classList.add('project-card');

                    projectCard.innerHTML = `
                        <img src="https://i.postimg.cc/4NdK6tXq/og-image-24.jpg" alt="${repo.name}">
                        <h3>${repo.name}</h3>
                        <p>${repo.description}</p>
                        <div class="project-links">
                            <a href="${repo.html_url}" target="_blank" class="project-link">GitHub</a>
                            ${
                                repo.homepage
                                    ? `<a href="${repo.homepage}" target="_blank" class="project-link">Live Demo</a>`
                                    : ''
                            }
                        </div>
                    `;

                    projectsGrid.appendChild(projectCard);
                }
            });
            if (projectsGrid.innerHTML.trim() === '') {
                projectsGrid.innerHTML = `<p>No repositories with descriptions found for username: ${username}</p>`;
            }
        })
        .catch(error => {
            console.error("Error fetching GitHub repos:", error);
            projectsGrid.innerHTML = `<p>Failed to load GitHub projects. Please try again later.</p>`;
        });
});

function requestUserRepos(username) {
    return fetch(`https://api.github.com/users/${username}/repos`);
}
