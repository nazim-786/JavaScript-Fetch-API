const userContainer = document.getElementById("userContainer");
const reloadBtn = document.getElementById("reloadBtn");

// Function to fetch and display data
async function fetchUserData() {
  userContainer.innerHTML = "<p>Loading users...</p>";

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    // Handle non-OK responses
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const users = await response.json();

    userContainer.innerHTML = ""; // Clear previous data

    users.forEach(user => {
      const userCard = document.createElement("div");
      userCard.classList.add("user-card");
      
      userCard.innerHTML = `
        <h3>${user.name}</h3>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Address:</strong> ${user.address.street}, ${user.address.city},</p>
        <p><strong>Phone:</strong>${user.phone},</p>
      `;
      
      userContainer.appendChild(userCard);
    });

  } catch (error) {
    userContainer.innerHTML = `<p style="color:red;">Error: ${error.message}. Please check your internet connection.</p>`;
  }
}

// Event listener for reload button
reloadBtn.addEventListener("click", fetchUserData);

// Initial load
fetchUserData();
