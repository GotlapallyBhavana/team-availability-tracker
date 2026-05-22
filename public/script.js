async function loadUsers() {

    const response = await fetch(
        "http://localhost:5000/users"
    );

    const users = await response.json();

    const usersDiv =
        document.getElementById("users");

    usersDiv.innerHTML = "";

    users.forEach(user => {

        const div = document.createElement("div");

        div.className = "user-card";

        div.innerHTML = `
            <h3>${user.name}</h3>

            <p class="${user.available
    ? 'available'
    : 'not-available'}">

    Status:
    ${user.available
        ? "Available"
        : "Not Available"}

</p>

            <button onclick="toggleAvailability('${user._id}')">
                Toggle
            </button>
        `;

        usersDiv.appendChild(div);
    });
}

async function toggleAvailability(id) {

    await fetch(
        `http://localhost:5000/users/${id}`,
        {
            method: "PUT"
        }
    );

    loadUsers();
}

loadUsers();
